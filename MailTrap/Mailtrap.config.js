import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MAILTRAP_API) {
    throw new Error("MAILTRAP_API is missing in .env");
}

export const mailTrapClient = new MailtrapClient({
    token: process.env.MAILTRAP_API,
});

export const MailTrapSender = {
    email: "hello@demomailtrap.co",
    name: "AuthCompany",
};
