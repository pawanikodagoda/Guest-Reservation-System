# Test Plan & TDD Documentation - Ocean View Resort

This document outlines the testing strategy, test-driven development (TDD) approach, and automation plan for the Guest Reservation System, as required by Task C.

## 1. Test Rationale
The primary goal of the testing phase is to ensure the reliability and security of the reservation system. Given the high volume of guests and the manual management issues previously experienced by the resort, the system must handle booking logic accurately (e.g., no double-booking) and securely (authorized access only).

## 2. Test-Driven Development (TDD) Approach
Our development followed the TDD "Red-Green-Refactor" cycle:
1.  **Red:** Write a failing unit test for a specific functionality (e.g., `createReservation` should fail if the room is occupied).
2.  **Green:** Implement the minimum code necessary to make the test pass.
3.  **Refactor:** Improve the code structure while ensuring tests remain passing.

**Example:**
Before implementing the room availability check in `ReservationService`, a test case `testCreateReservation_FailsIfOccupied` was written. Only after the test was verified to fail was the check added to the service.

## 3. Test Plan
The plan covers multiple levels of testing:

| Test Level | Scope | Tools |
| :--- | :--- | :--- |
| **Unit Testing** | Individual classes and methods (Services, Repositories). | JUnit 5, Mockito |
| **Integration Testing** | Interaction between backend components and Database. | Spring Boot Test, H2/MySQL |
| **API Testing** | REST endpoints validation. | RestTemplate / MockMvc |
| **UI Testing** | Frontend component rendering and user flows. | Vitest / Testing Library |

## 4. Test Data
Sample data used during testing:
*   **Guests:**
    *   `John Doe`, `john@example.com`, `+123456789`
    *   `Jane Smith`, `jane@example.com`, `+987654321`
*   **Rooms:**
    *   Room `101`, `DELUXE`, `$150.00`, `AVAILABLE`
    *   Room `202`, `SUITE`, `$300.00`, `OCCUPIED`
*   **Reservations:**
    *   Check-in: `2024-03-01`, Check-out: `2024-03-05` (4 nights)

## 5. Test Automation
Automation is achieved through:
*   **Backend Maven Tests:** Integrated into the build lifecycle. Running `mvn test` executes all suite.
*   **GitHub Actions CI:** Every push to the repository triggers a workflow that builds both the Java backend and React frontend, running all automated tests.

## 6. Application of Test Plan
The test plan was applied to verify:
*   **Authentication:** Only valid users can login.
*   **Reservation Logic:** Price calculations are correct based on nights and room rate.
*   **Edge Cases:** Check-out date before check-in date is rejected.
