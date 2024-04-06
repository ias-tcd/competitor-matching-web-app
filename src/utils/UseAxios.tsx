import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import dayjs from 'dayjs';

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
    const { tokens, user, handleChangedTokens } = useContext(AuthContext);

    process.env.VITE_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const axiosInstance = axios.create({
        baseURL: process.env.VITE_APP_API_URL,
        headers: {
            Authorization: `Bearer ${tokens?.access}`,
        },
    });

    axiosInstance.interceptors.request.use(async request => {
        const isExpired = user ? dayjs.unix(user.exp).diff(dayjs()) < 1 : true;

        if (!isExpired) {
            return request;
        }

        const response = await axios.post(`${process.env.VITE_APP_API_URL}/accounts/login/refresh/`, {
            refresh: tokens?.refresh,
        });

        if (response) {
            handleChangedTokens(response.data);

            if (request.headers) {
                request.headers.Authorization = `Bearer ${response?.data?.access}`;
            }
        }

        return request;
    });

    return axiosInstance;
};

export default UseAxios;
