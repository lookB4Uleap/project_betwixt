"use client";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "next-themes";
import FirebaseSignInContainer from "./FirebaseSignInContainer";
import { useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    getRedirectResult,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/firebase";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorSharp } from "@mui/icons-material";
import {
    betwixtRedirect,
    betwixtSignInWithEmail,
    betwixtSignInWithProvider,
    betwixtSignOut,
} from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useBetwixtAuth } from "@/hooks/useBetwixtAuth";
import { handleLogin } from "@/app/_actions/user.actions";
import { CircularProgress } from "@mui/material";
import { ThemeSwitch } from "@/app/_components/ThemeSwitch";

export default function SignInContainer() {
    const DARK = "dark";
    const LIGHT = "light";
    const { theme, setTheme } = useTheme();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        return () => setLoading(false);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    const onSignInWithProvider = async (user: any) => {
        try {
            if (!user) return;

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/api/users/auth/provider`,
                {
                    name: user?.displayName,
                    uid: user?.uid,
                    email: user?.email,
                    photoUrl: user?.photoURL,
                    phone: user?.phoneNumber,
                }
            );

            console.log("[SignInWithProvider] ", data);

            if (!data?.user || Object.keys(data?.user).length === 0) return;
            return true;
        } catch (err) {
            console.error(err);
            return;
        }
    };


    const handleTheme = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        console.log(theme);
        if (theme === DARK) {
            localStorage.setItem("theme", LIGHT);
            setTheme(LIGHT);
            return;
        }
        localStorage.setItem("theme", DARK);
        setTheme(DARK);
    };

    const signInWithEmail = () => betwixtSignInWithEmail({ email, password });

    const signInWithGoogle = async () => {
        // const provider = new GoogleAuthProvider();
        // betwixtSignInWithProvider(provider);
        setLoading(true);
        const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
        console.log("[SignInPopup] ", userCred.user);
        if (await onSignInWithProvider(userCred.user)) router.replace("/menu");
        else betwixtSignOut();
        // setLoading(false);
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
                <div
                    className="absolute right-0 top-0 m-5"
                >
                    {/* <LightModeIcon
                        sx={{ fontSize: 30 }}
                        className="
                            dark:hidden
                            text-cyan-950 dark:text-cyan-50
                            hover:text-cyan-900 dark:hover:text-gray-300
                            hover:cursor-pointer
                        "
                    />
                    <DarkModeIcon
                        sx={{ fontSize: 30 }}
                        className="
                            hidden dark:flex
                            text-cyan-950 dark:text-cyan-50
                            hover:text-cyan-900 dark:hover:text-gray-300
                            hover:cursor-pointer
                        "
                    /> */}
                    <ThemeSwitch 
                        checked={theme === DARK}
                        onClick={handleTheme}
                        switchTheme={theme}
                    />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <button
                            className="flex w-full justify-center rounded-md mt-3
                                bg-indigo-600  px-3 py-1.5 text-sm font-semibold leading-6 
                                text-white shadow-sm 
                                hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                focus-visible:outline-indigo-600
                            "
                            onClick={signInWithGoogle}
                        >
                            {loading ? (
                                <CircularProgress color="inherit" size={28} />
                            ) : (
                                "Sign in with Google"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
