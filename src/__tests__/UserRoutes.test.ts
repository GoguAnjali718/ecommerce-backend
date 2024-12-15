import express from "express";
import request from "supertest";
import { User } from "../models/User";
import userRouter from "../routes/UserRoutes";

jest.mock("../models/User", () => ({
  User: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));
const app = express();
app.use(express.json());
app.use("/api/users", userRouter);

describe("Get route", () => {
  it("should it return all users", async () => {
    const mockUsers = [
      { username: "Anji", password: "415", confirmPassword: "415" },
    ];

    (User.find as jest.Mock).mockResolvedValue(mockUsers);
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
  });

  it("should return 500 when there is an error while fetching users", async () => {
    (User.find as jest.Mock).mockRejectedValue(new Error("database error"));
    const response = await request(app).get("/api/users");
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "error while fetching" });
  });
});

it("should create a new user", async () => {
  const newUser = {
    username: "Naruto",
    password: "123",
    confirmPassword: "123",
  };
  (User.create as jest.Mock).mockResolvedValue(newUser);

  const res = await request(app).post("/api/users").send(newUser);
  expect(res.status).toBe(201);
  expect(res.body).toEqual(newUser);
});

it("should return 500 if there is an error creating a user", async () => {
  (User.create as jest.Mock).mockRejectedValue(new Error("Database error"));

  const newUser = {
    username: "Naruto",
    password: "123",
    confirmPassword: "123",
  };
  const res = await request(app).post("/api/users").send(newUser);
  expect(res.status).toBe(500);
  expect(res.body).toHaveProperty(
    "message",
    "error while posting the new user"
  );
});
