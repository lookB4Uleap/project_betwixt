import { Cart, CartItem } from "@/types/cart";
import { useEffect, useState } from "react";

const loadItem = (id: string) => {
  const authToken = localStorage.getItem("authToken");
  const itemKey = `items_${authToken}`;
    if (!localStorage.getItem(itemKey))
        return;
    const items: Cart = JSON.parse(localStorage.getItem(itemKey) ?? JSON.stringify({}));
    return items[id];
}

const saveItems = () => {

}

export const useItem = (id?: string) => {
    const [item, setItem] = useState<CartItem|null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
      if (!id) {
        setError("ID cannot be empty");
        setLoading(false);
        return;
      }

      let loadedItem = loadItem(id);
      setItem(loadedItem);
      setLoading(false);
    
      return () => {
        setItem(null);
        setLoading(true);
        setError(null);
      }
    }, [id])

    return {item, loading, error};
}