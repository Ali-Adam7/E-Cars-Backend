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
    "img" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "milage" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "deal" BOOLEAN NOT NULL,

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

INSERT INTO "User" ("id","email","hashedPassword","createdAt","name","address","role") VALUES (0,'admin@ecars.sale','$2y$10$A7rYWo9GnhVaGGNmIad2hOBV3xh286aZFsgb38DGT6JshaV4QAPbK', CURRENT_TIMESTAMP, 'admin','admin','admin');
