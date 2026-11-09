import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { globalActions } from "store/slices/global/slice";
import { toast } from "utils/Toast.js";

/**
 * Local fork: rendered instead of the sign-in / sign-up modal. Anything that would open it needs a
 * Requestly account, which this build doesn't use, so explain that and close the modal again.
 */
export const NoAccountNotice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    toast.info("This needs a Requestly account and isn't available in this local build.");
    dispatch(globalActions.toggleActiveModal({ modalName: "authModal", newValue: false }));
  }, [dispatch]);

  return null;
};
