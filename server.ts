import express from "express";
import { connectToDatabase } from "./src/dbConnection/DatabaseConnection";
import userRouter from "./src/user/UserRoutes";
import productRouter from "./src/products/ProductRoutes";
import { initializeDatabase } from "./src/products/initializeDatabase";

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
async () => {
  try {
    connectToDatabase();
    await initializeDatabase();
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
