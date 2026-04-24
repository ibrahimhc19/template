# AGENTS.md

## Project Overview

Fullstack application:

- Frontend: React (Vite) or Next.js (App Router)
- Backend: Laravel API (REST)
- Server State: TanStack Query
- Client State: Zustand
- Auth: Laravel Sanctum

Backend is the single source of truth for all business logic.

---

## NON-NEGOTIABLE RULES

These rules MUST NOT be violated.

## 1. No Business Logic in Frontend

- Frontend must not implement validation rules, calculations, or domain logic
- All business logic belongs to Laravel backend

---

## 2. No API Calls in Components

- Components must NEVER call APIs directly
- All API interaction must go through:
  - service layer
  - query/mutation hooks

---

## 3. Strict State Separation

- Server state → TanStack Query ONLY
- Client/global state → Zustand ONLY
- No duplication between them

---

## 4. Controllers Must Be Thin (Backend)

- Controllers only orchestrate request/response
- Business logic MUST be in services

---

## 5. Mandatory Validation Layer

- Laravel Form Requests REQUIRED
- No inline validation in controllers

---

## PROJECT STRUCTURE (STRICT)

## Frontend

```dir
/frontend/src
/components        → UI only
/features          → domain-based modules
/hooks             → custom hooks (queries/mutations)
/services          → API calls
/store             → Zustand stores
```

---

## Backend

```dir
/backend/app
/Http/Controllers  → thin controllers
/Http/Requests     → validation
/Services          → business logic
/Models            → Eloquent models

```

---

## FRONTEND ARCHITECTURE RULES

## Components

- Max ~150 lines
- Single responsibility
- No API logic
- No heavy conditionals

---

## Hooks

- All async logic belongs here
- Must be reusable
- Must not contain UI logic

---

## Services

- Centralized API layer
- No duplication of endpoints
- Must return clean data (no UI formatting)

---

## Zustand

- Only for:
  - auth state
  - UI state (modals, theme, etc.)
- NEVER store server data already handled by TanStack Query

---

## TANSTACK QUERY RULES

## Query Keys

- Must be structured:

```ts
["resource", { filters }]
```

- Never use unstructured arrays

---

## Pagination & Filters

- Must be included in queryKey
- Must be controlled outside the query (state or URL)

---

## Mutations

- Must invalidate relevant queries
- Must not manually sync cache unless necessary

---

## NEXT.JS RULES (IF APPLICABLE)

## Component Strategy

- Default: Server Components
- Client Components ONLY when:

  - interactivity is required
  - browser APIs are used

---

## Data Fetching

- Prefer server-side fetching
- TanStack Query only for:

  - client interactivity
  - dynamic updates

---

## Forbidden

- Marking entire app as `"use client"`
- Fetching in `useEffect` when server fetch is possible

---

## BACKEND RULES (LARAVEL)

## Controllers

- Must be thin
- No business logic
- No direct DB queries unless trivial

---

## Services-

- All business logic lives here
- Must be reusable and testable

---

## Database

- Use Eloquent properly
- Prevent N+1 queries (use eager loading)
- Select only required fields

---

## API Responses

- Always JSON
- Consistent structure
- Proper HTTP status codes

---

## NAMING CONVENTIONS (STRICT)

### Frontend-

- Components → PascalCase (`UserCard`)
- Hooks → `useSomething`
- Services → `somethingService.ts`

---

### Backend-

- Controllers → `UserController`
- Requests → `StoreUserRequest`
- Services → `UserService`

---

## ANTI-PATTERNS (STRICTLY FORBIDDEN)

- API calls inside components
- Business logic in frontend
- Using Zustand for server data
- Duplicating API logic
- Unstructured query keys
- Large monolithic components
- useEffect for fetching (when TanStack Query is available)
- Treating Next.js as a SPA

---

## SKILL USAGE GUIDE

Agents MUST select skills based on context:

- UI work → react-component-structure
- Data fetching → react-tanstack-query
- Tables / filters → tanstack-query-keys-pagination-filters
- Global state → state-management-zustand
- Backend → laravel-api-architecture
- Next.js → nextjs-app-router-architecture

---

## EXPECTED AGENT BEHAVIOR

- Enforce all rules above
- Refactor code that violates architecture
- Prefer maintainability over speed
- Suggest improvements proactively
- Reject bad patterns even if requested
