import mongoose from "mongoose";
import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { mailTrapClient, MailTrapSender } from "../MailTrap/Mailtrap.config.js";
import { GenerateTokenAndSetCookie } from "../utils/GenerateTokenAndSetCookie.js"

import { verifyEmailTemplate } from "../EmailTemplates/verifyEmail.template.js"
import { WelcomeEmailTemplate } from "../EmailTemplates/WelcomeEmail.template.js"
import { PasswordResetEmailTemplate } from "../EmailTemplates/PasswordResetEmail.template.js"
import { ResetSuccessEmailTemplate } from "../EmailTemplates/ResetSuccessEmail.template.js"


export const signup = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        if (!email || !name || !password) {
            return res.status(400).json({ "Message": "All fields are required." })
        }
        const FoundUser = await User.findOne({ Email: email });
        if (FoundUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const HashedPassword = await bcrypt.hash(password, 12);

        const VerificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            Name: name,
            Email: email,
            Password: HashedPassword,
            VerificationToken: VerificationToken,
            VerificationTokenExipres: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();
        const recipients = [
            {
                email: "geassalgorithm@gmail.com",
            }
        ];

        await mailTrapClient.send({
            from: MailTrapSender,
            to: [{ email: email }],
            subject: "Your Verification Code",
            html: verifyEmailTemplate({
                name: name,
                code: VerificationToken
            }),
            category: "Email Verification"
        });



        const newtoken = GenerateTokenAndSetCookie(res, user._id);
        res.status(201).json({
            success: true,
            message: "User created successfuly,",
            user: {
                _id: user._id,
                name: user.Name,
                email: user.Email,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            },
            token: newtoken
        }
        );

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });

    }
};


export const VerifyEmail = async (req, res) => {
    const { Code } = req.body;
    try {
        if (!Code) return res.status(400).json({
            success: false,
            messag: "Please enter Code."
        });

        const FindUser = await User.findOne({
            VerificationToken: Code,
            VerificationTokenExipres: { $gt: Date.now() }
        })

        if (!FindUser) return res.status(404).json({
            success: false,
            message: "User Not Found."
        })

        FindUser.isVerified = true;

        FindUser.VerificationToken = undefined;
        FindUser.VerificationTokenExipres = undefined;

        await FindUser.save();

        try {
            await mailTrapClient.send({
                from: MailTrapSender,
                to: [{ email: FindUser.Email }],
                subject: "Welcome to AuthCompany",
                html: WelcomeEmailTemplate({
                    name: FindUser.Name
                }),
                category: "Welcome Email"
            });
        } catch (emailError) {
            console.error("Error sending welcome email", emailError)
        }

        res.status(201).json({
            success: true,
            message: "User verified Successfully",
            user: {
                _id: FindUser._id,
                name: FindUser.Name,
                email: FindUser.Email,
                isVerified: FindUser.isVerified,
                createdAt: FindUser.createdAt,
                lastLogin: FindUser.lastLogin
            }
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ Email: email });

        if (!foundUser) {
            return res.status(404).json({
                success: false,
                message: "inValid email"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.Password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Password Invalid."
            });
        }

        GenerateTokenAndSetCookie(res, foundUser._id);

        foundUser.lastLogin = new Date();
        await foundUser.save();

        res.status(200).json({
            success: true,
            message: "Login Successfully.",
            user: {
                _id: foundUser._id,
                name: foundUser.Name,
                email: foundUser.Email,
                isVerified: foundUser.isVerified,
                createdAt: foundUser.createdAt,
                lastLogin: foundUser.lastLogin
            }
        });




    } catch (error) {
        res.clearCookie("token")
        console.log(error.mssage)
        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logout successfully."
    });


};


export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const findUser = await User.findOne({ Email: email });

        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found. Invalid email"
            });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetURL = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

        findUser.PasswordResetToken = resetToken;
        findUser.PasswordResetTokenExpires = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

        await findUser.save();

        try {
            await mailTrapClient.send({
                from: MailTrapSender,
                to: [{ email: findUser.Email }],
                subject: "Reset your password",
                html: PasswordResetEmailTemplate({ resetURL }),
                category: "Password Reset"
            });

            res.status(200).json({
                success: true,
                message: "Password reset link sent to your email."
            });

        } catch (emailError) {
            console.error("Error sending password reset email", emailError);
            res.status(500).json({
                success: false,
                message: "Error sending password reset email"
            });
        }

    } catch (error) {
        console.error("Error in forgetPassword", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {

        const findUser = await User.findOne({
            PasswordResetToken: token,
            PasswordResetTokenExpires: { $gt: Date.now() }
        });

        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or link expired."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        findUser.Password = hashedPassword;
        findUser.PasswordResetToken = undefined;
        findUser.PasswordResetTokenExpires = undefined;

        await findUser.save();

        try {
            await mailTrapClient.send({
                from: MailTrapSender,
                to: [{ email: findUser.Email }],
                subject: "Password Reset Successful",
                html: ResetSuccessEmailTemplate({
                    name: findUser.Name
                }),
                category: "Password Reset Success"
            });
        } catch (emailError) {
            console.error("Error sending password reset success email", emailError)
        }

        res.status(201).json({
            success: true,
            message: "Password reset successfully."
        });

    } catch (error) {
        console.error("Error in resetPassword", error)
        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.Name,
                email: user.Email,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });

    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });

    }
};