import express from "express";
import { connectToDatabase } from "./src/DatabaseConnection";

const app = express();
const PORT = process.env.PORT || 3000;
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
