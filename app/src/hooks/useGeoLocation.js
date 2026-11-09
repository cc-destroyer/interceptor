import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { globalActions } from "store/slices/global/slice";
import { getUserGeoDetails } from "utils/geoUtils";
import { submitAttrUtil } from "utils/AnalyticsUtils";
import APP_CONSTANTS from "config/constants";
import { LOCAL_OFFLINE } from "local/config";

const useGeoLocation = () => {
  const dispatch = useDispatch();

  // const [country, setCountry] = useState("US");

  useEffect(() => {
    // local fork: skip the Cloudflare trace lookup, fall back to "US"
    (LOCAL_OFFLINE ? Promise.reject(new Error("offline")) : getUserGeoDetails())
      .then((details) => {
        // setCountry(currentCountry);
        dispatch(globalActions.updateUserCountry(details?.loc));
        submitAttrUtil(APP_CONSTANTS.GA_EVENTS.ATTR.COUNTRY, details?.loc);
        window.country = details?.loc;
      })
      .catch(() => {
        dispatch(globalActions.updateUserCountry("US"));
        submitAttrUtil(APP_CONSTANTS.GA_EVENTS.ATTR.COUNTRY, "US");
        window.country = "US";
      });
  }, [dispatch]);
};

export default useGeoLocation;
