---
name: state-management-zustand
description: Enforce proper usage of Zustand for global state without overusing it. Use when managing shared state.
---

# Zustand State Management Skill

## Goal
Use Zustand only when necessary and keep stores clean and scalable.

## Rules

### When to Use Zustand
- Shared state across multiple components
- Cross-page state (auth, user, UI state)

### When NOT to Use
- Local component state → use useState
- Simple derived values

---

### Store Structure
- One store per domain (auth, users, ui)
- Avoid giant global stores

Example:
```ts
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

---

### Actions

* Keep actions simple and predictable
* No complex async logic directly inside store

---

### Async Logic

* Prefer handling async in hooks/services, not stores

---

### Selectors

* Always select only needed state

```ts
const user = useAuthStore((state) => state.user);
```

---

## Anti-patterns

* Global store for everything
* Storing server data unnecessarily
* Business logic inside store

## Behavior

* Suggest moving state out of Zustand if not global
* Split large stores into smaller ones