# 🚀 AstroBookings: 📡 Project Briefing

🚀 **AstroBookings** is a comprehensive platform connecting space agencies with travelers for commercial space flights. It manages rocket launches, bookings, payments, and communications, ensuring a seamless experience for agencies and travelers while maintaining robust backend operations and monitoring.

The project is divided into six main **domains**: `Authentication`, `Agency Management`, `Booking Management`, `Financial Operations`, `System Monitoring`, and `Notification System`. Each domain has specific requirements that cater to different user roles and system functionalities.

The common vocabulary and understanding of the system's requirements is based on the following domain **entities**: `User`, `Traveler`, `Agency`, `Rocket`, `Launch`, `Booking`, `Invoice`, `Payment`, `Notification`, `EntryLog`, and `JobQueue`. These entities represent the core concepts of the space travel booking system and define the interactions between users, agencies, launches, and financial transactions.

## 📋 Requirements by Domain

### 0. Authentication

1. Register an account
2. Log in to the system
3. Log out of the system
4. Generate a JWT for a validated user
5. Validate a JWT and identify the user

### 1. Agency Management

1. Create and manage agency profile with tax information
2. Add and manage rockets with capacity and range details
3. Schedule new launches with destination, date, and price per seat
4. View the occupancy of scheduled launches
5. Delay, abort, fail or mark as successful scheduled launches
6. View a financial report of bookings for launches

### 2. Booking Management

1. View available launches as an anonymous visitor
2. Register as a traveler with contact information
3. Book seats on a launch as a registered traveler
4. View updates on the status of booked launches
5. Cancel booking and see a refund if eligible

### 3. Financial Operations

1. Generate invoices for agencies based on successful launches
2. Generate invoices for agencies for aborted launches
3. Track payment status of invoices
4. View a revenue report for each agency
5. Generate an annual report of actual and pending revenues

### 4. System Monitoring

1. Save logs of all activities
2. View system logs to monitor system behavior
3. Check the status of the notification service

### 5. Notification System

1. Send email notifications about launches for agencies
2. Send email notifications about bookings for travelers
3. Send exclusive notifications about new launches for VIP travelers
4. View the status of the notification queue as an IT employee
5. Change the status of notifications as an IT employee

## 📇 Main Entities

1. `User`: Base entity for all system users with login credentials and role.
2. `Traveler`: Specialization of User. Represents clients who make bookings for space travels.
3. `Agency`: Specialization of User. Represents space agencies that offer launches.
4. `Rocket`: A spacecraft owned by agencies with details such as capacity and range.
5. `Launch`: A scheduled space trip on a rocket with date, destination, and price per seat.
6. `Booking`: The reservation of seats on a specific launch made by a traveler.
7. `Invoice`: Charges generated for agencies for completed launches.
8. `Payment`: Payments made by agencies to settle issued invoices.
9. `Notification`: Messages sent to system users about various events.
10. `EntryLog`: System activity logs, used for monitoring and auditing.
