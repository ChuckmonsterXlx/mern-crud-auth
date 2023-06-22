import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateSchema =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        error: error.errors.map((error: any) => error.message),
      });
      return;
    }
  };
