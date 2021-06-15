import HttpClient from '../plugins/HttpClient';
const httpClient = new HttpClient();

/**
 * ORDERS
 * alfabetica, alfabetica-desc,
 * escolaridade, escolaridade-desc,
 * sexo, sexo-desc,
 * data_nascimento, data_nascimento-desc,
 * pontos, pontos-desc,
 * vezes, vezes-desc
 */

export default class UserService {
    static async getAll(page: number = 1, qty: number = 25, order = 'alfabetica'): Promise<any> {
        const url = `/admin/usuarios?page=${page}&qtde=${qty}&ordem=${order}`;
        const res = await httpClient.get(url);
        return res;
    }
}
