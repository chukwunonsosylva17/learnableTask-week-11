import dotenv from "dotenv";
dotenv.config();


import { connectDB } from "./config/db";
import app from "./app";



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on http://localhost:${PORT}`);
});

