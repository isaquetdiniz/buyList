import { Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

class authController {
  async login(req: Request, res: Response): Promise<Response> {
    if (req.body.user === "isaque" && req.body.pwd === "123") {
      const id = 1;
      let token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3600,
      });
      return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: "Login inválido!" });
  }
  async logout(req: Request, res: Response): Promise<Response> {
    res.json({ auth: false, token: null });
  }
}

export default new authController();
