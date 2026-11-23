import {useAxios} from './useAxios'
export const useLogin = () => {
    const axiosInstance =useAxios();

    const login = async (username: string, password: string) => {
        const response = await axiosInstance.post('/jwt/login', { username, password },{withCredentials:true});
        return response.data;
    }

    const refreshCookie = async () => {
        await axiosInstance.get('/jwt/refreshSelf', { withCredentials: true });        
    }

    const getTime = async (token:string) =>{
        const response = await axiosInstance.get('/jwt/secure',{headers:{Authorization: `Bearer ${token}`}});
        return response.data;
    }

    return {login,refreshCookie,getTime}

}