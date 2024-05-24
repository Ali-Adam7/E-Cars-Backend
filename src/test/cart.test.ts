import { agent as request } from "supertest";
import app from "../app";
import prisma from "../third-party/prisma/prismClient";
import CartItem from "../modules/Cart/entities/CartItem";
beforeAll(async () => {
  await prisma.car.deleteMany({});
  await prisma.user.deleteMany({});
  const admin = { email: "admin@ecars.sale", plainTextPassword: "test" };

  const adminAuth = await request(app).post("/auth").send(admin);
  const { header } = adminAuth;

  const car = {
    id: 1,
    model: "eVToL",
    make: "XPeng",
    description:
      "Driven by our vision of 'tech for the greater good' and customers' evolving demands, we continue to reach technical breakthroughs and set new industry benchmarks,",
    type: "Sedan",
    price: 1000000,
    img: "https://media.npr.org/assets/img/2022/11/02/3_custom-71a63a232a91d5339ea937a57e32bee6c06fa9ee.jpg",
    year: 2024,
    milage: 0,
    quantity: 1,
    deal: false,
  };
  await request(app)
    .post("/catalog/car")
    .send(car)
    .set("Cookie", [...header["set-cookie"]]); // this line I add cookies...

  const registercredentials = {
    id: 1,
    email: "correctEmail",
    plainTextPassword: "correctPassword",
    name: "name",
    address: "address",
  };
  await request(app).post("/auth").send(registercredentials);
});
describe("POST /cart", () => {
  it("Add item to cart", async () => {
    const test1 = await request(app).post(`/shopping/cart/1/1`).send({ quantity: 5 }).type("json");
    expect(test1.statusCode).toBe(201);
  });
});

describe("GET /cart", () => {
  it("get cart", async () => {
    const test1 = await request(app).get(`/shopping/cart/1`);
    const cart = test1.body as CartItem[];
    expect(test1.statusCode).toBe(200);
    expect(cart[0].carId).toBe(1);
    expect(cart[0].quantity).toBe(5);
    expect(cart[0].car.id).toBe(1);
  });
});

describe("Update /cart", () => {
  it("update cart", async () => {
    await request(app).post(`/shopping/cart/1/1`).send({ quantity: 10 });
    const test1 = await request(app).get(`/shopping/cart/1`);
    const cart = test1.body as CartItem[];
    expect(test1.statusCode).toBe(200);
    expect(cart[0].quantity).toBe(10);
  });
});

describe("Delete /cart", () => {
  it("delete cart item", async () => {
    await request(app).delete(`/shopping/cart/1/1`);
    const test1 = await request(app).get(`/shopping/cart/1`);
    const cart = test1.body as CartItem[];
    expect(test1.statusCode).toBe(200);
    expect(cart[0].quantity).toBe(10);
  });
});
