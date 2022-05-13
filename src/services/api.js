import axios from "axios";
import { BASE_URL, LOCALHOST_AUTH_TOKENS } from "../utils/config";
import BusinessService from "./BusinessService";
import ProfileService from "./ProfileService";

const instance = axios.create({
  baseURL:BASE_URL
});


//added profile data fetch token interceptor here
instance.interceptors.request.use(
  (config) => {
    const token = ProfileService.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)[
      "access"
    ];
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/token" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { data } = await instance.post("/auth/token/refresh/", {
            refresh: localStorage.getItem("mk_refresh"),
          });
          localStorage.setItem(LOCALHOST_AUTH_TOKENS, JSON.stringify(data));

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
