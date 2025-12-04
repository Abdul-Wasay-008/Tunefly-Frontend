import {
    BellIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    UserGroupIcon,
    QrCodeIcon,
    UserIcon,
    PowerIcon
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./modals/LogoutModal";
import { useState } from "react";

const NoQR = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {

    };

    return (
        <div
            className="
                min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom
                bg-[url('/background/DashM.png')]   // Mobile
                md:bg-[url('/background/bg.png')]   // Tablet
                "
        >

            {/* Sidebar (Desktop Only) */}
            <aside className="hidden md:flex flex-col justify-between h-screen w-64 bg-[#111111] p-6">
                {/* Top Section: Logo + Navigation */}
                <div>
                    <img
                        src="/assets/logo.svg"
                        alt="Tunefly Logo"
                        className="w-20 lg:w-24 mx-auto mb-12"
                    />

                    <ul className="text-white text-base font-medium space-y-4">
                        {/* Home */}
                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
          ${location.pathname === '/admin/dashboard' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                        >
                            {location.pathname === '/admin/dashboard' && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <HomeIcon className="w-5 h-5" />
                            <Link to="/admin/dashboard">Home</Link>
                        </li>

                        {/* Driver Profiles */}
                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
          ${location.pathname === '/admin/driverProfile' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                        >
                            {location.pathname === '/admin/driverProfile' && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <UserIcon className="w-5 h-5" />
                            <Link to="/admin/driverProfile">Driver Profiles</Link>
                        </li>

                        {/* Artist Profile */}
                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
          ${location.pathname === '/admin/artistProfile' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                        >
                            {location.pathname === '/admin/artistProfile' && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <UserGroupIcon className="w-5 h-5" />
                            <Link to="/admin/artistProfile">Artist Profiles</Link>
                        </li>

                        {/* QR Code */}
                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
          ${location.pathname === '/admin/noQR' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
                        >
                            {location.pathname === '/admin/noQR' && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <QrCodeIcon className="w-5 h-5" />
                            <Link to="/admin/noQR">QR Codes</Link>
                        </li>

                        <li className="ml-4 pt-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors"
                            >
                                <PowerIcon className="w-5 h-5" />
                                <span className="text-base font-medium">Logout</span>
                            </button>
                        </li>
                    </ul>
                    {/* Reusable Logout Modal */}
                    <LogoutModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={handleLogout}
                    />
                </div>
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
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">QR Codes</h1>
                </div>

                {/* Empty state content for mobile */}
                <div className="md:hidden flex flex-col items-center justify-center mt-16 text-center px-6">
                    <img
                        src="/Illustration/NoCampaign.svg"
                        alt="Campaign Illustration"
                        className="h-80 w-80 mx-auto mt-6"
                    />
                    <p className="text-sm text-white mb-6">
                        No QR codes found, please generate new one
                    </p>
                    <button
                        className="
            bg-gradient-to-r from-pink-500 to-teal-400
            text-white font-semibold text-sm
            px-6 py-3 rounded-full shadow-md transition-all
            hover:brightness-110"
                    >
                        <Link to="/admin/QRCode">+ Create new QR</Link>
                    </button>
                </div>

                {/* Header (desktop) */}
                <div className="hidden md:block mb-6">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                        {/* Left: Dashboard title */}
                        <h1 className="text-2xl font-semibold text-white">QR Codes</h1>

                        {/* Right: Bell + Profile */}
                        <div className="flex items-center gap-5">
                            <BellIcon className="w-6 h-6 text-white" />
                            <img
                                src="/profile/Profile.png"
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
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
                            No QR codes found, please generate new one
                        </p>

                        <button
                            className="
            bg-gradient-to-r from-pink-500 to-teal-400
            text-white font-semibold text-sm
            px-6 py-3 rounded-full shadow-md transition-all
            hover:brightness-110"
                        >
                            <Link to="/admin/QRCode">+ Create new QR</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoQR;
