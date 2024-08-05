/*
  Warnings:

  - Made the column `refreshtoken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `refreshtoken` VARCHAR(191) NOT NULL DEFAULT '';
