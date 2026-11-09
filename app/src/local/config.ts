/**
 * Local fork switches. Flip to false to get upstream behaviour back for that area.
 */

/**
 * Don't talk to Requestly's cloud or third parties for non-essential things:
 * GrowthBook (flags come from ./growthbook-features.json), PostHog, Google Analytics,
 * Firebase RTDB app-update checks, Stripe, the Writesonic chat bot, Cloudflare geo lookup,
 * GitHub star button.
 */
export const LOCAL_OFFLINE = true;

/**
 * Hide UI that only works with a Requestly account / cloud: sign-in + user menu, workspace selector,
 * Invite, Ask AI, plan badge, Files (cloud mocks / file server), shared lists, cloud sharing tabs
 * (Download stays and works without an account), sync setting, account / organization / billing settings.
 */
export const LOCAL_HIDE_CLOUD_UI = true;
