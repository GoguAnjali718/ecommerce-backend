import { Router, Response, Request } from "express";
import { User } from "./User";
import bcrypt from "bcrypt";
import { ErrorMessages, StatusCodes } from "../../Enums";
const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMessages.FETCH_ERROR });
  }
});

userRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ErrorMessages.USERNAME_EXISTS });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: ErrorMessages.INVALID_PASSWORD });
    }

    const newUser = await User.create({
      username,
      password,
      confirmPassword,
    });
    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMessages.POST_ERROR });
  }
});

export default userRouter;
