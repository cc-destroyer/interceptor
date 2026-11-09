# Local fork changes

Upstream files touched by this fork (keep this list current to make rebases easy).
New code lives in `app/src/local/`.

| Upstream file | Change | Why |
|---|---|---|
| `app/src/store/slices/global/user/selectors.ts` | `getUserAuthDetails` wraps the user with `withLocalPlan` (memoized via `createSelector`) | Every premium check reads the user through this selector, so all paid features unlock from one place |

## Local-only files

- `app/src/local/plan.ts` – permanent active Professional plan injected into the user (`LOCAL_UNLOCK_ALL_FEATURES` toggle).
