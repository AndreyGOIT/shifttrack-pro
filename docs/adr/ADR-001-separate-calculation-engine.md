ADR-001: Separate Calculation Engine from Application Layer

Status: Accepted

Date: 2026-06-26

⸻

Context

Payroll calculation is one of the most complex parts of the application.

Business rules evolve over time and differ between organizations, collective agreements, and countries.

Embedding calculation logic directly inside controllers or API routes would make the system difficult to maintain and test.

⸻

Decision

Introduce a dedicated Calculation Engine composed of independent domain services.

Business logic will be isolated from:

- API routes
- database access
- presentation layer

The engine will receive domain objects as input and return calculation results without directly accessing external infrastructure.

⸻

Consequences

Advantages

- High testability
- Clear separation of concerns
- Easier maintenance
- Reusable calculation logic
- Independent evolution of business rules

⸻

Trade-offs

- Slightly more project structure
- More classes and services
- Higher initial design effort

These trade-offs are acceptable because maintainability and extensibility are primary project goals.

⸻

Alternatives Considered

Business logic inside API routes

Rejected.

Would quickly lead to large controllers with tightly coupled business logic.

⸻

Single PayrollService

Rejected.

A single service responsible for all calculations would violate the Single Responsibility Principle and become difficult to extend.

⸻

Rationale

The selected architecture provides a scalable foundation for future features such as:

- configurable overtime rules
- multiple payroll policies
- country-specific calculations
- organization-specific rule sets
- payroll export
