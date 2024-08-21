import { Cart } from "@/types/cart";
import { Item } from "@/types/item";
import axios from "axios";
import { useEffect, useState } from "react";

type Menu = {
    [key: string]: any;
}

const MENU_MS = process.env.NEXT_PUBLIC_ITEM_URL;

const saveItems = (menu: Menu) => {
    const authToken = localStorage.getItem("authToken");
    const items: Cart = {}
    
    Object.keys(menu).map(itemGroup => {
        menu[itemGroup].forEach((item: Item) => {
            items[item._id] = {
                item,
                quantity: 0
            }
        });
    })

    localStorage.setItem(`items_${authToken}`, JSON.stringify(items));
}

const saveMenu = (menu: Menu, setMenu : (menu: Menu) => void) => {
    localStorage.setItem("menu", JSON.stringify(menu));
    saveItems(menu);
    setMenu({...menu});
}

const loadMenu = () => {
    const authToken = localStorage.getItem("authToken");
    const menu = JSON.parse(localStorage.getItem("menu") ?? JSON.stringify({}));

    if (!localStorage.getItem(`items_${authToken}`) && localStorage.getItem("menu"))
        saveItems(menu);

    return menu;
};

const getMenu = async (setLoading : (loading: boolean) => void, setError: (err: any) => void) => {
    const authToken = localStorage.getItem('authToken');       
    // TODO: create a single axios class
    let menu = null;
    console.log('[Menu] API ', authToken);

    return await axios.get<Menu>(`${MENU_MS}/api/items`, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => {
        console.log('[Menu] API ', res.data);
        setLoading(false); 
        return res.data;
    })
    .catch(err => {
        setLoading(false);
        setError(err.response.data.error);
    });
}

export const useMenu = () => {
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        
        (async () => {
            let curMenu = loadMenu();
            if (curMenu) {
                setMenu({...curMenu});
                setLoading(false);
                setError(null);
                return;
            }
            curMenu = await getMenu((loading) => setLoading(loading), (err) => setError(err));
            console.log('[Current Menu] ', curMenu);
            curMenu && saveMenu(curMenu, (menu: Menu) => setMenu({...menu}));
        })();

        return () => {
            setMenu({});
            setLoading(true);
            setError(null);
        }
    }, []);

    return {
        menu,
        loading,
        error
    };
}