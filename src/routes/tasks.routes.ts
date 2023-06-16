import { Request, Response, Router } from "express";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.get("/tasks", [authRequired], (_req: Request, res: Response) => {
  res.send("task");
});

export default router;
