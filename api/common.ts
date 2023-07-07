import { AsyncDataExecuteOptions } from "nuxt/dist/app/composables/asyncData";

export interface UseFetchRes<T> {
    data: T | null;
    error: Ref<any | null>;
    pending: Ref<boolean>;
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>;
}

export interface BasicRes {
    status: number;
    data: any;
    error?: any;
}
