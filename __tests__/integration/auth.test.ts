import request from "supertest";
import { getManager } from "typeorm";
import { app } from "../../src/app";
import { Users } from "../../src/models/User";

describe("Authentication", () => {
  it("Should received JWT token when authenticated with valid credentials", async () => {
    const manager = getManager();

    const newUser = await manager.create(Users, {
      name: "TrackingTrade",
      email: "tracking@trade.com",
      password: "trackingtrade",
    });

    const response = await request(app)
      .post("/login")
      .send({
        name: "TrackingTrade",
        password: "trackingtrade",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth", true);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not received JWT token because the credentials are wrong", async () => {
    const manager = getManager();

    const newUser = await manager.create(Users, {
      name: "TrackingTrade",
      email: "tracking@trade.com",
      password: "trackingtrade",
    });

    const response = await request(app)
      .post("/login")
      .send({
        name: "TrackingTradeWrong",
        password: "trackingtrade",
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Login inválido!");
  });

  it("Logout", async () => {
    const response = await request(app).post("/logout");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("auth", false);
    expect(response.body).toHaveProperty("token");
  });
});
