import { Router } from "express";
import * as todoController from "../controllers/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(todoController.getAllTodos)
  .post(todoController.createTodo)
  .delete(todoController.deleteTodo);

router.route("/:id").patch(todoController.updateTodo);

export default router;
