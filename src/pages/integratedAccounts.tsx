import {
    BellIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

/** === Types & constants === */
type ManageArtistProfile = {
    userId: string;
    instagram?: string | null;
    twitter?: string | null;
    tiktok?: string | null;
    spotify?: string | null;
    apple?: string | null;
    soundcloud?: string | null;
};
type LinkField = keyof Omit<ManageArtistProfile, "userId">;

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";

// ⬅️ use the SAME path you used in Settings.tsx
const MANAGE_API = `${API_BASE}/api/user/artist/manageprofile`; // or `${API_BASE}/api/artist/manageprofile`

const PLATFORM_META: Array<{ key: LinkField; label: string; icon: string }> = [
    { key: "spotify", label: "Spotify", icon: "/assets/Spotify_icon.svg" },
    { key: "apple", label: "Apple Music", icon: "/assets/AMusic_icon.svg" },
    { key: "instagram", label: "Instagram", icon: "/assets/instagram.png" },
    { key: "twitter", label: "Twitter (X)", icon: "/assets/TwitterX.svg" },
    { key: "tiktok", label: "TikTok", icon: "/assets/tiktok.png" },
    { key: "soundcloud", label: "SoundCloud", icon: "/assets/soundcloud.png" },
];

const URL_TESTS: Record<LinkField, (u: string) => boolean> = {
    instagram: (u) => /^https?:\/\/(www\.)?instagram\.com\/.*/i.test(u),
    twitter: (u) => /^https?:\/\/(www\.)?twitter\.com\/.*/i.test(u),
    tiktok: (u) => /^https?:\/\/(www\.)?tiktok\.com\/.*/i.test(u),
    spotify: (u) => /^https?:\/\/(open\.)?spotify\.com\/.*/i.test(u),
    apple: (u) => /^https?:\/\/(music\.)?apple\.com\/.*/i.test(u),
    soundcloud: (u) => /^https?:\/\/(www\.)?soundcloud\.com\/.*/i.test(u),
};

type GetManageProfileResp = {
    status: string;
    manageprofile: ManageArtistProfile[]; // Option-A returns an array
};

const IntegratedAccount = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // state
    const [mpRow, setMpRow] = useState<ManageArtistProfile | null>(null);
    const [inputs, setInputs] = useState<Record<LinkField, string>>({
        spotify: "", apple: "", instagram: "", twitter: "", tiktok: "", soundcloud: "",
    });
    const [busyKey, setBusyKey] = useState<LinkField | null>(null);

    // load current links
    const loadManageProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const { uuid } = jwtDecode<any>(token) || {};
        if (!uuid) return;

        try {
            const res = await axios.get<GetManageProfileResp>(MANAGE_API, {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId: uuid },
            });
            const row = (res.data?.manageprofile ?? [])[0] ?? { userId: uuid };
            setMpRow(row);
        } catch (e) {
            console.error("load manageprofile failed:", e);
        }
    };

    useEffect(() => { loadManageProfile(); }, []);

    // save a link for a platform
    const saveLink = async (key: LinkField) => {
        const url = (inputs[key] || "").trim();
        if (!url) return;
        if (!URL_TESTS[key](url)) {
            alert(`Please paste a valid ${key} link.`);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) return;
        const { uuid } = jwtDecode<any>(token) || {};
        if (!uuid) return;

        setBusyKey(key);
        try {
            await axios.post(
                MANAGE_API,
                { userId: uuid, link: url },       // backend auto-detects platform
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInputs((s) => ({ ...s, [key]: "" }));
            await loadManageProfile();
        } catch (e: any) {
            console.error("save link failed:", e?.response || e);
            alert(e?.response?.data?.message || "Could not save link");
        } finally {
            setBusyKey(null);
        }
    };

    // tiny helper for a nice truncated URL
    const shortUrl = (raw?: string | null) => {
        if (!raw) return null;
        try {
            const u = new URL(raw);
            const s = `${u.hostname}${u.pathname}`.replace(/\/$/, "");
            return s.length > 42 ? s.slice(0, 40) + "…" : s;
        } catch {
            return raw.length > 42 ? raw.slice(0, 40) + "…" : raw;
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom bg-[url('/background/DashM.png')] md:bg-[url('/background/bg.png')]">
            {/* Sidebar (Desktop Only) */}
            <aside className="hidden md:flex flex-col w-64 bg-[#111111] p-6 space-y-6">
                <img src="/assets/logo.svg" alt="Tunefly Logo" className="w-20 lg:w-24 items-center justify-center mx-auto mb-4" />
                <ul className="text-white text-base font-medium space-y-4">
                    <li className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer ${location.pathname === '/dashboard' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}>
                        {location.pathname === '/dashboard' && (<span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-2 bg-teal-400 rounded-r"></span>)}
                        <HomeIcon className="w-5 h-5" />
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer ${location.pathname === '/newCampaigns' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}>
                        <SpeakerWaveIcon className="w-5 h-5" />
                        <Link to="/newCampaigns">New Campaigns</Link>
                    </li>
                    <li className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer ${location.pathname === '/library' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}>
                        <MusicalNoteIcon className="w-5 h-5" />
                        <Link to="/AssetLibrary">Asset Library</Link>
                    </li>
                    <li className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer ${location.pathname === '/analytics' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}>
                        <ChartBarSquareIcon className="w-5 h-5" />
                        <Link to="/analytics">Analytics</Link>
                    </li>
                    <li className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer ${location.pathname === '/settings' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}>
                        <Cog6ToothIcon className="w-5 h-5" />
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer ${location.pathname === '/faqs' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}>
                        <QuestionMarkCircleIcon className="w-5 h-5" />
                        <Link to="/faqs">FAQs</Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1 pt-6 md:px-10 xl:px-14 2xl:px-20">
                {/* Mobile Header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">Integrated Accounts</h1>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">Integrated Accounts</h1>
                        <div className="flex items-center gap-5">
                            <BellIcon className="w-6 h-6 text-white" />
                            <img src="/profile/Profile.png" alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="mt-8 mb-12 w-full h-[1px] bg-gray-200/40" />
                </div>

                {/* Mobile-first list of 6 platforms */}
                <div className="w-full flex flex-col items-center px-4 pb-10">
                    <p className="text-sm text-gray-300 mb-6 text-center">Manage your current integrated accounts</p>

                    <div className="w-full max-w-[420px] space-y-5">
                        {PLATFORM_META.map(({ key, label, icon }) => {
                            const connectedUrl = (mpRow?.[key] ?? undefined) as string | undefined;
                            const value = inputs[key] ?? "";
                            const valid = value ? URL_TESTS[key](value) : false;
                            const busy = busyKey === key;

                            return (
                                <div key={key}>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor={key} className="text-sm">{label}</label>
                                        <span className={`text-[11px] px-2.5 py-0.5 rounded-md border ${connectedUrl ? "border-teal-400/50 text-teal-300" : "border-white/20 text-white/70"}`}>
                                            {connectedUrl ? "Connected" : "Not connected"}
                                        </span>
                                    </div>

                                    {/* gradient border field */}
                                    <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                        <div className="bg-[#1f1f21] rounded-md px-3 py-2.5">
                                            <div className="flex items-center gap-3">
                                                <img src={icon} alt={label} className="w-7 h-7 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    {connectedUrl && (
                                                        <a
                                                            href={connectedUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title={connectedUrl}
                                                            className="block text-xs text-white/70 underline truncate"
                                                        >
                                                            {shortUrl(connectedUrl)}
                                                        </a>
                                                    )}
                                                    <input
                                                        id={key}
                                                        value={value}
                                                        onChange={(e) => setInputs((s) => ({ ...s, [key]: e.target.value }))}
                                                        placeholder="https://…"
                                                        className="mt-1 w-full bg-transparent text-white placeholder-gray-400 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* button below input on mobile */}
                                    <button
                                        onClick={() => saveLink(key)}
                                        disabled={!valid || busy}
                                        className={`mt-2 w-full py-2.5 rounded-md text-sm font-semibold transition
                      ${valid && !busy
                                                ? "bg-gradient-to-r from-pink-500 to-teal-400 text-white hover:opacity-95"
                                                : "bg-white/10 text-white/60 cursor-not-allowed"}`}
                                    >
                                        {connectedUrl ? (busy ? "Saving…" : "Change") : (busy ? "Saving…" : "Connect")}
                                    </button>

                                    {!!value && !valid && <p className="text-xs mt-2 text-red-400">That doesn’t look like a {label} URL.</p>}
                                    {!!value && valid && <p className="text-xs mt-2 text-emerald-400">Looks good.</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratedAccount;
