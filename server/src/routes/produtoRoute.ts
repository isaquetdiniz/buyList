import { Router } from "express";
import ProdutoController from "../controllers/produtoController";

import authVerify from "../helpers/authVerify";

const router = Router();

router
  .route("/produto/:id")
  .get(authVerify, ProdutoController.list)
  .put(authVerify, ProdutoController.update)
  .delete(authVerify, ProdutoController.delete);

router
  .route("/produto")
  .get(authVerify, ProdutoController.list)
  .post(authVerify, ProdutoController.create);

export default router;
