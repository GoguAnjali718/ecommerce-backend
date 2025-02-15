const syncDatabase = require("./databaseUtils");
const seedProducts = require("./ListOfProducts");

export const initializeDatabase = async () => {
  await syncDatabase();
  await seedProducts();
};

// initializeDatabase();
