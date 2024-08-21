import { Suspense } from "react";
import MenuContainer from "./_components/MenuContainer";
import MenuContainerSkeleton from "./_components/MenuContainerSkeleton";

const MENU_MS = process.env.NEXT_PUBLIC_ITEM_URL;

async function getMenu() {
    const res = await fetch(`${MENU_MS}/api/items`);
   
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
   
    return res.json();
}

export default async function Home() {
    const menu = await getMenu();

    // console.log('[Menu] ', data);
    return (
        // <main className="flex min-h-screen flex-col bg-slate-300 dark:bg-gray-950">
        //     <ResponsiveAppBar />
        // </main>
            <Suspense fallback={<MenuContainerSkeleton />}>
                {/* <Main /> */}
                <MenuContainer menu={menu} />
            </Suspense>
            
        );
}
