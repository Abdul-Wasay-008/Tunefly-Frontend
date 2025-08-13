import { useState, useEffect } from "react";
import {
    BellIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
    ArrowLeftCircleIcon
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NewCampaigns = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //Avatar
    const [avatarUrl, setAvatarUrl] = useState("/profile/Profile.png"); // fallback

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const { uuid } = jwtDecode<any>(token) || {};
            // filename is stored separately in localStorage after upload
            const filename =
                localStorage.getItem("avatar")
                // or, if your JWT also contains it, fall back to that:
                || (jwtDecode<any>(token)?.avatar as string | undefined);

            if (uuid && filename) {
                const url = `${import.meta.env.VITE_API_BASE_URL}public/avatar/${uuid}/${filename}`;
                setAvatarUrl(url);
            }
        } catch (e) {
            console.error("Failed to decode token / build avatar URL", e);
        }
    }, []);

    return (
        <div
            className="
                min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom
                bg-[url('/background/DashM.png')]   // Mobile
                md:bg-[url('/background/bg.png')]   // Tablet
                "
        >

            {/* Sidebar (Desktop Only) */}
            <aside className="hidden md:flex flex-col w-64 bg-[#111111] p-6 space-y-6">
                <img src="/assets/logo.svg" alt="Tunefly Logo" className="w-20 lg:w-24 items-center justify-center mx-auto mb-4" />
                <ul className="text-white text-base font-medium space-y-4">
                    {/* Home */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/dashboard' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/dashboard' && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-2 bg-teal-400 rounded-r"></span>
                        )}
                        <HomeIcon className="w-5 h-5" />
                        <Link to="/dashboard">Home</Link>
                    </li>

                    {/* New Campaigns */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/campaigns' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/newCampaigns' && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                        )}
                        <SpeakerWaveIcon className="w-5 h-5" />
                        <Link to="/newCampaigns">New Campaigns</Link>
                    </li>

                    {/* Asset Library */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/library' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/library' && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                        )}
                        <MusicalNoteIcon className="w-5 h-5" />
                        <Link to="/AssetLibrary">Asset Library</Link>
                    </li>

                    {/* Analytics */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/analytics' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/analytics' && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                        )}
                        <ChartBarSquareIcon className="w-5 h-5" />
                        <Link to="/analytics">Analytics</Link>
                    </li>

                    {/* Settings */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/settings' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/settings' && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                        )}
                        <Cog6ToothIcon className="w-5 h-5" />
                        <Link to="/settings">Settings</Link>
                    </li>

                    {/* FAQs */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/faqs' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/faqs' && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                        )}
                        <QuestionMarkCircleIcon className="w-5 h-5" />
                        <Link to="/faqs">FAQs</Link>
                    </li>
                </ul>

            </aside>

            {/* Main Content */}
            <div className="flex-1 px-4 py-6 lg:px-10 xl:px-14 2xl:px-20">
                {/* Top Header */}
                <div className="relative mb-6 md:hidden">
                    {/* Back Arrow on the left */}
                    <button className="absolute left-0 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>

                    {/* Centered Heading */}
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">Campaigns</h1>
                </div>

                {/* Empty state content for mobile */}
                <div className="md:hidden flex flex-col items-center justify-center mt-16 text-center px-6">
                    <img
                        src="/Illustration/NoCampaign.svg"
                        alt="Campaign Illustration"
                        className="h-80 w-80 mx-auto mt-6"
                    />
                    <p className="text-base text-white mb-6">
                        You don’t have any campaigns right now
                    </p>
                    <button
                        className="
            bg-gradient-to-r from-pink-500 to-teal-400
            text-white font-semibold text-sm
            px-6 py-3 rounded-full shadow-md transition-all
            hover:brightness-110"
                    >
                        <Link to="/createCampaigns">+ Create new campaign</Link>
                    </button>
                </div>

                {/* Header (desktop) */}
                <div className="hidden md:block mb-6">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                        {/* Left: Dashboard title */}
                        <h1 className="text-2xl font-semibold text-white">Campaigns</h1>

                        {/* Right: Bell + Profile */}
                        <div className="flex items-center gap-5">
                            <Link to="/noNotifications">
                                <BellIcon className="w-6 h-6 text-white" />
                            </Link>
                            <div className="bg-gradient-to-r from-pink-500 to-teal-400 rounded-full p-[1px]">
                                <img
                                    src={avatarUrl}
                                    onError={(e) => (e.currentTarget.src = "/profile/Profile.png")} // graceful fallback
                                    alt="Profile"
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Divider line below header */}
                    <div className="mt-8 mb-12 w-full h-[1px] bg-gray-200/40" />

                    {/* Empty state content for laptop */}
                    <div className="md:block flex mt-12 lg:mt-16 xl:mt-14 2xl:mt-20 flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-6">
                        <img
                            src="/Illustration/NoCampaign.svg"
                            alt="Campaign Illustration"
                            className="h-96 w-96 xl:h-[26rem] xl:w-[26rem] 2xl:h-[30rem] 2xl:w-[30rem] mx-auto mt-6"
                        />
                        <p className="text-base text-white mb-6">
                            You don’t have any campaigns right now
                        </p>

                        <button
                            className="
            bg-gradient-to-r from-pink-500 to-teal-400
            text-white font-semibold text-sm
            px-6 py-3 rounded-full shadow-md transition-all
            hover:brightness-110"
                        >
                            <Link to="/createCampaigns">+ Create new campaign</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCampaigns;
