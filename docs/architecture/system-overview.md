System Overview

Purpose

ShiftTrack Pro is a full-stack web application for recording working time, calculating overtime, and generating payroll-ready summaries.

The project is designed as a production-oriented portfolio application that demonstrates modern software architecture, domain-driven design principles, and realistic business logic inspired by industrial work environments.

⸻

High-Level Architecture

+----------------------+
| Frontend |
| Next.js + React |
+----------+-----------+
|
v
+----------------------+
| Application Layer |
| API Routes |
+----------+-----------+
|
v
+----------------------+
| Calculation Engine |
| Domain Services |
+----------+-----------+
|
v
+----------------------+
| Prisma ORM |
+----------+-----------+
|
v
+----------------------+
| PostgreSQL |
+----------------------+

⸻

Main Components

Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

Responsible for user interaction and presentation.

⸻

Backend

Application services expose REST API endpoints and coordinate domain logic.

Business rules are not implemented inside API handlers.

⸻

Calculation Engine

The Calculation Engine is the core of the system.

It transforms raw work logs into payroll-ready calculation results.

The engine is implemented as a collection of independent domain services.

⸻

Database

PostgreSQL stores:

- organizations
- users
- work logs
- shift templates
- payroll data
- calculation results

Prisma ORM provides type-safe database access.

⸻

Design Principles

- Separation of concerns
- Single Responsibility Principle
- Domain-driven design
- Testable business logic
- Immutable raw work data
- Production-oriented architecture

⸻

Project Goals

The primary goal of ShiftTrack Pro is not only to record working hours but also to demonstrate how a real payroll calculation engine can be designed using modern full-stack technologies.
