import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.route("/user").post(UserController.create);

export default router;
