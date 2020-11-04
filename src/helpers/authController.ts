import { Request, Response } from "express";
import { Users } from "../../src/models/Users";
import { getManager } from "typeorm";
import "dotenv/config";
import jwt from "jsonwebtoken";

class authController {
  async login(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;
    const manager = getManager();

    if (!name || !password)
      return res.status(404).json({ message: "No User in body" });

    const user = await manager.findOne(Users, {
      where: { name: name, password: password },
    });

    if (!user) return res.status(404).json({ message: "Login inválido" });

    let token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 3600,
    });

    return res.status(200).json({ auth: true, token: token, user: user });
  }
  async logout(req: Request, res: Response): Promise<Response> {
    res.status(200).json({ auth: false, token: null });
  }
}

export default new authController();
