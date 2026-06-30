export class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "HttpError";
    }
}
const BASE_URL = import.meta.env.VITE_APP_API_URL;
type Params = Record<string, string | number | boolean>;

type Header = {
    token?:string,
    contentType?: string,
}

async function request<R, T = undefined>(
    method: string,
    endpoint:string,
    params?:Params,
    header?: Header,
    body?:T,
): Promise<R> {
    const headers: Record<string,string> = {
        'Content-Type': 'application/json',
    }
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (header?.token) {
        headers["Authorization"] = `Bearer ${header.token}`;
    }

    if (header?.contentType) {
        headers["Content-Type"] = header.contentType;
    }

    if(params != null){
        Object.entries(params).forEach(([key,value])=>{
            url.searchParams.append(key,value.toString())
        })
    }

    const response = await fetch(url,{
        method:method,
        headers:headers,
        body: body? JSON.stringify(body) : undefined,
    }) 

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new HttpError(
            response.status,
            errorData.message || `Request to ${url} failed with status: ${response.status}`
        );
    }
    return response.json()
}

export const http = {
    get: <R>(url: string, params?: Params, header?: Header): Promise<R> => request<R>("GET", url, params, header),
    post: <R, T = undefined>(url: string, body?: T, header?: Header): Promise<R> => request<R, T>("POST", url, undefined, header, body),
    put: <R, T = undefined>(url: string, body?: T, header?: Header): Promise<R> => request<R, T>("PUT", url, undefined, header, body),
    delete: <R>(url: string, params?: Params, header?: Header): Promise<R> => request<R>("DELETE", url, params, header)
}