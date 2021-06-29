import HttpClient from '../plugins/HttpClient';
const httpClient = new HttpClient();

type ProductCreatePayload = {
    nome: string;
    email: string;
    senha: string;
    estabelecimentos_id: string | number;
    funcoes_estabelecimentos_id: string | number;
};

type ProductUpdatePayload = {
    nome?: string;
    email?: string;
    senha?: string;
    funcoes_estabelecimentos_id?: string | number;
};

export default class ProductService {
    static async getAll(page: number = 1, qty: number = 25, order = 'alfabetica'): Promise<any> {
        const url = `/admin/produtos?page=${page}&quantidade=${qty}&ordem=${order}`;
        const res = await httpClient.get(url);
        return res;
    }
    static async getAllByEstablishment(
        id: number | string,
        page: number = 1,
        qty: number = 25,
        order = 'alfabetica'
    ): Promise<any> {
        const url = `/admin/produtos?estabelecimento=${id}&page=${page}&quantidade=${qty}&ordem=${order}`;
        const res = await httpClient.get(url);
        return res;
    }
    static async create(payload: ProductCreatePayload): Promise<any> {
        const url = '/admin/produtos';
        const res = await httpClient.post(url, payload);
        return res;
    }
    static async update(id: string | number, payload: ProductUpdatePayload): Promise<any> {
        const url = `/admin/produtos/${id}`;
        const res = await httpClient.put(url, payload);
        return res;
    }
    static async remove(id: number | string) {
        const url = `/admin/produtos/${id}`;
        const res = await httpClient.delete(url);
    }
}
