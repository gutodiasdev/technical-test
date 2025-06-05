import { getToken } from "@/data/actions/auth";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends RequestInit {
  method?: HttpMethod;
  path: string | string[];
  queryParams?: Record<string, string | number | boolean>;
  body?: any;
  headers?: HeadersInit;
  authorization?: boolean;
}

class ApiService {
  private apiUrl: string | Error;

  constructor(apiUrl?: string) {
    this.apiUrl = this.verifyAPIUrl(apiUrl);
  }

  private buildUrl(path: string | string[], queryParams?: Record<string, string | number | boolean>): string {
    const normalizedPath = this.normalizePath(path);
    let url = `${this.apiUrl}${normalizedPath}`;

    if (queryParams) {
      const searchParams = new URLSearchParams();
      for (const key in queryParams) {
        searchParams.append(key, String(queryParams[key]));
      }
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  normalizePath(input: string | string[]): string {
    if (typeof input === 'string') {
      return input.startsWith('/') ? input : `/${input}`;
    }

    return '/' + input.map(part => part.replace(/^\/|\/$/g, '')).join('/');
  }

  async request<T = any>(options: RequestOptions): Promise<T> {
    const {
      method = 'GET',
      path,
      queryParams,
      body,
      headers = {}
    } = options;

    const url = this.buildUrl(path, queryParams);
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      }
    };

    if (options.authorization) {
      const token = await getToken();
      fetchOptions.headers = { ...headers, Authorization: "Bearer " + token as string }
    }

    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  verifyAPIUrl(url?: string): string {
    if (!url) throw new Error("Url da API não disponível, verifique com o administrador e tente mais tarde.")
    return url.replace(/\/$/, '');
  }
}

export const apiService = new ApiService(process.env.NEXT_PUBLIC_API_URL);