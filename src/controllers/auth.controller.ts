import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  console.log(req.body);

  res.send("Registrando");
};

export const login = (_req: Request, res: Response) => {
  res.send("login");
};
