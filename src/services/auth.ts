import HttpClient from '../plugins/HttpClient';
const httpClient = new HttpClient();

type SignInPayload = {
    email: string;
    password: string;
};

export default class AuthService {
    static async signIn(email: string, password: string): Promise<any> {
        const payload: SignInPayload = { email, password };
        const res = await httpClient.post('/admin/auth/login', payload);
        return res;
    }
    static saveLocalToken(token: string) {
        return localStorage.setItem('access_token', token);
    }
}
