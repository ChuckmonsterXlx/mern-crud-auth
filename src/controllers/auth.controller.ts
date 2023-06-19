import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: userName,
      email: email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.send({
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const isMatch = userFound.password
      ? await bcrypt.compare(password, userFound.password)
      : (res.status(400).json({ message: "Password is required" }), undefined);

    if (!isMatch) {
      res.status(400).json({
        message: "Incorrect password",
      });
      return;
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.send({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
  return;
};
