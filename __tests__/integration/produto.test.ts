import request from "supertest";
import { getManager } from "typeorm";
import { Produtos } from "../../src/models/Produtos";
import { app } from "../../src/app";
import { createConnection } from "typeorm";
import { Users } from "../../src/models/Users";

describe("Produtos", () => {
  beforeAll(async () => {
    return createConnection();
  });

  beforeEach(async () => {
    const manager = getManager();
    const newUser = await manager.create(Users, {
      name: "TrackingTrade",
      email: "tracking@trade.com",
      password: "trackingtrade",
    });
    await manager.save(newUser);
  });

  afterEach(async () => {
    const manager = getManager();
    await manager.delete(Users, {
      name: "TrackingTrade",
      email: "tracking@trade.com",
      password: "trackingtrade",
    });
  });

  it("Should create a product if the values are correct", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .post("/produto")
      .send({
        nome: "Tomate",
        descricao: "Tomate vermelhinho da fazenda do seu zé",
        precoUnitario: 4,
        categoria: "Verduras",
      })
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("Should edit a product if the values are correct", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .put("/produto/1")
      .send({
        nome: "Cebola",
        descricao: "Cebola Roxa da fazenda do seu zé",
        precoUnitario: 7,
        categoria: "Verduras",
      })
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it("Should list a product if he exists", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .get("/produto/1")
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("categoria");
  });

  it("Should list products pagination if he exists", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .get("/produto?page=0")
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("produtos");
  });

  it("Should delete a product if it exists", async () => {
    const res = await request(app)
      .post("/login")
      .send({ name: "TrackingTrade", password: "trackingtrade" });
    const token = res.body.token;

    const response = await request(app)
      .delete("/produto/1")
      .set("x-access-token", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
