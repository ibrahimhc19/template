---
name: react-data-fetching-axios
description: Standardize API consumption using Axios, hooks, and proper async state handling. Use when fetching or mutating data.
---

# React Data Fetching Skill

## Goal
Ensure all API interactions are predictable, reusable, and separated from UI.

## Rules

### Architecture
- NEVER call APIs directly inside components
- Use a service layer + custom hooks

Structure:
- /services/userService.ts
- /hooks/useUsers.ts

---

### Service Layer
- All API calls must live in services
- Use Axios instance (preconfigured)

Example:
```ts
import api from "@/lib/api";

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};
```

---

### Hooks

* Handle loading, error, and data states
* Use useEffect for initial fetch

Example:

```ts
export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setData)
      .catch(() => setError("Error fetching users"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
```

---

### Error Handling

* Never swallow errors
* Always expose error state to UI

---

### UI Usage

* Components only consume hooks

```ts
const { data, loading, error } = useUsers();
```

---

## Anti-patterns

* Fetch inside component body
* Mixing UI and async logic
* Duplicated fetch logic across components

## Behavior

* Extract API logic into services if missing
* Generate hooks automatically when needed
