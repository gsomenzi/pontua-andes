import HttpClient from '../plugins/HttpClient';
const httpClient = new HttpClient();

export default class StatisticService {
    static async getAll(): Promise<any> {
        const res = await httpClient.post('/admin/estatisticas');
        return res;
    }
}
