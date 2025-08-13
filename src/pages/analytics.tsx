import { useEffect, useRef, useState } from "react";
import {
    BellIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchSongPlayed, type SongPlayedResponse } from "../api/songPlayedApi";
import { fetchLog, type LogResponse } from "../api/logApi";
import { jwtDecode } from "jwt-decode";

const Analytics = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // State for the API data
    const [totals, setTotals] = useState<SongPlayedResponse | null>(null);
    const [, setErr] = useState<string | null>(null);
    const fetchedRef = useRef(false);

    // States for bar chart
    const [logData, setLogData] = useState<LogResponse | null>(null);
    const [chartMode, setChartMode] = useState<"listeners" | "plays">("listeners");

    //Bar chart
    useEffect(() => {
        if (fetchedRef.current) return; // avoid StrictMode double-fetch
        fetchedRef.current = true;

        (async () => {
            try {
                const d = await fetchLog();
                setLogData(d);
            } catch (e) {
                console.error("[Analytics] fetchLog failed:", e);
            }
        })();
    }, []);

    // Build rows for the current chart mode
    const locationRows = (() => {
        const countries = ["US", "UK", "Canada", "China"]; // display order for UI
        if (!logData) return countries.map(name => ({ name, value: 0, pct: 0 }));

        // Backend arrays are [0, US, Canada, UK, China]
        const source =
            chartMode === "listeners" ? logData.listenerlist : logData.songplayedlist;

        // Map backend order → UI order
        const mapFromBackend = (label: string) => {
            switch (label) {
                case "US": return source[1] ?? 0;
                case "Canada": return source[2] ?? 0;
                case "UK": return source[3] ?? 0;
                case "China": return source[4] ?? 0;
                default: return 0;
            }
        };

        const values = countries.map(mapFromBackend);
        const max = Math.max(1, ...values);
        return countries.map((name, i) => ({
            name,
            value: values[i],
            pct: Math.round((values[i] / max) * 100),
        }));
    })();

    // Stats
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        (async () => {
            try {
                const data = await fetchSongPlayed();
                setTotals(data);
            } catch (e: any) {
                setErr(e?.message || "Failed to load stats");
            }
        })();
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
        min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom
        bg-[url('/background/DashM.png')] md:bg-[url('/background/bg.png')]
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
            <div className="flex-1 py-6 md:px-10 xl:px-14 2xl:px-20">

                {/* Desktop Header (optional) */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
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
                    <div className="mt-8 mb-4 w-full h-[1px] bg-gray-200/40" />
                </div>

                <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
                    {/* Left Side */}
                    <h2 className="text-xs text-gray-400 lg:text-sm hidden md:block">
                        View or download your analytics
                    </h2>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-400 hidden md:block">This Month ▼</p>
                        <ArrowDownTrayIcon className="h-4 w-4 text-gray-200 hidden md:block" />
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">Analytics</h1>
                </div>

                {/* Analytics Cards Section */}
                <div className="px-4 md:px-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Song played", value: totals?.songplayed ?? 0, icon: <MusicalNoteIcon className="w-6 h-6 text-pink-400" /> },
                        { label: "Song scanned", value: totals?.scanned ?? 0, icon: <ChartBarSquareIcon className="w-6 h-6 text-teal-400" /> },
                        { label: "Total Listeners", value: totals?.listener ?? 0, icon: <SpeakerWaveIcon className="w-6 h-6 text-teal-400" /> },
                        { label: "Monthly Listeners", value: totals?.monthlistener ?? 0, icon: <Cog6ToothIcon className="w-6 h-6 text-pink-400" /> },
                    ].map((stat, idx) => (
                        <div key={idx} className="p-[1px] rounded-lg bg-gradient-to-r from-pink-500 to-teal-400">
                            <div className="bg-[#1f1f21] rounded-lg px-4 py-5 md:py-8 xl:py-10 flex flex-col justify-between space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-white text-sm lg:text-xs xl:text-base">{stat.label}</p>
                                    {stat.icon}
                                </div>
                                <p className="text-2xl font-semibold">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Location Analytics */}
                <div className="px-4 md:px-0 mt-10">
                    <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
                        <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold">Location</h2>

                        {/* simple toggle */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setChartMode("listeners")}
                                className={`text-sm px-3 py-1 rounded ${chartMode === "listeners" ? "bg-teal-500/20 text-teal-300" : "text-gray-300"
                                    }`}
                            >
                                Listeners
                            </button>
                            <button
                                onClick={() => setChartMode("plays")}
                                className={`text-sm px-3 py-1 rounded ${chartMode === "plays" ? "bg-pink-500/20 text-pink-300" : "text-gray-300"
                                    }`}
                            >
                                Song Played
                            </button>
                        </div>
                    </div>

                    {locationRows.map((loc) => (
                        <div key={loc.name} className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span>{loc.name}</span>
                                <span>{loc.value}</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded">
                                <div
                                    className="h-1 rounded bg-teal-400"
                                    style={{ width: `${loc.pct}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;