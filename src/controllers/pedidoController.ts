import { getManager } from "typeorm";
import { Request, Response } from "express";

import { Pedidos } from "../models/Pedidos";
import { Produtos } from "../models/Produtos";

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
    const { quantidade, produtoId } = req.body;

    const pedido = await manager.findOne(Pedidos, pedidoId);

    if (!pedido)
      return res
        .status(404)
        .json({ message: `Pedido com id ${pedidoId} não encontrado!` });

    if (!quantidade && !produtoId) {
      return res.status(404).json({ message: "Params not found!" });
    } else if (!quantidade) {
      const idNovoProduto = produtoId;
      const newProduto = await manager.findOne(Produtos, idNovoProduto);
      if (!newProduto)
        return res
          .status(404)
          .json({ message: `Produto com ID ${idNovoProduto} não existe!` });
      const newPreco = pedido.quantidade * newProduto.precoUnitario;

      await manager.update(Pedidos, pedido, {
        precoSomatorio: newPreco,
        produto: idNovoProduto,
      });
    } else if (!produtoId) {
      const precoProduto = pedido.precoSomatorio / pedido.quantidade;
      const newQuantidade = quantidade;
      const newPreco = newQuantidade * precoProduto;

      await manager.update(Pedidos, pedido, {
        quantidade: newQuantidade,
        precoSomatorio: newPreco,
      });
    } else {
      const newProduto = await manager.findOne(Produtos, produtoId);
      if (!newProduto)
        return res
          .status(404)
          .json({ message: `Produto com ID ${produtoId} não encontrado!` });
      const newPreco = quantidade * newProduto.precoUnitario;
      const newProdutoId = newProduto.id;

      await manager.update(Pedidos, pedido, {
        quantidade: quantidade,
        precoSomatorio: newPreco,
        produto: newProduto,
      });
    }

    return res
      .status(200)
      .json({ message: `Pedido com id ${pedidoId} atualizado com sucesso!` });
  }

  async create(req: Request, res: Response): Promise<Response> {
    if (!req.body) return res.status(404).json({ error: "Params not found!" });

    const manager = getManager();

    const { quantidade, produtoId } = req.body;

    if (!quantidade || !produtoId)
      return res.status(404).json({ error: "Params not found!" });

    const produto = await manager.findOne(Produtos, produtoId);

    if (!produto)
      return res
        .status(404)
        .json({ error: `Produto com ID ${produtoId} não encontrado!` });

    const precoSomatorio = quantidade * produto.precoUnitario;

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
