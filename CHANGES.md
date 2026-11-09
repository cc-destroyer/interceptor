# Local fork changes

Upstream files touched by this fork (keep this list current to make rebases easy).
New code lives in `app/src/local/`.

| Upstream file | Change | Why |
|---|---|---|
| `app/src/store/slices/global/user/selectors.ts` | `getUserAuthDetails` wraps the user with `withLocalPlan` (memoized via `createSelector`) | Every premium check reads the user through this selector, so all paid features unlock from one place |
| `app/src/utils/feature-flag/growthbook.js` | GrowthBook gets `features` from `local/growthbook` (no apiHost/clientKey); `loadFeatures` is a no-op | Flags from a bundled prod snapshot + overrides, no cdn.growthbook.io |
| `app/src/modules/analytics/index.js` | Skip `posthogIntegration.init` | No PostHog |
| `app/index.html` | Removed gtag.js loader, Google Identity script, Google Fonts links | No Google Analytics / sign-in / font CDN |
| `app/src/index.jsx` | `import "local/fonts"` | Bundled fonts (@fontsource) |
| `app/package.json` | + `@fontsource/inter`, `@fontsource/roboto`, `@fontsource/roboto-mono` | Bundled fonts |
| `app/src/features/pricing/components/PricingModal/Checkout.tsx` | `@stripe/stripe-js/pure`, no `loadStripe` when offline | Importing stripe-js injected js.stripe.com on startup |
| `app/src/components/payments/UpdatePaymentMethod/index.js` | `@stripe/stripe-js/pure` | Same |
| `app/src/features/requestBot/RequestBot.tsx` | Render nothing when offline | Writesonic chat iframe |
| `app/src/layouts/DashboardLayout/MenuHeader/MenuHeader.tsx` | Hide GitHub star button | api.github.com request |
| `app/src/hooks/useGeoLocation.js` | Skip lookup, fall back to "US" | Cloudflare trace request |
| `app/src/layouts/AppLayout/index.tsx` | Don't render `AppUpdateNotifier` | Firebase RTDB websocket for version checks |
| `app/src/layouts/DashboardLayout/MenuHeader/MenuHeader.tsx` | Hide workspace selector, plan badge, Ask AI, sign-in / user menu (`LOCAL_HIDE_CLOUD_UI`) | Account / cloud only |
| `app/src/layouts/DashboardLayout/Sidebar/PrimarySidebar/index.tsx` | Hide Files and Invite | Cloud mocks / file server, team invites |
| `app/src/features/settings/components/SettingsPrimarySidebar/index.tsx` | Hide Account and My organization sections | Profile, members, team workspaces, plan, billing need an account |
| `app/src/features/settings/components/GlobalSettings/index.jsx` | Hide rules syncing card | Cloud sync |
| `app/src/features/rules/components/RulesSidebar/RulesSidebar.tsx` | Hide Shared lists | Cloud |
| `app/src/features/rules/context/actions.tsx` | Share opens the sharing modal without login | Download (local export) works without an account |
| `app/src/views/features/rules/RuleEditor/components/Header/ActionButtons/ShareRuleButton/index.jsx` | Same | Same |
| `app/src/components/common/SharingModal/index.tsx` | Only the Download tab, no "share in workspace" footer | Shared list / workspace tabs are cloud |
| `app/src/layouts/AppLayout/GlobalModals/index.tsx` | Sign-in modal replaced by `NoAccountNotice` | Anything that needs an account shows a message instead of Requestly login |

## Local-only files

- `app/src/local/config.ts` – `LOCAL_OFFLINE` (network) and `LOCAL_HIDE_CLOUD_UI` (account / cloud UI) switches.
- `app/src/local/NoAccountNotice.tsx` – replaces the sign-in modal.
- `app/src/local/growthbook.ts` + `growthbook-features.json` – prod flag snapshot (2026-11-05) + `LOCAL_FLAG_OVERRIDES` (API client block screen off, upsell nags off, kill switches off, cloud AI/BrowserStack off).
- `app/src/local/fonts.ts` – font imports.
- `app/src/local/plan.ts` – permanent active Professional plan injected into the user (`LOCAL_UNLOCK_ALL_FEATURES` toggle).
