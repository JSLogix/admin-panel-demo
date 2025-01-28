import { defineStore } from "pinia";
import { useHttp } from "@/api";
import { State } from "@/utilities/interfaces";
import { cloneDeep } from "lodash";

const { $get, $post, $put, $delete } = useHttp();
export function toCreateStore<L, P, D>(module: { key: string; params: P }) {
  return defineStore({
    id: module.key,
    state: (): State<L, P, D> => ({
      list: {
        data: [],
        loading: true,
        pagination: undefined,
        params: cloneDeep(module.params),
      },
      detail: {
        data: undefined,
        loading: false,
        active: undefined,
      },
    }),
    getters: {
      params: (state) => {
        const dataset = state.list;
        if (typeof dataset.params === "object") {
          return <P>{
            page: dataset.pagination?.page,
            per_page: dataset.pagination?.per_page,
            ...dataset.params,
          };
        } else {
          return <P>{
            page: dataset.pagination?.page,
            per_page: dataset.pagination?.per_page,
          };
        }
      },
    },
    actions: {
      async toFetch(params?: P): Promise<void> {
        const dataset = this.list;
        dataset.loading = true;
        if (params && typeof dataset.params === "object")
          dataset.params = { ...dataset.params, ...params };
        const response = await $get(`/${module.key}/`, this.params);
        if (response?.data?.result || response?.data?.result === null) {
          dataset.data = response?.data?.result ?? [];
          dataset.pagination = response?.data?.pagination ?? {};
        } else {
          dataset.data = response?.data ?? {};
        }
        dataset.loading = false;
      },
      async toFetchDetail(id: string | number): Promise<undefined> {
        const dataset = this.detail;
        dataset.loading = true;
        if (id) dataset.active = id;
        const { data, status } = await $get(`/${module.key}/${id}/`);
        if (status) {
          dataset.data = data;
        }
        dataset.loading = false;
        return undefined;
      },
      async toPost(form: any, isFetch: boolean = false): Promise<Object> {
        const { data, status } = await $post(`/${module.key}/`, form);
        if (isFetch) {
          await this.toFetch();
        }
        if (status) return { data: data || {}, status };
        return {
          status,
          data,
        };
      },
      async toDelete(id: number, isFetch: boolean = true): Promise<Object> {
        const { data, status } = await $delete(`/${module.key}/${id}`);
        if (isFetch) {
          await this.toFetch();
        }
        if (status) return { data: data ?? {}, status };
        return {
          status,
          data,
        };
      },
      async toUpdate(
        id: number | string,
        form: any,
        isFetch: boolean = false
      ): Promise<Object> {
        const { data, status } = await $put(`/${module.key}/${id}`, form);
        if (isFetch) {
          await this.toFetch();
        }
        if (status) return { data: data ?? {}, status };
        return {
          status,
        };
      },
      async toPaginate(page: number, per_page: number): Promise<void> {
        this.list.pagination = {
          page,
          per_page,
        };
        await this.toFetch();
      },
      toResetParams(): void {
        if (this.list.params) {
          this.list.params = JSON.parse(JSON.stringify(module.params)) || {};
        }
      },
    },
  });
}
