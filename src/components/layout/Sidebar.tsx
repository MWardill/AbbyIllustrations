import { useLocation, useNavigate } from "react-router-dom"
import { useScroll } from "../../hooks"

const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/dog-portraits", label: "Dog Portraits" },
    { to: "/baby-portraits", label: "Baby Portraits" },
    { to: "/fashion-images", label: "Fashion Images" },
    { to: "/animal-images", label: "Animal Images" },
    { to: "/christmas-animals", label: "Christmas Animals" },
    { to: "/store", label: "Store" }
];

export default function Sidebar() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { scrollToTop, scrollToContent } = useScroll()

    const handleNavClick = (to: string) => {
        navigate(to);
        if (to === "/") {
            scrollToTop();
        } else {
            scrollToContent();
        }
    };

    return (
        <div className="drawer-side">
            <label htmlFor="site-drawer" className="drawer-overlay"></label>
            <aside className="w-64 min-h-full bg-base-100">                 
                <ul className="menu p-4 gap-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <a 
                                onClick={() => handleNavClick(item.to)}
                                className={`rounded-lg cursor-pointer ${pathname === item.to ? "active bg-primary/10 text-primary" : "hover:bg-base-200"}`}
                            >        
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}