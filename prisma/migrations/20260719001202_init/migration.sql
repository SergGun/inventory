-- CreateTable
CREATE TABLE "Product" (
    "PID" TEXT NOT NULL,
    "PUserID" TEXT NOT NULL,
    "PName" TEXT NOT NULL,
    "PDescription" TEXT,
    "PSku" TEXT,
    "PPrice" DECIMAL(12,2) NOT NULL,
    "PQuantity" INTEGER NOT NULL DEFAULT 0,
    "PLowStock" INTEGER,
    "PCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("PID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_PSku_key" ON "Product"("PSku");

-- CreateIndex
CREATE INDEX "Product_PUserID_PName_idx" ON "Product"("PUserID", "PName");

-- CreateIndex
CREATE INDEX "Product_PCreatedAt_idx" ON "Product"("PCreatedAt");
