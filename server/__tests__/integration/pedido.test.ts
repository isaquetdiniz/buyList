import request from "supertest";
import { getManager } from "typeorm";
import { Pedidos } from "../../src/models/Pedidos";
import { Produtos } from "../../src/models/Produtos";
import { app } from "../../src/app";
import { createConnection } from "typeorm";
import { Users } from "../../src/models/Users";

describe("Pedidos", () => {
  beforeAll(async () => {
    await createConnection();
    const manager = getManager();
    const newUser = await manager.create(Users, {
      name: "TrackingTrade",
      email: "tracking@trade.com",
      password: "trackingtrade",
    });
    await manager.save(newUser);
    const newProduto = await manager.create(Produtos, {
      nome: "Tomate",
      descricao: "Tomate vermelhinho da fazenda do seu zé",
      precoUnitario: 4,
      categoria: "Verduras",
    });
    await manager.save(newProduto);
    return;
  });

  afterAll(async () => {
    const manager = getManager();
    await manager.delete(Users, { name: "TrackingTrade" });
    await manager.delete(Produtos, { nome: "Tomate" });
  });

  it("Should create a pedido if the values are correct", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .post("/pedido")
      .send({
        quantidade: 10,
        produtoId: 1,
      })
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("Should edit a pedido if the values are correct", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .put("/pedido/1")
      .send({
        quantidade: 100,
        produtoId: 1,
      })
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("Should list a pedidos if he exists", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .get("/pedido/1")
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("precoSomatorio");
  });

  it("Should list pedidos pagination if he exists", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .get("/pedido?page=0")
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("pedidos");
  });

  it("Should delete a pedido if it exists", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .delete("/pedido/1")
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
