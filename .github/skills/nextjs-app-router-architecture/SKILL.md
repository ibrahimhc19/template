---
name: nextjs-app-router-architecture
description: Enforce best practices for Next.js App Router architecture, including Server vs Client Components, data fetching strategies, and integration with external APIs like Laravel.
---

# Next.js App Router Architecture Skill

## Goal
Build scalable applications using Next.js App Router with correct separation between server and client logic, optimized data fetching, and minimal client-side overhead.

---

## Core Principles

- Default to **Server Components**
- Use **Client Components only when necessary**
- Fetch data on the server whenever possible
- Avoid turning Next.js into a SPA unnecessarily

---

## Server vs Client Components (CRITICAL)

### Server Components (DEFAULT)
Use for:
- Data fetching
- Rendering static or dynamic data from backend
- SEO-sensitive pages

Example:
```tsx
import { getUsers } from "@/services/userService";

export default async function UsersPage() {
  const users = await getUsers();

  return <UserList users={users} />;
}
```

---

### Client Components

Use ONLY when:

* You need interactivity (onClick, forms, modals)
* You use browser APIs
* You use state/hooks (useState, useEffect, Zustand, TanStack Query)

```tsx
"use client";

export const UserButton = () => {
  return <button onClick={() => alert("clicked")}>Click</button>;
};
```

---

## Data Fetching Strategy

### Preferred (Server-side)

* Fetch directly in Server Components
* Use async/await
* No useEffect

```tsx
const data = await getUsers();
```

---

### When to use TanStack Query

ONLY if:

* You need client-side reactivity (filters, live updates)
* You need caching across interactions
* You mutate data frequently

---

### Hybrid Pattern (IMPORTANT)

* Fetch initial data on server
* Hydrate client if needed

---

## Services Layer (MANDATORY)

* Keep using service layer (Axios or fetch)
* Centralize API calls to Laravel backend

```ts
export const getUsers = async () => {
  const res = await fetch(`${process.env.API_URL}/users`, {
    cache: "no-store",
  });

  return res.json();
};
```

---

## Caching & Revalidation

### Default behavior

* Next.js caches fetch requests

### Options

* Static:

```ts
fetch(url, { cache: "force-cache" });
```

* Dynamic:

```ts
fetch(url, { cache: "no-store" });
```

* Revalidation:

```ts
fetch(url, { next: { revalidate: 60 } });
```

---

## Routing Structure

Use App Router structure:

```bash
/app
  /users
    page.tsx
    loading.tsx
    error.tsx
```

---

## Loading & Error UI

* Use `loading.tsx` for skeletons
* Use `error.tsx` for boundaries

---

## Forms & Mutations

### Options

1. Server Actions (preferred when simple)
2. API calls (when using Laravel backend)

---

## Integration with Laravel (IMPORTANT)

* Laravel acts as external API
* Next.js is NOT your backend

### Rules

* Do not duplicate business logic in Next.js
* Keep validation and logic in Laravel

---

## Zustand Usage

* Only for client global state (UI, auth state)
* Never store server data already fetched

---

## Anti-patterns

* Marking everything as `"use client"`
* Using TanStack Query for all data fetching
* Fetching in useEffect instead of server
* Duplicating backend logic in frontend
* Ignoring Next.js caching behavior

---

## Behavior

* Convert client fetching to server fetching when possible
* Suggest splitting components into server/client
* Recommend TanStack Query only when necessary
* Enforce minimal client-side JavaScript