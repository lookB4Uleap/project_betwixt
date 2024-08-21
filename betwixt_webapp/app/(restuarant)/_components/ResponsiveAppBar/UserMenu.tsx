import React, { useContext } from "react";
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Switch,
    Tooltip,
    Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { betwixtSignOut } from "@/utils/auth";
import { useCart } from "@/hooks/useCart";
import { Cart } from "@/types/cart";
import { SlidingCartContext } from "@/context/SlidingCartContext";
import { useRouter } from "next/navigation";

type UserMenuProps = {
    theme?: string;
    anchorElUser: any;
    onOpenCart: () => void;
    onOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onCloseUserMenu: () => void;
    onChangeTheme: (e: React.SyntheticEvent) => void;
};

const getItemsCount = (cart: Cart | null) => {
    if (!cart) return 0;

    const items = Object.keys(cart).reduce(
        (total: number, cur: string) => total + cart[cur].quantity,
        0
    );

    return items;
};

const UserMenu = (props: UserMenuProps) => {
    const DARK = "dark";
    const LIGHT = "light";
    const cartContext = useContext(SlidingCartContext);
    const router = useRouter();

    const settings = [
        // { name: "Profile", action: props.onCloseUserMenu },
        // { name: "Account", action: props.onCloseUserMenu },
        // { name: "Dashboard", action: props.onCloseUserMenu },
        {name: "Order History", action: () => router.push('/orders') },
        { name: "Dark Theme", action: props.onCloseUserMenu },
        {
            name: "Logout",
            action: () => {
                betwixtSignOut(props.onCloseUserMenu);
            },
        },
    ];

    return (
        <>
            <Tooltip title="Open cart">
                <IconButton
                    sx={{ py: 1 }}
                    className="hover:opacity-50"
                    onClick={props.onOpenCart}
                >
                    <Badge
                        badgeContent={getItemsCount(cartContext.cart)}
                        color="error"
                    >
                        <ShoppingCartIcon className="text-gray-200" />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
                <IconButton onClick={props.onOpenUserMenu} sx={{ py: 1 }}>
                    <Avatar
                        alt="Remy Sharp"
                        // src="/static/images/avatar/2.jpg"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{
                    mt: "10px",
                    "& .MuiMenu-paper": {
                        backgroundColor:
                            props.theme === DARK ? "#212121" : "white",
                        color: props.theme === DARK ? "white" : "black",
                    },
                }}
                id="menu-appbar"
                anchorEl={props.anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(props.anchorElUser)}
                onClose={props.onCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem
                        key={setting.name}
                        onClick={() => setting.action()}
                        className="flex items-center justify-between"
                    >
                        <Typography textAlign="center">
                            {setting.name}
                        </Typography>
                        {setting.name === "Dark Theme" && (
                            <Switch
                                onClick={props.onChangeTheme}
                                defaultChecked={props.theme === DARK}
                            />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default UserMenu;
