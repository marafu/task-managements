-- Active: 1691865147361@@127.0.0.1@3306@db

USE db;

CREATE TABLE
    `account` (
        `id` CHAR(36) NOT NULL PRIMARY KEY,
        `external_id` CHAR(64),
        `name` VARCHAR(50) NOT NULL,
        `email` VARCHAR(100) NOT NULL UNIQUE,
        `is_active` BOOLEAN DEFAULT FALSE,
        `verification_code` CHAR(36),
        `password` VARCHAR(1000) NOT NULL,
        `password_algorithm` VARCHAR(30),
        `salt` VARCHAR(255),
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE
    `task`(
        `id` VARCHAR(36) NOT NULL PRIMARY KEY,
        `external_id` VARCHAR(36) NOT NULL UNIQUE,
        `title` VARCHAR(32) NOT NULL,
        `description` TEXT NOT NULL,
        `status` VARCHAR(30) DEFAULT "Todo",
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARACTER SET utf8 COLLATE utf8_general_ci;