import { auth } from "@/firebase";
import axios from "axios";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"

export const useBetwixtAuth = () => {
    let [user, loading, error] = useAuthState(auth);
    let authToken = null;

    useEffect(() => {
        (
            () => {
                if (!user)
                    return;
                
                if (localStorage.getItem("authToken")) {
                    loading = false;
                    authToken = localStorage.getItem("authToken");
                    return;
                }

                // if (!localStorage.getItem("signType")) {
                //     return;
                // }

                user = null;
                loading = true;
            }
        )();
    }, [])
    
    return {
        user,
        loading,
        error,
        authToken
    }
}