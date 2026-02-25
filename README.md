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
- Detailed walkthrough and UML are located in the `.gemini/antigravity/brain` directory.
