import { useState, useEffect } from "react";
import { FaMusic, FaUsers, FaCar, FaMoneyBillWave } from "react-icons/fa";
import {
    BellIcon,
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UserIcon,
    UserGroupIcon,
    QrCodeIcon,
    ArrowRightStartOnRectangleIcon,
    MagnifyingGlassIcon,
    ArrowsUpDownIcon,
    AdjustmentsVerticalIcon,
    PowerIcon
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutModal from "./modals/LogoutModal";
import { fetchAdminLogs } from "./api/adminLogs";
import type { AdminLogs } from "./api/adminLogs";
import { fetchArtistLibrary } from "./api/fetchArtistLibrary";
import { approveTrack } from "./api/approveTrack";

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tracks, setTracks] = useState<any[]>([]);

    const location = useLocation();

    const handleLogout = () => {

    };

    const [logs, setLogs] = useState<AdminLogs | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchArtistLibrary();
                setTracks(res);
            } catch (err: any) {
                console.error("Failed to fetch artist library:", err);
                setError("Failed to load tracks");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const refreshTracks = async () => {
        const res = await fetchArtistLibrary();
        setTracks(res);
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchAdminLogs();
                setLogs(res);
            } catch (err: any) {
                console.error("Failed to fetch logs:", err);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <div className="text-white p-6">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-6">{error}</div>;
    }

    return (
        <div
            className="
                min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-left
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
                            <Link to="/admin/qrCode">QR Codes</Link>
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
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <div className="flex items-center gap-4">
                        <img
                            src="/assets/logo.svg"
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold font-inter">Tunefly</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/admin/noNotifications">
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
                                    <UserIcon className="w-5 h-5" />
                                    <Link to="/admin/driverProfile">Driver Profiles</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <UserGroupIcon className="w-5 h-5" />
                                    <Link to="/admin/artistProfile">Artist Profiles</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <QrCodeIcon className="w-5 h-5" />
                                    <Link to="/admin/qrCode">QR Code</Link>
                                </li>
                                <li className="hover:text-pink-400 cursor-pointer py-4 px-1 flex items-center gap-3">
                                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                                    <Link to="/faqs">Logout</Link>
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
                            <Link to="/admin/noNotifications">
                                <BellIcon className="w-6 h-6 text-white" />
                            </Link>
                            <img
                                src="/profile/Profile.png"
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Divider line below header */}
                    <div className="mt-8  mb-12 w-full h-[1px] bg-gray-200/40" />
                </div>


                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 mb-6">
                    {/* Total Impressions */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-pink-500 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base lg:text-sm text-gray-300">Total Drivers</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{logs?.totaldriver ?? 0}</span>
                            <FaCar className="text-teal-400 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* Total Music */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-teal-400 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300 lg:text-sm">Total Artists</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{logs?.totalartist ?? 0}</span>
                            <FaUsers className="text-pink-500 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* Total Listeners */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-teal-400 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300 lg:text-sm">Total Songs</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">{logs?.totalsong ?? 0}</span>
                            <FaMusic className="text-pink-400 text-2xl md:text-3xl" />
                        </div>
                    </div>

                    {/* Monthly Listeners */}
                    <div className="bg-[#1F1F21]/70 rounded-md border border-pink-400 p-4 lg:p-6 xl:p-8 
                  h-28 sm:h-32 md:h-36 xl:h-40 
                  flex flex-col justify-between shadow-md">
                        <p className="text-sm md:text-base text-gray-300 lg:text-sm">Total Earnings</p>
                        <div className="flex justify-between items-end">
                            <span className="text-xl md:text-2xl font-bold">${logs?.totalEarning?.toFixed(2) ?? "0.00"}</span>
                            <FaMoneyBillWave className="text-teal-400 text-2xl md:text-3xl" />
                        </div>
                    </div>
                </div>
                {/* Artist Library Request */}
                <div className="mb-8 lg:hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-xl font-semibold lg:text-sm">Artist Library Request</h2>
                        <button className="bg-gradient-to-r from-pink-500 to-teal-400 p-[1px] rounded-md">
                            <div className="bg-[#1F1F21] px-4 py-1 rounded-md text-sm md:text-base">
                                View all
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {tracks.map((track) => (
                            <div
                                key={track.uuid}
                                className="bg-gradient-to-r from-pink-500 to-teal-400 p-[1px] rounded-md"
                            >
                                <div className="bg-[#1F1F21] p-4 rounded-md">
                                    <h3 className="text-base font-semibold">{track.songname}</h3>
                                    <p className="text-sm text-gray-300">{track.artistname}</p>
                                    <div className="flex justify-end gap-3 mt-2">
                                        {track.status === "Approved" ? (
                                            <span className="text-green-400 text-xs font-semibold">Approved</span>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await approveTrack(track.uuid, "Approved", track.userId);
                                                            await refreshTracks();
                                                        } catch (err) {
                                                            console.error("Failed to approve:", err);
                                                        }
                                                    }}
                                                    className="w-6 h-6 rounded-full border border-green-400 text-green-400 text-sm hover:bg-green-400/10"
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await approveTrack(track.uuid, "Rejected", track.userId);
                                                            await refreshTracks();
                                                        } catch (err) {
                                                            console.error("Failed to reject:", err);
                                                        }
                                                    }}
                                                    className="w-6 h-6 rounded-full border border-pink-400 text-pink-400 text-sm hover:bg-pink-400/10"
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Desktop */}
                <div className="hidden lg:flex items-center justify-between mb-4 mt-10">
                    {/* Heading on the left */}
                    <h2 className="text-lg font-semibold lg:text-xl">
                        Artist Library Request Approval for Track
                    </h2>

                    {/* Icons and button on the right */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <AdjustmentsVerticalIcon className="h-5 w-5" />
                            <span>Filter</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <ArrowsUpDownIcon className="h-5 w-5" />
                            <span>Sort</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <MagnifyingGlassIcon className="h-5 w-5" />
                            <span>Search</span>
                        </div>
                        <button className="bg-gradient-to-r from-pink-500 to-teal-400 p-[1px] rounded-md">
                            <div className="bg-[#1F1F21] px-4 py-1 rounded-md text-xs">
                                View all
                            </div>
                        </button>
                    </div>
                </div>

                {/* Desktop Table - Visible on lg and above */}
                <div className="hidden lg:block mt-8">
                    <div className="bg-gradient-to-r from-pink-500 to-teal-400 p-[1px] rounded-md">
                        <div className="overflow-x-auto rounded-md">
                            <table className="min-w-full text-left text-sm text-white">
                                <thead className="bg-[#c0c0c0] text-black text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Sr No.</th>
                                        <th className="px-6 py-3">Artist Name</th>
                                        <th className="px-6 py-3">Song Name</th>
                                        <th className="px-6 py-3">Genre</th>
                                        <th className="px-6 py-3">Country</th>
                                        <th className="px-6 py-3">Track Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#111112]">
                                    {tracks.map((track, idx) => (
                                        <tr key={track.uuid} className="border-t border-gray-700">
                                            <td className="px-6 py-2">{idx + 1}</td>
                                            <td className="px-6 py-2">{track.artistname}</td>
                                            <td className="px-6 py-2">{track.songname}</td>
                                            <td className="px-6 py-2">{track.genre}</td>
                                            <td className="px-6 py-2">{track.country}</td>
                                            <td className="px-6 py-2">
                                                {track.status === "Approved" ? (
                                                    <span className="inline-flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                                                        Approved
                                                    </span>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    await approveTrack(track.uuid, "Approved", track.userId);
                                                                    await refreshTracks(); // reload the updated list
                                                                } catch (err) {
                                                                    console.error("Failed to approve track:", err);
                                                                }
                                                            }}
                                                            className="bg-green-600 hover:bg-green-500 text-xs px-3 py-1 rounded"
                                                        >
                                                            Approve
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;