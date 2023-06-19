import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/tasks", [authRequired], getTasks);
router.get("/tasks/:id", [authRequired], getTask);
router.post("/tasks", [authRequired], createTask);
router.put("/tasks/:id", [authRequired], updateTask);
router.delete("/tasks/:id", [authRequired], deleteTask);

export default router;
