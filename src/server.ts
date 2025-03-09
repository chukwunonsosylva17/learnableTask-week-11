import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
});

