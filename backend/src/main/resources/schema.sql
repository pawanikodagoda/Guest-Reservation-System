-- Ocean View Resort Reservation System Database Schema
-- 1. Create Database
CREATE DATABASE IF NOT EXISTS ocean_view_db;

USE ocean_view_db;

-- 2. Drop existing tables if they exist (order matters due to FK constraints)
DROP TABLE IF EXISTS payments;

DROP TABLE IF EXISTS reservations;

DROP TABLE IF EXISTS rooms;

DROP TABLE IF EXISTS guests;

DROP TABLE IF EXISTS users;

-- 3. Users Table (Authentication and Authorization)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Guests Table (Customer Information)
CREATE TABLE guests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Rooms Table (Room Inventory)
CREATE TABLE rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL UNIQUE,
    room_type VARCHAR(50) NOT NULL, -- SINGLE, DOUBLE, SUITE, DELUXE
    price_per_night DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'AVAILABLE' -- AVAILABLE, OCCUPIED, MAINTENANCE
);

-- 6. Reservations Table
CREATE TABLE reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    guest_id BIGINT NOT NULL,
    user_id BIGINT, -- Linked if customer makes online booking
    room_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, CANCELLED, COMPLETED
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reservation_guest FOREIGN KEY (guest_id) REFERENCES guests (id),
    CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_reservation_room FOREIGN KEY (room_id) REFERENCES rooms (id)
);

-- 7. Payments Table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reservation_id BIGINT NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL, -- CASH, CREDIT_CARD, ONLINE
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED
    CONSTRAINT fk_payment_reservation FOREIGN KEY (reservation_id) REFERENCES reservations (id)
);