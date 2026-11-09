import { DelayRule } from "@requestly/shared/types/entities/rules";
import { ExtensionResourceType, ExtensionRule, RuleActionType } from "../types";
import { parseConditionFromSource } from "./utils";
import { LOCAL_OFFLINE } from "local/config";

const parseDelayRule = (rule: DelayRule.Record): ExtensionRule[] => {
  // local fork: non-XHR delays work by redirecting to https://app.requestly.io/delay/<ms>/<url> (Requestly's
  // server waits, then redirects back). Skip them; XHR/fetch delays still run locally in the page script.
  if (LOCAL_OFFLINE) return [];

  return rule.pairs.map(
    (rulePair): ExtensionRule => {
      return {
        priority: 1,
        condition: {
          ...parseConditionFromSource(rulePair.source),
          excludedResourceTypes: ["xmlhttprequest" as ExtensionResourceType],
        },
        action: {
          type: RuleActionType.REDIRECT,
          redirect: {
            transform: {
              queryTransform: {
                addOrReplaceParams: [
                  {
                    key: "_rq_delay_",
                    value: rulePair.delay,
                  },
                ],
              },
            },
          },
        },
      };
    }
  );
};

export default parseDelayRule;
