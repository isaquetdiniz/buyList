import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";

class ExampleController {
  async teste(req: Request, res: Response): Promise<Response> {
    return res
      .status(200)
      .json({ message: `Está funcionando!!!!, id: ${req.userId}` });
  }
}

export default new ExampleController();
