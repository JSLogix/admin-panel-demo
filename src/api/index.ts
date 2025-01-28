import { AxiosRequestConfig, AxiosResponse } from "axios";

import axiosInstance from "./axios";

export const useHttp = () => {
  function $get<
    R = unknown,
    P extends Record<string, any> | undefined = undefined
  >(
    url: string,
    params?: P | any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R | any>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get<R>(`${url}`, { params, ...config })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $delete<R = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete<R>(`${url}`, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $post<R = unknown, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post<R>(`${url}`, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $put<R = unknown, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put<R>(`${url}`, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  function $patch<R = unknown, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch<R>(`${url}`, data, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  return { $get, $delete, $post, $patch, $put };
};
