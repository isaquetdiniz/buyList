import { Router } from "express";
import PedidoController from "../controllers/pedidoController";

import authVerify from "../helpers/authVerify";

const router = Router();

router
  .route("/pedido/:id")
  .get(authVerify, PedidoController.list)
  .put(authVerify, PedidoController.update)
  .delete(authVerify, PedidoController.delete);

router.route("/pedido").get(authVerify, PedidoController.list);

router.route("/pedido").post(authVerify, PedidoController.create);

export default router;
