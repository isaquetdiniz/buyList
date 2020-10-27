import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

import { Pedido } from "../models/Pedidos";

class PedidoController {
  async list(req: Request, res: Response): Promise<Response> {
    return res
      .status(200)
      .json({ message: `Está funcionando!!!!, id: ${req.userId}` });
  }
  async update(req: Request, res: Response): Promise<Response> {
    return res
      .status(200)
      .json({ message: `Está funcionando!!!!, id: ${req.userId}` });
  }
  async create(req: Request, res: Response): Promise<Response> {
    return res
      .status(200)
      .json({ message: `Está funcionando!!!!, id: ${req.userId}` });
  }
  async delete(req: Request, res: Response): Promise<Response> {
    return res
      .status(200)
      .json({ message: `Está funcionando!!!!, id: ${req.userId}` });
  }
}

export default new PedidoController();
