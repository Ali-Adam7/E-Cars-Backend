import { agent as request } from "supertest";
import app from "../app";
import prisma from "../third-party/prisma/prismClient";
import express from "express";
app.use(express.json());
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
describe("POST /catalog", () => {
  it("Create a car", async () => {
    await prisma.car.deleteMany({});

    const test1 = await request(app).post("/catalog/car").send(car).type("json");
    expect(test1.statusCode).toBe(201);
  });
});

describe("GET /catalog", () => {
  it("Get car", async () => {
    const test1 = await request(app).get(`/catalog/cars/?make=${car.make}&page=0`);
    expect(test1.body.cars[0].make).toBe(car.make);
    const id = test1.body.cars[0].id;
    const test2 = await request(app).get(`/catalog/car/${id}}`);
    expect(test2.body.price).toBe(car.price);
  });
});

describe("PUT /catalog", () => {
  it("modify car", async () => {
    const carBeforeRes = await request(app).get(`/catalog/cars/?make=${car.make}&page=0`);

    const carBefore = carBeforeRes.body.cars[0];
    expect(carBefore.price).toBe(car.price);

    const test1 = await request(app).put(`/catalog/car/${carBefore.id}`).send({ price: 0 });
    expect(test1.statusCode).toBe(200);

    const carAfter = await request(app).get(`/catalog/car/${carBefore.id}`);

    expect(carAfter.body.price).toBe(0);
  });
});

describe("DELETE /catalog", () => {
  it("delete car", async () => {
    const test1 = await request(app).delete(`/catalog/car/1`);
    expect(test1.statusCode).toBe(200);
    const carAfter = await request(app).get(`/catalog/car/1`);
    expect(carAfter.statusCode).toBe(404);
  });
});
