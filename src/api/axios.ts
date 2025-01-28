import axios from "axios";
import { getActivePinia } from "pinia";

enum EErrorStatus {
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500,
}
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const lang = localStorage.getItem("lang") || "uz";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = lang;
    return config;
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error): Promise<Error> => {
    const status = error.response?.status;
    if (status) {
      toHandleError(status);
    }
    return Promise.reject(error);
  }
);

async function toHandleError(status: EErrorStatus) {
  const pinia: any = getActivePinia();
  if (status == EErrorStatus.Unauthorized) {
    location.reload();
    localStorage.clear();
    pinia?._s?.forEach((store: any) => store?.$reset());
  }
}
export default axiosInstance;
