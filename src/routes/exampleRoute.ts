import { Router } from "express";
import ExampleController from "../controllers/exampleController";

const router = Router();

router.route("/example").get(ExampleController.teste);

export default router;
