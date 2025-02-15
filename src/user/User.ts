const { Model, DataTypes } = require("sequelize");
import { sequelize } from "../dbConnection/DatabaseConnection";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public confirmPassword!: string;
  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  async checkConfirmPassword(confirmPassword: string): Promise<boolean> {
    return bcrypt.compare(confirmPassword, this.confirmPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "User",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        }
        if (user.confirmPassword) {
          const salt = await bcrypt.genSalt();
          user.confirmPassword = await bcrypt.hash(user.confirmPassword, salt);
        }
      },
    },
  }
);

sequelize.sync({ alter: true });
export { User, sequelize };
