import axios, { AxiosInstance } from 'axios';

const BASEURL = 'https://api.pontuafidelidade.com.br/api';

/**
 * Cliente HTTP com interceptor para adicionar o token às requisilções
 */
export default class HttpClient {
    client: AxiosInstance;
    nextRequestWithAppCredentials = false;

    constructor() {
        this.client = axios.create({
            baseURL: BASEURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.configureInterceptors();
    }

    /**
     * Efetua uma requisição do tipo GET
     * @param url URL de destino da requisição
     */
    async get(url: string) {
        return await this.client.get(url);
    }

    /**
     * Efetua uma requisição do tipo POST
     * @param url URL de destino da requisição
     * @param body Dados a serem enviados no corpo da requisição
     */
    async post(url: string, body = {}) {
        return await this.client.post(url, body);
    }

    /**
     * Efetua uma requisição do tipo PUT
     * @param url URL de destino da requisição
     * @param body Dados a serem enviados no corpo da requisição
     */
    async put(url: string, body = {}) {
        return await this.client.put(url, body);
    }

    /**
     * Efetua uma requisição do tipo PATCH
     * @param url URL de destino da requisição
     * @param body Dados a serem enviados no corpo da requisição
     */
    async patch(url: string, body = {}) {
        return await this.client.patch(url, body);
    }

    /**
     * Efetua uma requisição do tipo DELETE
     * @param url URL de destino da requisição
     */
    async delete(url: string) {
        return await this.client.delete(url);
    }

    configureInterceptors() {
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                config.headers.common.Authorization = token ? `Bearer ${token}` : null;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        this.client.interceptors.response.use((config) => {
            return config;
        });
    }

    getToken(): string | null {
        return localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;
    }
}

function normalizeJson(object: any) {
    if (!object) {
        return null;
    }
    return JSON.parse(JSON.stringify(object));
}
