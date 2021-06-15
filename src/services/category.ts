import HttpClient from '../plugins/HttpClient';
const httpClient = new HttpClient();

export default class CategoryService {
    static async getAll(page: number = 1, qty: number = 25, order = 'alfabetica'): Promise<any> {
        const url = `/admin/categorias-estabelecimentos?page=${page}&qtde=${qty}&ordem=${order}`;
        const res = await httpClient.get(url);
        return res;
    }
    static async search(term: string, page: number = 1, qty: number = 25, order = 'alfabetica'): Promise<any> {
        const url = `/admin/categorias-estabelecimentos?pesquisa=${term}&page=${page}&qtde=${qty}&ordem=${order}`;
        const res = await httpClient.get(url);
        return res;
    }
}
