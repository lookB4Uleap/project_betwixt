
import axios from "axios";
import { User, getIdToken } from "firebase/auth";

export const getInstance = async (user: User) => {
    if (!process.env.NEXT_PUBLIC_ORDER_URL)
        return;

    const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_ORDER_URL}`
    });
    
    const authToken = await getIdToken(user);
    instance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    return instance;
}

