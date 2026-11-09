/**
 * Local fork: every user (logged in or not) gets a permanent, active Professional plan.
 *
 * Hooked in at the single place the app reads the user from Redux
 * (`store/slices/global/user/selectors.ts` -> getUserAuthDetails), so every premium check
 * (useFeatureLimiter, PremiumFeature popovers, `user.details.isPremium`, `planDetails.planName`
 * checks for secrets manager / AI / etc.) sees a paid plan. Redux state itself is untouched.
 *
 * Set LOCAL_UNLOCK_ALL_FEATURES = false to get upstream behaviour back.
 */
import { PRICING } from "features/pricing/constants/pricing";
import type { UserAuth } from "store/slices/global/user/types";

export const LOCAL_UNLOCK_ALL_FEATURES = true;

type PlanDetails = NonNullable<NonNullable<UserAuth["details"]>["planDetails"]>;

export const LOCAL_PLAN_DETAILS: PlanDetails = {
  planId: PRICING.PLAN_NAMES.PROFESSIONAL,
  planName: PRICING.PLAN_NAMES.PROFESSIONAL,
  status: "active",
  type: "individual",
  subscription: {
    id: "local",
    billingId: null,
    startDate: "2020-01-01",
    endDate: "2999-12-31", // compared as a YYYY-MM-DD string by isPlanExpired()
    duration: "annually",
    quantity: 1,
    cancelAtPeriodEnd: false,
    isBrowserstackSubscription: false,
  },
};

export const withLocalPlan = (user: UserAuth): UserAuth => {
  if (!LOCAL_UNLOCK_ALL_FEATURES || !user) return user;
  return {
    ...user,
    isLimitReached: false,
    details: {
      ...(user.details ?? {}),
      isPremium: true,
      planDetails: LOCAL_PLAN_DETAILS,
    },
  };
};
