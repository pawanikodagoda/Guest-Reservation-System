-- USE ocean_view_db;
-- Seed Users (Commented out to prevent duplicate entry errors during auto-seed)
-- INSERT INTO users (username, password, role) VALUES 
-- ('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQUb4vC', 'ROLE_ADMIN'),
-- ('staff', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQUb4vC', 'ROLE_STAFF');
-- Seed Rooms (12 rooms, prices in LKR Rs. 10,000 - 15,000)
INSERT INTO
  rooms (room_number, room_type, price_per_night, status)
VALUES
  ('101', 'SINGLE', 10000.00, 'AVAILABLE'),
  ('102', 'SINGLE', 10000.00, 'AVAILABLE'),
  ('103', 'SINGLE', 10500.00, 'AVAILABLE'),
  ('104', 'SINGLE', 10500.00, 'AVAILABLE'),
  ('201', 'DOUBLE', 12000.00, 'AVAILABLE'),
  ('202', 'DOUBLE', 12000.00, 'AVAILABLE'),
  ('203', 'DOUBLE', 12500.00, 'AVAILABLE'),
  ('204', 'DOUBLE', 12500.00, 'AVAILABLE'),
  ('301', 'SUITE', 14000.00, 'AVAILABLE'),
  ('302', 'SUITE', 14000.00, 'AVAILABLE'),
  ('401', 'DELUXE', 15000.00, 'AVAILABLE'),
  ('402', 'DELUXE', 15000.00, 'AVAILABLE');

-- Seed Guests (Sri Lankan names)
INSERT INTO
  guests (first_name, last_name, email, phone, address)
VALUES
  (
    'Kasun',
    'Perera',
    'kasun.perera@gmail.com',
    '0771234567',
    '25/B, Galle Road, Colombo 03'
  ),
  (
    'Nimasha',
    'Bandara',
    'nimasha.bandara@gmail.com',
    '0712345678',
    '14, Temple Road, Kandy'
  );