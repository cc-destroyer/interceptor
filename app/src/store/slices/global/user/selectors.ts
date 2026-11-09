import { ReducerKeys } from "store/constants";
import { RootState } from "store/types";
import { UserAuth } from "./types";
import { createSelector } from "@reduxjs/toolkit";
import { withLocalPlan } from "local/plan"; // local fork: unlock paid plan

// TODO: Make "user" as a separate slice
export const getUserAuthDetails: (state: RootState) => UserAuth = createSelector(
  (state: RootState): UserAuth => state[ReducerKeys.GLOBAL]["user"],
  withLocalPlan
);

export const getIsOptedforAIFeatures = (state: RootState): boolean => {
  return state[ReducerKeys.GLOBAL]["user"].details?.metadata?.ai_consent ?? true;
};
