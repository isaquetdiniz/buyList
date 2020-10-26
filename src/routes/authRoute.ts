import { Router } from "express";
import authController from "../helpers/authController";

const router = Router();

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);

export default router;
