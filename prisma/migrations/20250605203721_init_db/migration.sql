-- CreateTable
CREATE TABLE `users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NULL,
    `Email` VARCHAR(255) NOT NULL,
    `CreatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
