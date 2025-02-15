import { sequelize, connectToDatabase } from "./DatabaseConnection";

describe("database connection", () => {
  it("should establish the database connection successfully", async () => {
    await connectToDatabase();
    const isConnected = await sequelize
      .authenticate()
      .then(() => true)
      .catch(() => false);

    expect(isConnected).toBe(true);
  });
  it("should fail to connect to the database", async () => {
    sequelize.close();
    const isConnected = await sequelize
      .authenticate()
      .then(() => true)
      .catch(() => false);
    expect(isConnected).toBe(false);
  });
});
