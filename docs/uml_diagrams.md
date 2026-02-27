# UML Diagrams - Ocean View Resort Management System

This document provides the UML diagrams representing the design and architecture of the Ocean View Resort Reservation System, as required by Task A.

## 1. Use Case Diagram

The system involves two primary actors: **Staff (Operator)** and **Guest** (whose information is managed by the system).

```mermaid
useCaseDiagram
    actor Staff as "Hotel staff / Operator"
    
    package "Guest Reservation System" {
        usecase UC1 as "User Authentication (Login/Signup)"
        usecase UC2 as "Register New Guest"
        usecase UC3 as "Add New Reservation"
        usecase UC4 as "Search/Display Reservation"
        usecase UC5 as "Calculate & Print Bill"
        usecase UC6 as "Manage Room Status"
        usecase UC7 as "Access help section"
    }

    Staff --> UC1
    Staff --> UC2
    Staff --> UC3
    Staff --> UC4
    Staff --> UC5
    Staff --> UC6
    Staff --> UC7
```

### Design Decisions
*   **Centralized Staff Access:** All administrative tasks are restricted to authenticated staff to ensure security and prevent unauthorized bookings.
*   **Automatic Room Management:** Room status is updated automatically during the reservation/cancellation lifecycle to avoid manual errors.

---

## 2. Class Diagram

The class diagram below showcases the core entities and their relationships.

```mermaid
classDiagram
    class User {
        +Long id
        +String username
        +String password
        +String role
    }

    class Guest {
        +Long id
        +String firstName
        +String lastName
        +String email
        +String phone
        +String address
    }

    class Room {
        +Long id
        +String roomNumber
        +RoomType roomType
        +BigDecimal pricePerNight
        +RoomStatus status
    }

    class Reservation {
        +Long id
        +LocalDate checkInDate
        +LocalDate checkOutDate
        +BigDecimal totalPrice
        +ReservationStatus status
    }

    class Payment {
        +Long id
        +BigDecimal amount
        +PaymentMethod method
        +PaymentStatus status
        +LocalDateTime paymentDate
    }

    Guest "1" -- "*" Reservation : makes
    Room "1" -- "*" Reservation : booked for
    Reservation "1" -- "1" Payment : settled by
```

### Design Decisions
*   **Normalization:** Separated `Guest` and `User`. `User` represents system operators, while `Guest` represents the customers staying at the hotel.
*   **Enums for Status:** Used Enums (`RoomStatus`, `ReservationStatus`, `PaymentStatus`) to restrict input to valid states and improve code readability.

---

## 3. Sequence Diagram (Add New Reservation)

This diagram illustrates the flow of adding a new reservation.

```mermaid
sequenceDiagram
    actor Staff
    participant Frontend
    participant AuthProxy as "Security Filter"
    participant ReservationController
    participant ReservationService
    participant RoomRepository
    participant ReservationRepository
    participant Database

    Staff->>Frontend: Fill reservation form
    Frontend->>AuthProxy: POST /api/reservations (with JWT)
    AuthProxy->>ReservationController: Forward Request
    ReservationController->>ReservationService: createReservation(data)
    
    ReservationService->>RoomRepository: findById(roomId)
    RoomRepository->>Database: SELECT * FROM rooms
    Database-->>RoomRepository: Room Details
    
    Note right of ReservationService: Check room availability & Calculate price
    
    ReservationService->>RoomRepository: update status to OCCUPIED
    RoomRepository->>Database: UPDATE rooms SET status='OCCUPIED'
    
    ReservationService->>ReservationRepository: save(reservation)
    ReservationRepository->>Database: INSERT INTO reservations
    Database-->>ReservationRepository: Saved Object
    
    ReservationService-->>ReservationController: Reservation Object
    ReservationController-->>Frontend: 201 Created
    Frontend-->>Staff: Success Notification
```

### Design Decisions
*   **Service Layer Pattern:** Business logic (like price calculation and availability checks) is encapsulated in the `ReservationService` to keep controllers thin and reusable.
*   **JWT Authentication:** Every request is filtered through a security layer to verify the staff's session before processing data.
