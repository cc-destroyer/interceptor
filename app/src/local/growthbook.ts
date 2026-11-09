/**
 * Local GrowthBook feature definitions: a snapshot of Requestly's production flags
 * (growthbook-features.json, evaluated locally with the same targeting rules) plus our overrides.
 *
 * Refresh the snapshot (rarely needed):
 *   curl -s https://cdn.growthbook.io/api/features/<prod sdk key> -> growthbook-features.json
 */
import snapshot from "./growthbook-features.json";

/** Forced values that win over the snapshot (rules are dropped for these keys). */
export const LOCAL_FLAG_OVERRIDES: Record<string, unknown> = {
  // Upstream is moving the API client to a separate product and force-shows a blocking "migrate" screen.
  api_client_migration_block_screen: false,
  api_client_migration_block_screen_cloud: false,
  api_client_migration_block_screen_cloud_force: false,
  api_client_migration_block_screen_local_fs: false,
  api_client_migration_block_screen_local_storage: false,

  // Upsell / paywall nags.
  show_upgrade_popovers: false,
  show_feature_limit_banner: false,
  backgates_restriction: false,

  // Remote kill switches.
  blocked_commercial_license_domain: false,
  "user-grr-blocked": false,

  // Need Requestly / BrowserStack cloud.
  browserstack_integration: false,
  browserstack_checkout: false,
  global_ai_support: false,
  ai_tests_generation: false,
  ai_mock_response: false,
};

type FeatureDefinition = { defaultValue?: unknown; rules?: unknown[] };

export const LOCAL_GROWTHBOOK_FEATURES: Record<string, FeatureDefinition> = {
  ...(snapshot.features as Record<string, FeatureDefinition>),
  ...Object.fromEntries(Object.entries(LOCAL_FLAG_OVERRIDES).map(([key, value]) => [key, { defaultValue: value }])),
};
