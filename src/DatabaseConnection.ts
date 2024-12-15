import { Sequelize } from "sequelize";

const sequelize = new Sequelize("myntra", "postgres", "Anjali118", {
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

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

export { sequelize, connectToDatabase };
