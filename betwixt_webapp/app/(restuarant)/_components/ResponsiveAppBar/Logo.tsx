"use client";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const LogoMD = () => {
    const router = useRouter();

    return (
        <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "inherit",
                fontWeight: 700,
                letterSpacing: ".1rem",
                textDecoration: "none",
                cursor: "pointer"
            }}
            onClick={() => router.push("/menu")}
        >
            BETWIXT
        </Typography>
    );
};

export const LogoSM = () => {
    const router = useRouter();

    return (
        <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                cursor: "pointer"
            }}
        >
            BETWIXT
        </Typography>
    );
};
