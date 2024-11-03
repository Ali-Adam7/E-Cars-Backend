import { PrismaClient } from "@prisma/client";
require("dotenv").config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV == "TEST" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
    },
  },
});

export default prisma;
