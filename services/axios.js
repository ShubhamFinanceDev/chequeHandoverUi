import request from 'axios';
import Cookies from 'js-cookie';

import store from '@/redux/store';
import { startLoaderAct, stopLoaderAct } from '@/redux/slice/loader.slice';
import { removeUserCookies } from '@/hooks/useRemoveCookies';

const axios = request.create();

axios.interceptors.request.use(
    (config) => {
        store.dispatch(startLoaderAct())
        const token = Cookies.get("token");
        const isWhiteListed = config.url.includes("handover-service")
        if (token && !isWhiteListed) {
            config.headers.Authorization = "Bearer " + token
        }
        return config;
    },
    (error) => {
        store.dispatch(stopLoaderAct())
        return Promise.reject(error);
    }

);

axios.interceptors.response.use(
    (config) => {
        store.dispatch(stopLoaderAct())
        return config;
    },
    (error) => {
        store.dispatch(stopLoaderAct())
        const status = error?.response?.status || 400
        if (status === 401) {
            alert('Session Expired!')
            removeUserCookies()
        }
        return Promise.reject(error);
    }
)


export default axios;