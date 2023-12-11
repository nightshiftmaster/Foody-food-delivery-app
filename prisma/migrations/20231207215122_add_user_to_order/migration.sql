-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userEmail" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
