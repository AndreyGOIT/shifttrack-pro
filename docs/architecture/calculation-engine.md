Calculation Engine

Overview

The Calculation Engine is responsible for transforming raw work log data into payroll-ready information.

Each calculation step is implemented as an independent domain service.

WorkLog
│
▼
TimeRoundingService
│
▼
BreakCalculator
│
▼
WorkTimeCalculator
│
▼
OvertimeCalculator
│
▼
AllowanceCalculator
│
▼
PayItemGenerator
│
▼
PayrollSummaryBuilder

⸻

Service Responsibilities

TimeRoundingService

Rounds raw timestamps according to company rules.

Current rule:

- Always round up
- 15-minute interval

Example:

17:07 → 17:15

Raw timestamps are never modified.

⸻

BreakCalculator

Determines unpaid break duration.

Current MVP rule:

- Shift longer than 6 hours
- No registered break
- Automatically deduct 30 minutes

⸻

WorkTimeCalculator

Calculates:

- total worked minutes
- effective paid minutes

⸻

OvertimeCalculator

Splits worked time into:

- Regular time
- Overtime (50%)
- Double overtime (100%)

Current MVP rules:

- 0–8 hours → Regular
- 8–10 hours → Overtime 50%
- 10+ hours → Overtime 100%

⸻

AllowanceCalculator

Calculates additional payable items, such as:

- evening allowance
- night allowance

Future versions may include holiday and weekend allowances.

⸻

PayItemGenerator

Produces payroll line items.

Example:

- Regular Hours
- Overtime 50%
- Overtime 100%
- Evening Allowance

⸻

PayrollSummaryBuilder

Aggregates all generated pay items into a payroll summary suitable for reporting or payroll export.

⸻

Design Goals

Each service has a single responsibility.

The Calculation Engine is independent from:

- UI
- Database
- API layer

This makes business logic reusable, testable, and easier to maintain.
