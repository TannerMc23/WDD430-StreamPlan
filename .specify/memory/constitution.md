# StreamPlan Constitution
<!-- Sync Impact Report
Version change: initial template → 1.0.0
Modified principles: new principles established for TypeScript, UI, Next.js, testing, and collaboration
Added sections: Technical Standards, Development Workflow
Removed sections: none
Templates requiring updates: ✅ .specify/templates/plan-template.md, ✅ .specify/templates/spec-template.md, ✅ .specify/templates/tasks-template.md, ✅ README.md
Follow-up TODOs: none
-->

## Core Principles

### I. Type-Safe Product Development
All StreamPlan features MUST be implemented in TypeScript with strict mode enabled and no use of `any` in application code. When a value is uncertain, developers MUST model it with explicit interfaces, unions, type guards, or generics instead of loosening types. Rationale: strict typing prevents data mismatches across scheduling, library, and notes workflows.

### II. Tailwind-First Interface Design
User interfaces MUST be built with Tailwind CSS utility classes first. Custom CSS is allowed only when Tailwind cannot express a required layout or interaction, and any exception MUST be documented with a clear reason. Components MUST remain small, composable, and responsive. Rationale: consistency and speed matter for a hobby-streamer tool that should feel polished without extra styling overhead.

### III. Next.js App Router Discipline
StreamPlan MUST follow Next.js App Router conventions. Server components are the default for data fetching and rendering; client components are allowed only when interactivity, browser APIs, or local state is required. File-based routing MUST be used for screens and nested layouts, and route structure MUST match the product domain. Rationale: predictable rendering boundaries make the app easier to reason about and maintain.

### IV. Quality Through Testing
Every meaningful user-facing change MUST be covered by tests that exercise real behavior. Unit tests are required for shared logic and data transforms, and UI or integration tests are required for new user journeys such as scheduling streams, managing the game library, or recording notes. Tests MUST be written before or alongside implementation and MUST pass before merge. Rationale: planning features must remain reliable as the product grows.

### V. Clear Naming and Collaborative Ownership
Code, components, routes, and branches MUST use descriptive names that reflect the StreamPlan domain. Files SHOULD be organized around product concerns such as schedules, library, and notes rather than implementation shortcuts. Team collaboration MUST use small, reviewable changes, clear pull request descriptions, and shared ownership of quality. Rationale: clear naming and disciplined collaboration reduce confusion in a small team.

## Technical Standards
StreamPlan MUST preserve a consistent implementation baseline across the app:
- TypeScript MUST run in strict mode and use explicit types for props, state, data models, and API payloads.
- Tailwind MUST be the default styling approach; new utility classes SHOULD be reused instead of introducing one-off styles.
- Next.js MUST use the App Router structure with server components as the default and client components only when necessary.
- New features MUST include tests that verify the user-facing outcome and any affected helper logic.
- No feature may introduce custom CSS without a documented exception and a reviewable justification.

## Development Workflow
StreamPlan development MUST stay lightweight but disciplined:
- Features MUST be broken into small, independently reviewable increments.
- Pull requests MUST explain the user problem, the change made, and any migration or data impact.
- Reviewers MUST check compliance with this constitution, including typing, styling, routing, and testing expectations.
- Documentation and naming MUST be updated whenever behavior, routes, or data models change.
- The team SHOULD keep feedback loops short and resolve blockers before merging.

## Governance
This constitution supersedes informal conventions for StreamPlan development. Any change to architecture, mandatory tooling, or delivery expectations MUST be documented here, reviewed by the team, and reflected in the relevant implementation plan, spec, or task artifacts before enforcement.
Amendments require a pull request, at least one reviewer approval, and a version bump following semantic versioning. A minor version bump is required for new principles or materially expanded guidance; a patch bump is required for clarification or wording fixes. Compliance is reviewed during planning, implementation, and pull request review, and violations MUST be addressed before release.

**Version**: 1.0.0 | **Ratified**: 2026-07-11 | **Last Amended**: 2026-07-11
