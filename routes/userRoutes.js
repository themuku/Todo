import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.route("/").post(userController.changeUserProfile);

router.delete("/", userController.deleteUser);

export default router;
