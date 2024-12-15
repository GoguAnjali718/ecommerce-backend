import { Sequelize } from "sequelize";

const sequelize = new Sequelize("myntra", "anjali", "AnjaliGOGU", {
  host: "localhost",
  dialect: "postgres",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connectToDatabase };
