import { Router } from "express";
import ExampleController from "../controllers/exampleController";
import authVerify from "../helpers/authVerify";

const router = Router();

router.route("/example").get(authVerify, ExampleController.teste);

export default router;
