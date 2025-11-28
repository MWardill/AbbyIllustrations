import { Link, Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"

export default function Sidebar() {
    const { pathname } = useLocation()

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/dog-portraits", label: "Dog Portraits" },
        { to: "/christmas-animals", label: "Christmas Animals" },
        { to: "/store", label: "Store" }
    ]


    return (
        <div className="min-h-screen flex flex-col">
            {/* Top navbar - always visible */}
            <Navbar />

            {/* Drawer layout */}
            <div className="drawer lg:drawer-open flex-1">
                <input id="site-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col bg-base-200/50">
                    {/* Main content */}
                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </div>

                <div className="drawer-side">
                    <label htmlFor="site-drawer" className="drawer-overlay"></label>
                    <aside className="w-64 min-h-full bg-base-100">                 
                        <ul className="menu p-4 gap-1">
                            {navItems.map((item) => (
                                <li key={item.to}>
                                    <Link 
                                        to={item.to} 
                                        className={`rounded-lg ${pathname === item.to ? "active bg-primary/10 text-primary" : "hover:bg-base-200"}`}
                                    >        
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>
                </div>

            </div>
        </div>
    )
}