/*
  Warnings:

  - Added the required column `name` to the `training_sheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `training_sheets` ADD COLUMN `name` VARCHAR(50) NOT NULL;
