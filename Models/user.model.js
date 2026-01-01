import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "Name min lenght is 3"],
            maxLength: [20, "Name Max length is 10"]
        },
        Email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        Password: {
            type: String,
            required: true,
            minLength: [6, "Password Min Length is 6"]
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        VerificationToken: String,
        VerificationTokenExipres: Date,
        PasswordResetToken: String,
        PasswordResetTokenExpires: Date,
    },
    { timestamps: true }
)

export const User = mongoose.model("User", UserSchema);

//validate: validator.isEmail, 