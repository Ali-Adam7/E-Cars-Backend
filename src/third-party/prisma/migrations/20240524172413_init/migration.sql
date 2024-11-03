-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "milage" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "purchaseOrderId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("purchaseOrderId","carId")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "purchaseOrderId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "total" INTEGER,
    "status" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("purchaseOrderId")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("userId","carId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_purchaseOrderId_key" ON "PurchaseOrder"("purchaseOrderId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("purchaseOrderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "User" ("id","email","hashedPassword","createdAt","name","address","role") VALUES (-1,'admin@ecars.sale','$2y$10$A7rYWo9GnhVaGGNmIad2hOBV3xh286aZFsgb38DGT6JshaV4QAPbK', CURRENT_TIMESTAMP, 'admin','admin','admin');
INSERT INTO "User" ("id","email","hashedPassword","createdAt","name","address","role") VALUES (0,'guest@ecars.sale','$2y$10$A7rYWo9GnhVaGGNmIad2hOBV3xh286aZFsgb38DGT6JshaV4QAPbK', CURRENT_TIMESTAMP, 'user','user','user');

INSERT INTO "Car" (id, model, make, description, type, price, year, milage, quantity) VALUES
(2, 'Leaf', 'Nissan', 'A compact and affordable electric car.', 'Hatchback', 32000, 2021, 25000, 5),
(3, 'ID.4', 'Volkswagen', 'An all-electric compact SUV with a comfortable interior.', 'SUV', 45000, 2023, 5000, 4),
(4, 'Mustang Mach-E', 'Ford', 'A sporty electric SUV with impressive range.', 'SUV', 55000, 2023, 8000, 3),
(5, 'Bolt EV', 'Chevrolet', 'An affordable compact electric hatchback.', 'Hatchback', 30000, 2021, 20000, 6),
(6, 'Model X', 'Tesla', 'A luxury electric SUV with ample space and range.', 'SUV', 90000, 2022, 15000, 2),
(7, 'Ioniq 5', 'Hyundai', 'A stylish and spacious electric crossover.', 'SUV', 48000, 2023, 5000, 4),
(8, 'Kona Electric', 'Hyundai', 'A compact SUV with great range and efficiency.', 'SUV', 37000, 2022, 10000, 3),
(9, 'R1T', 'Rivian', 'An innovative electric truck with off-road capabilities.', 'Truck', 73000, 2023, 2000, 2),
(10, 'Cybertruck', 'Tesla', 'A futuristic and durable electric truck.', 'Truck', 60000, 2024, 0, 6),
(11, 'e-tron', 'Audi', 'A luxurious and powerful electric SUV.', 'SUV', 65000, 2021, 18000, 4),
(12, 'EQC', 'Mercedes-Benz', 'An elegant electric SUV with advanced features.', 'SUV', 70000, 2022, 14000, 3),
(13, 'Polestar 2', 'Polestar', 'A stylish electric sedan with advanced tech.', 'Sedan', 50000, 2022, 15000, 5),
(14, 'Taycan', 'Porsche', 'A high-performance electric sports sedan.', 'Sedan', 90000, 2023, 7000, 2),
(15, 'Model 3', 'Tesla', 'A compact electric sedan with great range and performance.', 'Sedan', 42000, 2023, 3000, 6),
(16, 'I-PACE', 'Jaguar', 'A premium electric SUV with sporty handling.', 'SUV', 68000, 2022, 11000, 3),
(17, 'EV6', 'Kia', 'A well-rounded electric crossover with fast charging.', 'SUV', 46000, 2023, 5000, 4),
(18, 'Model Y', 'Tesla', 'A versatile and spacious electric crossover.', 'SUV', 54000, 2022, 8000, 5),
(19, 'Niro EV', 'Kia', 'An efficient and affordable electric SUV.', 'SUV', 39000, 2021, 17000, 4),
(20, 'Zoe', 'Renault', 'A small electric car perfect for city driving.', 'Hatchback', 28000, 2020, 22000, 5);