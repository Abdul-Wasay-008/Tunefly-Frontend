import { useState, useEffect } from "react";
import { FaMusic, FaSignal, FaUsers } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import {
    BellIcon,
    Bars3Icon,
    XMarkIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
}
    from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchDashboard } from "../api/dashboardApi"; //Integration
import type { DashboardResponse } from "../api/dashboardApi"; //Integration
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [stats, setStats] = useState<DashboardResponse | null>(null);

    const location = useLocation();

    //Integration
    useEffect(() => {
        let cancelled = false;
        fetchDashboard()
            .then((d) => { if (!cancelled) setStats(d); })
            .catch((e) => console.error("[Dashboard] fetch failed:", e));
        return () => { cancelled = true; };
    }, []);

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
                min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-left
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
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                        )}
                        <HomeIcon className="w-5 h-5" />
                        <Link to="/dashboard">Home</Link>
                    </li>

                    {/* New Campaigns */}
                    <li
                        className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
    ${location.pathname === '/campaigns' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                    >
                        {location.pathname === '/campaigns' && (
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
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-pink-500 to-teal-400 rounded-full p-[1px]">
                            <img
                                src={avatarUrl}
                                onError={(e) => (e.currentTarget.src = "/profile/Profile.png")} // graceful fallback
                                alt="Profile"
                                className="w-14 h-14 rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300">Good Morning,</p>
                            <h2 className="text-lg font-semibold font-inter">James Smith</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/noNotifications">
                            <BellIcon className="w-6 h-6 text-white" />
                        </Link>
                        <button onClick={() => setIsOpen(true)}>
                            <Bars3Icon className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                    <div className="fixed right-0 top-4 h-full w-64 bg-[#111111] p-6 shadow-xl overflow-y-auto">
                        <div className="flex justify-end mb-4">
                            <button onClick={() => setIsOpen(false)}>
                                <XMarkIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <ul className="text-white">
                            <li className="text-center font-bold text-xl pb-4">Menu</li>
                            <div className="divide-y divide-gray-600">
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <SpeakerWaveIcon className="w-5 h-5" />
                                    <Link to="/newCampaigns">New Campaigns</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <MusicalNoteIcon className="w-5 h-5" />
                                    <Link to="/assetLibrary">Asset Library</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <ChartBarSquareIcon className="w-5 h-5" />
                                    <Link to="/analytics">Analytics</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                    <Link to="/settings">Settings</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <QuestionMarkCircleIcon className="w-5 h-5" />
                                    <Link to="/faqs">FAQs</Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </Dialog>

                {/* Header (desktop) */}
                <div className="hidden md:block mb-6">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                        {/* Left: Dashboard title */}
                        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>

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
                    <div className="mt-8  mb-12 w-full h-[1px] bg-gray-200/40" />
                </div>


                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 mb-6">
                    {/* Total Impressions */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-pink-500 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300">Total Impressions</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{stats?.impressions ?? 0}</span>
                            <FaSignal className="text-teal-400 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* Total Music */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-teal-400 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300">Total Music</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{stats?.totalArtistLibrary ?? 0}</span>
                            <FaMusic className="text-pink-500 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* Total Listeners */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-teal-400 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300">Total Listeners</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{stats?.listener ?? 0}</span>
                            <FaUsers className="text-pink-400 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* Monthly Listeners */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-pink-400 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300">Monthly Listeners</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{stats?.monthlistener ?? 0}</span>
                            <MdCalendarToday className="text-teal-400 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-[#1F1F21]/80 rounded-md border border-pink-500 overflow-hidden 
                  col-span-full md:col-span-2 md:col-start-2 
                  shadow-md">
                        <div className="bg-pink-500 text-center py-2 md:py-3 font-semibold text-sm md:text-base">
                            QR Code Scanned
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-500 text-center py-4 md:py-4 xl:py-5">
                            <div>
                                <p className="text-lg md:text-2xl font-bold">27</p>
                                <p className="text-xs text-gray-300 md:pt-2 xl:pt-4">Scanned</p>
                            </div>
                            <div>
                                <p className="text-lg md:text-2xl font-bold">56</p>
                                <p className="text-xs text-gray-300 md:pt-2 xl:pt-4">Listener Engagement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
