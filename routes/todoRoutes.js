import { Router } from "express";
import * as todoController from "../controllers/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router
  .route("/")
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);

export default router;
