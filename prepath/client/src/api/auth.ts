import api from './api';

// Description: User login
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { accessToken: string, refreshToken: string }
export const login = (email: string, password: string) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken'
            });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.post('/api/auth/login', { email, password });
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}

// Description: User registration
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string }
// Response: { accessToken: string }
export const register = (email: string, password: string) => {
    // Mocking the response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                accessToken: 'mockAccessToken'
            });
        }, 500);
    });
    // Uncomment the below lines to make an actual API call
    // try {
    //   return await api.post('/api/auth/register', { email, password });
    // } catch (error) {
    //   throw new Error(error?.response?.data?.error || error.message);
    // }
}