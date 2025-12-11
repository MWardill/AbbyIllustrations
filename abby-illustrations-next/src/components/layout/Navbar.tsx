import { FaInstagram, FaEtsy } from 'react-icons/fa';
import NextImage from "next/image";
import { useSession } from "next-auth/react";
import { Image } from '../images';
import { useScroll } from '@/src/hooks/ScrollContext';
import { useRouter } from "next/navigation";
const BANNER_SRC = '/images/Website_Banner_New.png';

export default function Navbar() {

    const { scrollToTop } = useScroll();
    const router = useRouter();
    const { data: session } = useSession();
    const userName = session?.user?.name || session?.user?.email || "Profile avatar";
    const avatarUrl = session?.user?.image ?? null;
    const handleBannerClick = () => {
        router.push('/');
        scrollToTop();
    };

    return (
        <div className="navbar bg-base-100 shadow-md border-b border-base-200 h-28 lg:h-32 p-0 items-center z-50 relative">
            <div className="flex-none lg:hidden flex items-center">
                <label htmlFor="site-drawer" className="btn btn-square btn-ghost">
                    ☰
                </label>
            </div>
            <div className="hidden lg:flex flex-none w-28 pl-10"></div>
            <div className="flex-1 flex justify-center h-full pt-0 pb-2">
                <Image
                    src={BANNER_SRC}
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
                {session && (
                    <div className="avatar" title={userName}>
                        <div className="w-10 rounded-full border border-base-300 shadow-sm overflow-hidden bg-base-200">
                            {avatarUrl ? (
                                <NextImage
                                    src={avatarUrl}
                                    alt={`${userName}'s avatar`}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-base-content/80">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
