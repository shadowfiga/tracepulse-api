-- CreateTable
CREATE TABLE "Account" (
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
