import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json(["The email already exists"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    return res.send({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = userFound.password
      ? await bcrypt.compare(password, userFound.password)
      : (res.status(400).json({ message: "Password is required" }), undefined);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    return res.send({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req: AuthenticatedRequest, res: Response) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({
      message: "User not found",
    });
  } else {
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  return jwt.verify(token, TOKEN_SECRET, async (err: any, user: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const userFound = await User.findById(user.id);

    if (!userFound) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
