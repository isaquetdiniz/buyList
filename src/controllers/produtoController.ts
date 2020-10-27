import { getManager } from "typeorm";
import { Request, Response } from "express";

import { Produtos } from "../models/Produtos";

class ProdutoController {
  async list(req: Request, res: Response): Promise<Response> {
    const manager = getManager();

    if (!req.params.id) {
      const count = await manager.count(Produtos);
      return res
        .status(200)
        .json({ message: `Existem ${count} produtos cadastrados` });
    }

    const produtoId = req.params.id;

    const produto = await manager.findOne(Produtos, produtoId);

    if (!produto)
      return res
        .status(404)
        .json({ message: `Produto com id ${produtoId} não existe` });

    return res.status(200).json(produto);

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
    if (!req.body) return res.status(404).json({ error: "Params not found!" });

    const manager = getManager();

    const { nome, categoria, precoUnitario, descricao } = req.body;

    const newProduto = manager.create(Produtos, {
      nome,
      categoria,
      precoUnitario,
      descricao,
    });

    await manager.save(newProduto);

    return res
      .status(200)
      .json({ message: `Produto adicionado com id ${newProduto.id}` });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    if (!req.params)
      return res.status(404).json({ error: "Params not found!" });

    const produtoId = req.params.id;
    console.log(produtoId);
    const manager = getManager();

    const produto = await manager.findOne(Produtos, produtoId);

    if (!produto) return res.status(404).json({ error: "ID not found!" });

    await manager.delete(Produtos, produtoId);

    return res
      .status(200)
      .json({ message: `Produto com id ${produtoId} deletado com sucesso!` });
  }
}

export default new ProdutoController();
