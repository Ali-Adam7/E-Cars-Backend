import { agent as request } from "supertest";
import app from "../app";
import bodyParser = require("body-parser");
import prisma from "../third-party/prismClient";
import AuthenticatedUserDTO from "../modules/Authentication/DTOs/DBUserDTO";
app.use(bodyParser);
describe("POST /auth", () => {
  it("Authenticate with wrong credentials", async () => {
    await prisma.user.deleteMany({});

    const test1 = await request(app).put("/auth");
    expect(test1.statusCode).toBe(400);

    const credentials = { email: "wrongEmail", plainTextPassword: "wrongPassword" };
    const test2 = await request(app).put("/auth").send(credentials).type("json");
    expect(test2.statusCode).toBe(401);
  });
});

describe("POST /auth", () => {
  it("Register user", async () => {
    await prisma.user.deleteMany({});

    const registercredentials = {
      email: "correctEmail",
      plainTextPassword: "correctPassword",
      name: "name",
      address: "address",
    };
    const test1 = await request(app).post("/auth").send(registercredentials);
    const authUser = test1.body as AuthenticatedUserDTO;
    expect(test1.statusCode).toBe(200);
    expect(authUser.email).toBe(registercredentials.email);
    const test2 = await request(app).post("/auth").send(registercredentials);
    expect(test2.statusCode).toBe(400);
  });
});

describe("POST /auth", () => {
  it("Authenticate with correct email but wrong password", async () => {
    await prisma.user.deleteMany({});

    const registercredentials = {
      email: "correctEmail",
      plainTextPassword: "correctPassword",
      name: "name",
      address: "address",
    };
    const test1 = await request(app).post("/auth").send(registercredentials);
    const authUser = test1.body as AuthenticatedUserDTO;

    expect(test1.statusCode).toBe(200);
    expect(authUser.email).toBe(registercredentials.email);

    const test2 = await request(app)
      .put("/auth")
      .send({ ...registercredentials, plainTextPassword: "wrong password" });
    expect(test2.statusCode).toBe(401);
    expect(test2.body.accessToken).toBe(undefined);
  });
});
