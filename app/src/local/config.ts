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
