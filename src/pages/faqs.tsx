import { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const faqData = [
    {
        question: "How do I create and manage an artist profile on TuneFly?",
        answer:
            "You can sign up as an artist using your email and password. Once logged in, head to the Artist Dashboard where you can upload songs, manage your artist library, and update details like genre, country, and profile information. Admins verify and approve uploads to maintain quality.",
    },
    {
        question: "Is TuneFly only for artists, or can listeners also use it?",
        answer: "TuneFly is designed for both. Artists can upload and showcase their work, while listeners can explore music, follow their favorite creators, and engage with content through playlists and recommendations. Future updates will bring even more listener-focused features."
    },
    {
        question: "How secure is my data on TuneFly?",
        answer:
            "Your information is stored securely in our production-grade database hosted on AWS RDS. Authentication is handled through encrypted tokens, and sensitive operations (like admin logins and uploads) are restricted to authorized accounts only. We continuously monitor and improve our security to protect your data.",
    },
    {
        question: "What should I do if I face errors while using the platform?",
        answer:
            "Most errors occur when the system is being updated or when login/authentication fails. If you see issues like “401 Unauthorized” or resources not loading, try refreshing your browser or clearing cache. If the problem persists, contact our support team through the Help section or email us at tuneflyadmin@gmail.com.",
    },
];

const Faqs = () => {
    const location = useLocation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
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
        bg-[url('/background/DashM.png')] md:bg-[url('/background/bg.png')]"
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
            <div className="flex-1 py-6 px-6 md:px-10 xl:px-14 2xl:px-20">
                {/* Mobile Header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">FAQs</h1>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">Frequently Asked Questions</h1>
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
                    <div className="mt-8 mb-8 w-full h-[1px] bg-gray-200/40" />
                </div>

                <div className="text-xs mb-6 hidden md:block text-center text-gray-300">Answers to most frequently asked questions by our users</div>

                {/* FAQ Section */}
                <div className="space-y-4">
                    {faqData.map((item, index) => {
                        const isOpen = expandedIndex === index;
                        return (
                            <div key={index}>
                                <div className="mx-4 md:mx-0 pb-6">
                                    <div
                                        onClick={() => setExpandedIndex(isOpen ? null : index)}
                                        className="flex justify-between items-center cursor-pointer"
                                    >
                                        <h3 className="text-white text-base font-medium">
                                            {item.question}
                                        </h3>
                                        <span className="text-teal-400 text-xl font-bold">
                                            {isOpen ? "×" : "+"}
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <p className="text-gray-300 mt-3 text-sm">{item.answer}</p>
                                    )}
                                </div>

                                {/* Divider except after last item */}
                                {index < faqData.length - 1 && (
                                    <div className="border-t border-gray-400 mx-4 md:mx-0"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
