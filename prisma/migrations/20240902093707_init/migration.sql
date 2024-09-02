-- CreateTable
CREATE TABLE "UserProfiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "UserProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfiles_email_key" ON "UserProfiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfiles_phone_key" ON "UserProfiles"("phone");
