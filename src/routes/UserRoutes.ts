import express from "express";
import { Router, Response, Request } from "express";
import { User } from "../models/User";
const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error while fetching" });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword } = req.body;

    const newUser = await User.create({
      username,
      password: password,
      confirmPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "error while posting the new user" });
  }
});

export default userRouter;
