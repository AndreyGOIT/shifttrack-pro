# WorkLog Aggregate

## Purpose

The WorkLog aggregate is the central domain entity of ShiftTrack Pro.

It represents a single employee work shift together with its lifecycle,
calculated values and approval status.

The aggregate is responsible for maintaining business invariants and
coordinating work time calculations.

It does not perform payroll calculations itself. Instead it delegates
calculation logic to dedicated Domain Services.

---

# Responsibilities

The WorkLog aggregate is responsible for:

- storing raw work shift data
- maintaining lifecycle state
- ensuring domain invariants
- storing calculated work summary
- coordinating payroll calculations

The aggregate is NOT responsible for:

- calculating overtime
- calculating breaks
- calculating payroll
- database persistence
- user authentication

---

# Aggregate Structure

WorkLog

├── Identity
│
├── Raw Shift Data
│
├── Break Entries
│
├── Calculation Summary
│
└── Status

---

# Identity

Every WorkLog has a unique identifier.

Fields:

- WorkLogId
- EmployeeId
- OrganizationId

---

# Raw Shift Data

Represents data entered by the employee.

Fields:

- shiftDate
- startedAt
- endedAt

The raw data never contains calculated values.

---

# Break Entries

Contains manually entered breaks.

Each break contains:

- startedAt
- endedAt
- paid / unpaid

Future versions may support multiple break entries.

---

# Calculation Summary

Contains calculated values produced by PayrollCalculationEngine.

Examples:

- total worked duration
- overtime
- calculated break duration
- payroll summary

The calculation summary represents a snapshot.

Previously approved work logs are never automatically recalculated.

---

# Status Lifecycle

Draft

↓

Submitted

↓

Approved

or

Rejected

Allowed transitions:

Draft → Submitted

Submitted → Approved

Submitted → Rejected

Rejected → Draft

Approved is a terminal state.

---

# Business Invariants

A WorkLog must satisfy the following rules:

- end time must be after start time
- break duration cannot be negative
- calculated duration cannot be negative
- approved work logs cannot be modified
- submitted work logs cannot change worked time

---

# Domain Services

WorkLog delegates calculations to:

- TimeRoundingService
- BreakCalculator
- WorkTimeCalculator
- OvertimeCalculator
- PayrollCalculationEngine

---

# Future Extensions

The aggregate is designed to support:

- night shift allowance
- evening allowance
- weekend allowance
- holiday allowance
- weekly overtime
- collective agreement (TES) rules
- audit trail
- approval history
- digital signatures

---

# Design Notes

The WorkLog aggregate stores both:

- raw user input

and

- calculated payroll snapshot.

This approach guarantees historical correctness even if business rules
change in the future.
