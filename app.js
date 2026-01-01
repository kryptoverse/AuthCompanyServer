import express from "express";
import { PORT, NODE_DEV } from "./config/env.js"
import cookieParser from "cookie-parser";
import connectToDB from "./DB/DB.js";
import authRoutes from "./Routers/auth.route.js";

const app = express();
import cors from "cors";

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("Welcome to authentication srver");
});

app.listen(PORT, () => {
    connectToDB();
    console.log(`server is running in port: ${PORT}`);
});

export default app;