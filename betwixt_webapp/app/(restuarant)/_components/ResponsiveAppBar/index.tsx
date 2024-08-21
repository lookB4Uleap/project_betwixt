"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, Switch } from "@mui/material";
import { useTheme } from "next-themes";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import UserMenu from "./UserMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import AuthButton from "./AuthButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useBetwixtAuth } from "@/hooks/useBetwixtAuth";
import { useCart } from "@/hooks/useCart";
import { LogoMD, LogoSM } from "./Logo";
import { useRouter } from "next/navigation";
import { ThemeSwitch } from "../../../_components/ThemeSwitch";

const pages = [
    {
        name: "Menu",
        link: "/menu",
    },
];

function ResponsiveAppBar() {
    const DARK = "dark";
    const LIGHT = "light";

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );
    // const [theme, setTheme] = React.useState<"dark" | "light" | null>(null);
    const [mounted, setMounted] = React.useState(false);
    const { theme, setTheme } = useTheme();
    const cartContext = React.useContext(SlidingCartContext);
    // const {user, loading, error, authToken} = useBetwixtAuth();
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    // const {cartItems, totalAmount, loadCart} = useCart();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenCart = () => {
        // console.log(loadCart(), cartItems);
        cartContext.onClose(cartContext.open);
        // cartContext.onChangeCart(loadCart());
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleTheme = (e: React.SyntheticEvent) => {
        e.stopPropagation();
        // console.log(theme);
        if (theme === DARK) {
            // localStorage.setItem("theme", LIGHT);
            setTheme(LIGHT);
            return;
        }
        // localStorage.setItem("theme", DARK);
        setTheme(DARK);
    };

    // React.useEffect(() => {
    //     console.log("[Appbar]", { user, loading, error });
    // }, [user]);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <AppBar
            position="static"
            className="bg-blue-600 dark:bg-gray-950 dark:border-gray dark:shadow-none"
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters variant="dense">
                    {/* <AdbIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    /> */}
                    <LogoMD />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiMenu-paper": {
                                    backgroundColor:
                                        theme === DARK ? "#212121" : "white",
                                    color: theme === DARK ? "white" : "black",
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        onClick={() =>
                                            router.replace(page.link)
                                        }
                                    >
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <Typography
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
                        }}
                    >
                        LOGO
                    </Typography> */}
                    <LogoSM />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                        className="px-3 mx-3 justify-start items-center dark:bg-slate-900 dark:rounded-lg"
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    router.replace(page.link);
                                }}
                                sx={{
                                    my: 0.5,
                                    color: "white",
                                    display: "block",
                                }}
                                className="hover:underline"
                            >
                                {page.name}
                            </Button>
                        ))}
                        {/* <Button
                            sx={{
                                my: 0.5,
                                color: "white",
                                display: "block",
                                right: 0
                            }}
                            onClick={handleTheme}
                        >
                            <LightModeIcon
                                sx={{ fontSize: 30 }}
                                className="
                                dark:hidden
                                text-cyan-5 hover:text-gray-300
                                hover:cursor-pointer
                                "
                            />
                            <DarkModeIcon
                                sx={{ fontSize: 30 }}
                                className="
                                hidden dark:flex
                                text-cyan-50
                                hover:text-gray-300
                                hover:cursor-pointer
                                "
                            />
                        </Button> */}
                        {
                            <ThemeSwitch
                                checked={theme === DARK}
                                switchTheme={theme}
                                onClick={handleTheme}
                            />
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user
                            ? !loading && (
                                  <UserMenu
                                      theme={theme}
                                      anchorElUser={anchorElUser}
                                      onOpenCart={() => handleOpenCart()}
                                      onOpenUserMenu={(
                                          event: React.MouseEvent<HTMLElement>
                                      ) => handleOpenUserMenu(event)}
                                      onCloseUserMenu={() =>
                                          handleCloseUserMenu()
                                      }
                                      onChangeTheme={(
                                          e: React.SyntheticEvent
                                      ) => handleTheme(e)}
                                  />
                              )
                            : !loading && <AuthButton />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
