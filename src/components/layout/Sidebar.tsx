import { useLocation, useNavigate } from "react-router-dom"
import { useScroll } from "../../hooks"

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
        <div className="drawer-side z-40">
            <label htmlFor="site-drawer" className="drawer-overlay"></label>
            <aside className="w-64 min-h-full bg-base-100 shadow-inner pt-2">                 
                <ul className="menu p-4 gap-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            {item.external ? (
                                <a 
                                    href={item.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg cursor-pointer hover:bg-base-200"
                                >        
                                    {item.label}
                                </a>
                            ) : (
                                <a 
                                    onClick={() => handleNavClick(item.to)}
                                    className={`rounded-lg cursor-pointer ${pathname === item.to ? "active bg-primary/10 text-primary" : "hover:bg-base-200"}`}
                                >        
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}