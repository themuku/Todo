import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/login", authController.login);

router.post("/signup", authController.signup);

export default router;
