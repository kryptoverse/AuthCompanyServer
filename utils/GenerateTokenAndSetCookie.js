import jwt from "jsonwebtoken";

export const GenerateTokenAndSetCookie = (res, _id) => {
    const token = jwt.sign({_id}, process.env.jwtSecret, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_DEV == "production",
        sameSite: "strict",
        maxAge:  7 * 24 * 60 * 60 * 1000
    })

    

    return token;
}