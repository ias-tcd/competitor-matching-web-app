import axios from 'axios';

/**
 * This creates a hook that can be used to send requests to the API
 * without the need to add the headers and url each time.
 *
 * Usage: to send a request to the `/accounts/users/` endpoint:
 * ```
 * import UseAxios from './utils/UseAxios';
 * const api = UseAxios();
 * const response = await api.get('/accounts/users/');
 * ```
 * If in future we add authentication to the API, this will allow us to authenticate
 * all requests using interceptors
 * @returns
 */
const UseAxios = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.VITE_APP_API_URL,
    });

    return axiosInstance;
};

export default UseAxios;
