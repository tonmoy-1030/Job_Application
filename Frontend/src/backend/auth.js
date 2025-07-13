import conf from "../conf/conf";

class AuthService {
    axios;

    constructor() {
        this.axios = conf;
    }

    async login({ username, password }) {
        try {
            // Only send credentials, do not handle tokens in localStorage
            const response = await this.axios.post(
                '/token/login/',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            // The cookie is set by the backend, nothing to return
            return response.data;
        } catch (error) {
            throw error.response?.data?.detail || "Login failed";
        }
    }

    async logout() {
        try {
            await this.axios.post('/token/logout/');
            // No need to remove tokens from localStorage
        } catch (error) {
            throw error;
        }
    }

    async refreshAccessToken() {
        try {
            // No need to get refresh token from localStorage, backend will use cookie
            const response = await this.axios.post('/token/refresh/');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await this.axios.get('/me/');
            return response.data;
        } catch (error) {
            throw error;

        }
    }

    async changePassword({ new_password, confirm_password }) {
        try {
           const response = await this.axios.post(
                '/change-password/',
                { username, confirm_password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response.data
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService();
export default authService;