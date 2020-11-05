import { getManager } from "typeorm";
import { Request, Response } from "express";

import { Users } from "../models/Users";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    if (!req.body) return res.status(404).json({ error: "Params not found!" });

    const manager = getManager();

    const { name, password } = req.body;

    if (!name && !password)
      return res.status(404).json({ error: "Params not found!" });

    const newUser = manager.create(Users, {
      name,
      password,
      email: "tracking@trade.com",
    });

    await manager.save(newUser);

    return res
      .status(200)
      .json({ message: `Usuário adicionado com id ${newUser.id}` });
  }
}

export default new UserController();
