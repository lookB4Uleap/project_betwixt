"use client";
import { Box, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      return () => setLoading(false);
    }, [])
    
    const handleLoginAciton = () => {
        setLoading(true);
        router.push('/signin');
    }
 
    return (

                <button 
                    className="
                        flex flex-1 justify-center items-center
                        border-solid
                        w-20
                        px-2 py-1
                        rounded-md
                        bg-blue-700 dark:bg-transparent
                        text-base sm:text-sm lg:text-base
                        dark:hover:bg-gray-800 hover:opacity-90
                        dark:border-2
                        dark:border-gray-400"
                    onClick={handleLoginAciton}
                >
                    {loading ? <CircularProgress color="inherit" className="text-blue-700 dark:text-gray-100" size={20} /> : "LOGIN"}
                </button>
                
    );
};

export default AuthButton;
