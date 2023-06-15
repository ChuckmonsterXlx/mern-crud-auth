import app from "./app";
import { connectDB } from "./db";

connectDB();
app.listen(4000);
console.log("Listen on port", 4000);
