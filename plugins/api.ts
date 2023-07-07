import { UseFetchOptions  } from "nuxt/app";

export default defineNuxtPlugin(() => {

    const fetchApi = <T = void>(url: string) => {
        return $fetch<T>(`https://dummyjson.com/${url}`)
    }

    // const fetch2Api = <T = void>(url: string, opt?: FetchOptions) => {
    // const fetch2Api = <T = void>(url: string, opt?: NitroFetchOptions<NitroFetchRequest, "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace"> | undefined) => {
    const fetch2Api = <T = void>(url: string) => {
        return $fetch<T>(`http://localhost:20002/api/${url}`)
    }
    
    const useFetchApi = (url: string, opt?: UseFetchOptions<any>) => {
        
        return useFetch(`http://localhost:20002/api/${url}`, opt)
    }

    return {
        provide: {
            fetchApi: fetchApi,
            fetch2Api,
            useFetchApi: useFetchApi,
        }
    }
})