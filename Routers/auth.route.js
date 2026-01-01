import Router from "express";
import { signup, signin, signout, VerifyEmail, forgetPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/auth.validation.js";
import { CodeSchema, signUpSchema, signInSchema, emailSchema, passwordSchema } from "../ValidationSchemas/CodeValidate.schema.js";



const authRoutes = Router();

authRoutes.post("/sign-up", signUpSchema, validate, signup);

authRoutes.post("/sign-in", signInSchema, validate, signin);

authRoutes.post("/sign-out", signout);

authRoutes.post("/verify-email", CodeSchema, validate, VerifyEmail);

authRoutes.post("/forgot-password", emailSchema, validate, forgetPassword);

authRoutes.post("/reset-password/:token", passwordSchema, validate, resetPassword)

authRoutes.get("/check-auth", verifyToken, checkAuth);

export default authRoutes;