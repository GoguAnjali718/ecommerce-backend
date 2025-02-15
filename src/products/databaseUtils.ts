import { sequelize } from "../dbConnection/DatabaseConnection";

const cleanDatabase = async () => {
  try {
    await sequelize.query("DROP SEQUENCE IF EXISTS products_id_seq CASCADE");
    await sequelize.query("DROP TABLE IF EXISTS products CASCADE");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
};

const syncDatabase = async () => {
  await cleanDatabase();
  await sequelize.sync({ force: true });
};

module.exports = { cleanDatabase, syncDatabase };
