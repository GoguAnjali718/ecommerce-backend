import express from "express";
import { connectToDatabase } from "./src/DatabaseConnection";
import userRouter from "./src/routes/UserRoutes";
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
try {
  connectToDatabase();
} catch (error) {
  console.error("Error connecting to the database", error);
}
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
