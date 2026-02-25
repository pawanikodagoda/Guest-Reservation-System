USE ocean_view_db;

-- Seed Users (Password is 'password123' BCrypt-encoded: $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQUb4vC)
INSERT INTO users (username, password, role) VALUES 
('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQUb4vC', 'ROLE_ADMIN'),
('staff', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQUb4vC', 'ROLE_STAFF');

-- Seed Rooms
INSERT INTO rooms (room_number, room_type, price_per_night, status) VALUES 
('101', 'SINGLE', 50.00, 'AVAILABLE'),
('102', 'SINGLE', 50.00, 'AVAILABLE'),
('201', 'DOUBLE', 85.00, 'AVAILABLE'),
('202', 'DOUBLE', 85.00, 'AVAILABLE'),
('301', 'SUITE', 150.00, 'AVAILABLE'),
('302', 'DELUXE', 120.00, 'AVAILABLE');

-- Seed Guests
INSERT INTO guests (first_name, last_name, email, phone, address) VALUES 
('John', 'Doe', 'john.doe@example.com', '1234567890', '123 Beach Ave, Ocean City'),
('Jane', 'Smith', 'jane.smith@example.com', '0987654321', '456 Hill St, Mountain View');
