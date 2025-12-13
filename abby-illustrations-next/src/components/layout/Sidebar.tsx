"use client";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useScroll } from "../../hooks"
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const navItems = [
    { to: "/", label: "Home" },
    { to: "/dog-portraits", label: "Dog Portraits" },
    { to: "/pet-portraits", label: "Pet Portraits" },
    { to: "/baby-portraits", label: "Baby Portraits" },
    { to: "/fashion-images", label: "Fashion Images" },
    { to: "/animal-images", label: "Animal Images" },
    { to: "/christmas-animals", label: "Christmas Animals" },
    { to: "https://www.etsy.com/uk/shop/AbbysIllustrations", label: "Shop", external: true },
    { to: "/about", label: "About" },
    { to: "/gallery-maint", label: "Gallery Maintenance", requiresAuth: true },
];


export default function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useTransitionRouter();
    const { scrollToTop, scrollToContent } = useScroll()

    const closeSidebar = () => {
        const drawer = document.getElementById('site-drawer') as HTMLInputElement;
        if (drawer) {
            drawer.checked = false;
        }
    };

    const handleNavClick = (to: string) => {
        closeSidebar();
        router.push(to);
        if (to === "/") {
            scrollToTop();
        } else {
            scrollToContent();
        }
    };

    return (
        <div className="drawer-side z-50 lg:z-40">
            <label htmlFor="site-drawer" className="drawer-overlay"></label>
            <aside className="w-64 min-h-full bg-base-100 shadow-lg pt-16 lg:pt-2">
                <ul className="menu p-4 gap-1">
                    {navItems.map((item) => {
                        // Skip rendering if item requires auth and user is not logged in
                        if (item.requiresAuth && !session) {
                            return null;
                        }
                        return (
                        <li key={item.to}>
                            {item.external ? (
                                <a
                                    href={item.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg cursor-pointer hover:bg-base-200"
                                    onClick={closeSidebar}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => handleNavClick(item.to)}
                                    className={`rounded-lg cursor-pointer text-left w-full ${pathname === item.to ? "active bg-primary/10 text-primary" : "hover:bg-base-200"}`}
                                >
                                    {item.label}
                                </button>
                            )}
                        </li>
                        );
                    })}
                    <li>
                        {!session ? (
                            <button
                                type="button"
                                onClick={() => signIn("google", { callbackUrl: "/" })}
                                className={`rounded-lg cursor-pointer text-left w-full hover:bg-base-200"}`}
                            >
                                Log In
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className={`rounded-lg cursor-pointer text-left w-full hover:bg-base-200"}`}
                            >
                                Log Out
                            </button>
                        )
                        }
                    </li>
                </ul>
            </aside>
        </div>
    )
}