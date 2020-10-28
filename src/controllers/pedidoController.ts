import { getManager } from "typeorm";
import { Request, Response } from "express";

import { Pedidos } from "../models/Pedidos";

class PedidoController {
  async list(req: Request, res: Response): Promise<Response> {
    const manager = getManager();

    if (!req.params.id) {
      const pedidos = await manager.find(Pedidos);

      if (!pedidos) return res.status(404).json({ error: "Not found Pedidos" });

      return res.status(200).json(pedidos);
    }

    const pedidoId = req.params.id;

    const pedido = await manager.findOne(Pedidos, pedidoId);

    if (!pedido)
      return res.status(404).json({ error: `Pedido não encontrado` });

    return res.status(200).json(pedido);
  }

  async update(req: Request, res: Response): Promise<Response> {
    if (!req.params.id)
      return res.status(404).json({ message: "Params not found!" });

    const manager = getManager();
    const pedidoId = req.params.id;
    const { quantidade, precoSomatorio, produtoId } = req.body;

    if (!quantidade && !precoSomatorio && !produtoId)
      return res.status(404).json({ message: "Params not found!" });

    const pedido = await manager.findOne(Pedidos, pedidoId);

    if (!pedido)
      return res
        .status(404)
        .json({ message: `Pedido com id ${pedidoId} não encontrado!` });

    await manager.update(Pedidos, pedido, {
      quantidade: quantidade ? quantidade : pedido.quantidade,
      precoSomatorio: precoSomatorio ? precoSomatorio : pedido.precoSomatorio,
      produto: produtoId ? produtoId : pedido.produto,
    });

    return res
      .status(200)
      .json({ message: `Pedido com id ${pedidoId} atualizado com sucesso!` });
  }

  async create(req: Request, res: Response): Promise<Response> {
    if (!req.body) return res.status(404).json({ error: "Params not found!" });

    const manager = getManager();

    const { quantidade, precoSomatorio, produtoId } = req.body;

    const produto = produtoId;

    const newPedido = manager.create(Pedidos, {
      quantidade,
      precoSomatorio,
      produto,
    });

    await manager.save(newPedido);

    return res
      .status(200)
      .json({ message: `Pedido adicionado com id ${newPedido.id}` });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    if (!req.params.id)
      return res.status(404).json({ error: "Params not found!" });

    const pedidoId = req.params.id;
    const manager = getManager();

    const pedido = await manager.findOne(Pedidos, pedidoId);

    if (!pedido) return res.status(404).json({ error: "ID not found!" });

    await manager.delete(Pedidos, pedidoId);

    return res
      .status(200)
      .json({ message: `Pedido com id ${pedidoId} deletado com sucesso!` });
  }
}

export default new PedidoController();
