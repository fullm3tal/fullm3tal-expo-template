# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

# Strict Kebab-Case Naming Convention

**ALL new files and directories you create MUST use kebab-case.** This is a non-negotiable, project-wide standard. Violating it is unacceptable.

## Rules

### Files & Directories

- Every new file name MUST be `kebab-case`: e.g. `sign-in-screen.tsx`, `use-sign-in.ts`, `auth-service.ts`, `auth-store.ts`.
- Every new directory name MUST be `kebab-case`: e.g. `features/auth/`, `ui/`, `domain/`, `data/`.
- Multi-word names use hyphens — never underscores, never camelCase, never PascalCase: ✅ `auth-service.ts` ❌ `authService.ts` ❌ `AuthService.ts` ❌ `auth_service.ts`.

### TypeScript / JavaScript Identifiers (inside files)

- **React components** — PascalCase identifier, kebab-case filename: `SignInScreen` lives in `sign-in-screen.tsx`.
- **Classes** — PascalCase: `KeystoreClient`.
- **Hooks** — camelCase prefixed with `use`: `useSignIn`.
- **Variables, functions, and object keys** — camelCase: `authService`, `signInRequest`.
- **Constants / enums** — UPPER_SNAKE_CASE for values; PascalCase for the enum name: `enum KeystoreKeys { ACCESS_TOKEN = 'access_token' }`.
- **Types and interfaces** — PascalCase: `SignInRequest`, `AuthUser`.

## No Exceptions

There are no legacy exceptions. All files in the project use kebab-case. If you encounter a PascalCase filename, treat it as a bug to fix, not a pattern to follow.

## Barrel Files

- Always named `index.ts` (never `Index.ts`).

## Quick Reference

| What                       | Convention       | Example                  |
| -------------------------- | ---------------- | ------------------------ |
| New file                   | kebab-case       | `auth-service.ts`        |
| New directory              | kebab-case       | `features/auth/data/`    |
| React component identifier | PascalCase       | `SignInScreen`           |
| Hook                       | camelCase `use*` | `useSignIn`              |
| Service object             | camelCase        | `authService`            |
| Type / Interface           | PascalCase       | `SignInRequest`          |
| Enum value                 | UPPER_SNAKE_CASE | `ACCESS_TOKEN`           |
| Barrel                     | `index.ts`       | `features/auth/index.ts` |
