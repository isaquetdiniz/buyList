import request from "supertest";
import { app } from "../../src/app";

describe("Authentication", () => {
  it("Should received JWT token when authenticated with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        user: "isaque",
        pwd: "123",
      });

    expect(response.body).toHaveProperty("auth", true);
    expect(response.body).toHaveProperty("token");
  });

  it("Logout", async () => {
    const response = await request(app).post("/logout");

    expect(response.body).toHaveProperty("auth", false);
    expect(response.body).toHaveProperty("token");
  });
});
