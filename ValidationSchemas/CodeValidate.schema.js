import {checkSchema} from "express-validator";

export const CodeSchema = checkSchema({
    Code: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Verification code is required"
        },
        isNumeric: {
            errorMessage: "Verification code must contain only numbers"
        },
        isLength: {
            options: { min: 6, max: 6 },
            errorMessage: "Verification code must be exactly 6 digits"
        }
    }
});

export const signUpSchema = checkSchema({
    name: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Name is required"
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Name must be at least 3 characters long"
        }
    },

    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Invalid email format"
        },
        normalizeEmail: true
    },

    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: { min: 6 },   // 👈 greater than 6
            errorMessage: "Password must be longer than 6 characters"
        }
    }
});

export const signInSchema = checkSchema({
    

    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Invalid email format"
        },
        normalizeEmail: true
    },

    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: { min: 6 },   // 👈 greater than 6
            errorMessage: "Password must be longer than 6 characters"
        }
    }
});

export const emailSchema = checkSchema({
    

    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Invalid email format"
        },
        normalizeEmail: true
    }
});

export const passwordSchema = checkSchema({
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: { min: 6 },   // 👈 greater than 6
            errorMessage: "Password must be longer than 6 characters"
        }
    }
});
