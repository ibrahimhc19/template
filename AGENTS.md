# AGENTS.md

## Project Overview

This is a fullstack application with:

- Frontend: React (Vite) or Next.js (App Router)
- Backend: Laravel API
- State Management: Zustand (client state)
- Server State: TanStack Query
- Authentication: Laravel Sanctum

The backend (Laravel) is the single source of truth for business logic.

---

## Core Architecture Rules

### 1. Separation of Concerns

- UI components must NOT contain business logic
- API calls must NOT be inside components
- Backend handles validation and business rules

---

### 2. Data Ownership

- Server state → TanStack Query
- Client/global state → Zustand
- Backend → Laravel (source of truth)

---

### 3. API Communication

- All API calls must go through a service layer
- No direct fetch/axios inside components
- Use consistent endpoints from Laravel API

---

### 4. Backend Rules

- Controllers must be thin
- Use Form Requests for validation
- Use services for business logic
- Optimize queries (avoid N+1)

---

## Frontend Rules

### React (Vite)

- Use functional components
- Keep components small and focused
- Extract logic into hooks

---

### Next.js (if used)

- Default to Server Components
- Use Client Components only when necessary
- Prefer server-side data fetching
- Avoid turning Next.js into a SPA

---

## Data Fetching Rules

### Default

- Use TanStack Query for server state

### Exceptions (Next.js)

- Use server fetching in Server Components when possible

---

## When to Use Each Skill

- react-component-structure  
  → when creating or refactoring UI components

- react-tanstack-query  
  → when fetching or mutating server data

- tanstack-query-keys-pagination-filters  
  → when implementing tables, pagination, filters

- state-management-zustand  
  → when managing shared client state

- laravel-api-architecture  
  → when working on backend endpoints

- nextjs-app-router-architecture  
  → when working with Next.js App Router

---

## Anti-Patterns (STRICTLY AVOID)

- Fetching data inside components using useEffect (when TanStack Query is available)
- Putting business logic inside React components
- Using Zustand for server data
- Marking all Next.js components as "use client"
- Duplicating backend logic in frontend
- Unstructured or inconsistent query keys

---

## Expected Behavior from Agent

- Always choose the correct skill based on the task
- Prefer clean architecture over quick hacks
- Refactor code if it violates these rules
- Suggest better patterns when applicable
