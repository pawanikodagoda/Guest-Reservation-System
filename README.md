# OCEAN VIEW RESORT – ONLINE ROOM RESERVATION SYSTEM

## 3-Tier Architecture
1. **Presentation**: React Hooks, Components, Axios Interceptors.
2. **Business**: Spring Boot Services, JWT Security, Custom Exceptions.
3. **Data**: MySQL, Hibernate/JPA, Repository Pattern.

## Git Workflow
- `main` branch: Stable releases.
- `feature/database-design`: Schema and seeds.
- `feature/backend-api`: Core logic and controllers.
- `feature/frontend-ui`: React components and state.

## API Documentation
- `POST /api/auth/login` - Get JWT Token
- `GET /api/rooms/available` - Fetch free rooms
- `POST /api/reservations` - Book a stay
- `GET /api/reservations/{id}` - View invoice

## Documentation
- [UML Diagrams](file:///c:/Users/Thiviru/Desktop/Guest_reservation_system/docs/uml_diagrams.md) - Detailed design diagrams (Task A).
- [Test Plan](file:///c:/Users/Thiviru/Desktop/Guest_reservation_system/docs/TEST_PLAN.md) - Rationale, data, and TDD approach (Task C).
- [Database Schema](file:///c:/Users/Thiviru/Desktop/Guest_reservation_system/database/schema.sql) - MySQL table structures.

## Usage
- **Login Credentials**: Use the registration page to create a staff account.
- **New Booking**: Select "New Booking" from the menu.
- **Billing**: Click the "Invoice" icon in the "Matrix" (Reservation List) view.
- **Help**: Access the "Intelligence" tab for staff instructions.
