import axios from "axios";
import {useStore} from './useStore'
export const useAxios = () => {

    const refreshInstance = axios.create({
        baseURL: 'https://localhost:7044',        
    });

    const axiosInstance = axios.create({
        baseURL: 'https://localhost:7044',
    });
    
    axiosInstance.interceptors.response.use(config => {                
        return config;
    }, async error => {         
        const {setToken} = useStore();     
        const config = error.config;
        const shouldRetry = !error.response || error.response.status == 401 ;

        if (!shouldRetry) {
            return Promise.reject(error);
        }
                
        config._retryCount = config._retryCount ?? 0;

        if (config._retryCount >= 2) {
            return Promise.reject(error);
        }
        config._retryCount += 1;

        const accessToken = await refreshInstance.get('/jwt/refreshAccessToken',{withCredentials:true});
        config.headers['Authorization'] = `Bearer ${accessToken.data}`;
        setToken(accessToken.data);
        console.log('Retrying request with new access token'+ accessToken.data);
        return axiosInstance(config);        
    });

    return axiosInstance;

}