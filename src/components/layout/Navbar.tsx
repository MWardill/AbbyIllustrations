import { useNavigate } from 'react-router-dom';
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
            <div className="flex-1 flex justify-center h-full pt-0 pb-2">
                <Image
                    src={banner}
                    alt="Abby's Illustrations"
                    className="h-full w-auto object-contain cursor-pointer"
                    eager
                    onClick={handleBannerClick}
                />
            </div>
            <div className="flex-none lg:hidden w-10"></div> {/* Spacer for centering */}
        </div>
    )
}
