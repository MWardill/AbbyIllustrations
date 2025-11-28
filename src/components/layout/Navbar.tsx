import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaEtsy } from 'react-icons/fa';
import { Image } from '../images';
import { useScroll } from '../../hooks';
import banner from '../../assets/Website_Banner_New.png';

export default function Navbar() {
    const navigate = useNavigate();
    const { scrollToTop } = useScroll();

    const handleBannerClick = () => {
        navigate('/');
        scrollToTop();
    };

    return (
        <div className="navbar bg-base-100 shadow-sm border-b border-base-200 h-28 lg:h-32 p-0 items-center">
            <div className="flex-none lg:hidden flex items-center">
                <label htmlFor="site-drawer" className="btn btn-square btn-ghost">
                    ☰
                </label>
            </div>
            {/* Spacer to balance the social icons on large screens */}
            <div className="hidden lg:flex flex-none w-28 pl-10"></div>
            <div className="flex-1 flex justify-center h-full pt-0 pb-2">
                <Image
                    src={banner}
                    alt="Abby's Illustrations"
                    className="h-full w-auto object-contain cursor-pointer"
                    eager
                    onClick={handleBannerClick}
                />
            </div>
            <div className="flex-none flex items-center gap-2 pr-4 lg:pr-10">
                <a href="https://www.instagram.com/abbyillustrator/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle">
                    <FaInstagram className="h-7 w-7" />
                </a>
                <a href="https://www.etsy.com/uk/shop/AbbysIllustrations" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle">
                    <FaEtsy className="h-7 w-7" />
                </a>
            </div>
        </div>
    )
}
