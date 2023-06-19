import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authRequired = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({
      message: "No token, authorization denied",
    });
    return;
  }

  jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({
        message: "Invalid token",
      });
    } else {
      req.user = user;
      next();
    }
  });
};
