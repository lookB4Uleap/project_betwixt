import ItemContainer from "./_components/ItemContainer";
import { Suspense } from "react";

const MENU_MS = process.env.NEXT_PUBLIC_ITEM_URL;

async function getItem(id: string) {
    const res = await fetch(`${MENU_MS}/api/items/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
    const item = await getItem(params.id);

    return (
        <Suspense>
            <div className="pt-6">
                <ItemContainer item={item} />
            </div>
        </Suspense>
        
    );
}
