import { Router } from "express";
import PedidoController from "../controllers/pedidoController";

import authVerify from "../helpers/authVerify";

const router = Router();

router
  .route("/pedido/:id")
  .get(authVerify, PedidoController.list)
  .put(authVerify, PedidoController.update)
  .delete(authVerify, PedidoController.delete);

router.route("/pedido/:id_produto").post(authVerify, PedidoController.create);

export default router;
