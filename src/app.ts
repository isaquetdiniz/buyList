import express, { Express } from "express";
import cors from "cors";
import * as routes from "./routes";

class Application {
  express: Express;

  constructor() {
    this.express = express();
    this.middlewares();
    this.client();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json({ limit: "5mb" }));
  }

  routes() {
    this.express.use(routes.example);
    this.express.use(routes.pedido);
    this.express.use(routes.produto);
    this.express.use(routes.auth);
  }

  client() {
    this.express.get("/", (req, res) => {
      res.json({
        App: "buyList",
        Status: "develop",
        Autor: "isaquetdiniz",
      });
    });
  }
}

const app = new Application().express;

export { app };
