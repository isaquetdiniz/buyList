import request from "supertest";
import { getManager } from "typeorm";
import { Produtos } from "../../src/models/Produtos";
import { app } from "../../src/app";

describe("Produtos", () => {
  it("Should create a product if the values are correct", async () => {
    const response = await request(app)
      .post("/produto")
      .send({
        nome: "Tomate",
        descricao: "Tomate vermelhinho da fazenda do seu zé",
        precoUnitario: 4,
        categoria: "Verduras",
      });
    expect(response.body).toHaveProperty("message", "Produto criado");
  });
});
