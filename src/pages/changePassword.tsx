// import { useState } from "react";
// import {
//     BellIcon,
//     SpeakerWaveIcon,
//     MusicalNoteIcon,
//     ChartBarSquareIcon,
//     Cog6ToothIcon,
//     QuestionMarkCircleIcon,
//     HomeIcon,
//     ArrowLeftCircleIcon,
//     EyeIcon,
//     EyeSlashIcon,
// } from "@heroicons/react/24/outline";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const ChangePassword = () => {
//     const location = useLocation();
//     const [showOldPassword, setShowOldPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const navigate = useNavigate();

//     return (
//         <div
//             className="
//         min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom
//         bg-[url('/background/DashM.png')] md:bg-[url('/background/bg.png')]
//       "
//         >
//             {/* Sidebar (Desktop Only) */}
//             <aside className="hidden md:flex flex-col w-64 bg-[#111111] p-6 space-y-6">
//                 <img src="/assets/logo.svg" alt="Tunefly Logo" className="w-20 lg:w-24 items-center justify-center mx-auto mb-4" />
//                 <ul className="text-white text-base font-medium space-y-4">
//                     {/* Home */}
//                     <li
//                         className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
//     ${location.pathname === '/dashboard' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
//                     >
//                         {location.pathname === '/dashboard' && (
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-2 bg-teal-400 rounded-r"></span>
//                         )}
//                         <HomeIcon className="w-5 h-5" />
//                         <Link to="/dashboard">Home</Link>
//                     </li>

//                     {/* New Campaigns */}
//                     <li
//                         className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
//     ${location.pathname === '/campaigns' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
//                     >
//                         {location.pathname === '/newCampaigns' && (
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
//                         )}
//                         <SpeakerWaveIcon className="w-5 h-5" />
//                         <Link to="/newCampaigns">New Campaigns</Link>
//                     </li>

//                     {/* Asset Library */}
//                     <li
//                         className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
//     ${location.pathname === '/library' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
//                     >
//                         {location.pathname === '/library' && (
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
//                         )}
//                         <MusicalNoteIcon className="w-5 h-5" />
//                         <Link to="/AssetLibrary">Asset Library</Link>
//                     </li>

//                     {/* Analytics */}
//                     <li
//                         className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
//     ${location.pathname === '/analytics' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
//                     >
//                         {location.pathname === '/analytics' && (
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
//                         )}
//                         <ChartBarSquareIcon className="w-5 h-5" />
//                         <Link to="/analytics">Analytics</Link>
//                     </li>

//                     {/* Settings */}
//                     <li
//                         className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
//     ${location.pathname === '/settings' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
//                     >
//                         {location.pathname === '/settings' && (
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
//                         )}
//                         <Cog6ToothIcon className="w-5 h-5" />
//                         <Link to="/settings">Settings</Link>
//                     </li>

//                     {/* FAQs */}
//                     <li
//                         className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
//     ${location.pathname === '/faqs' ? 'bg-[#1F1F21] text-white' : 'hover:bg-[#1F1F21]/50'}`}
//                     >
//                         {location.pathname === '/faqs' && (
//                             <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
//                         )}
//                         <QuestionMarkCircleIcon className="w-5 h-5" />
//                         <Link to="/faqs">FAQs</Link>
//                     </li>
//                 </ul>

//             </aside>

//             {/* Main Content */}
//             <div className="flex-1 pt-6 md:px-10 xl:px-14 2xl:px-20">
//                 {/* Mobile Header */}
//                 <div className="relative mb-6 md:hidden">
//                     <button className="absolute left-4 top-1/2 -translate-y-1/2">
//                         <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
//                     </button>
//                     <h1 className="text-[1.35rem] font-semibold text-white text-center">Change Password</h1>
//                 </div>
//                 {/* Desktop Header (optional) */}
//                 <div className="hidden md:block mb-6 mt-4">
//                     <div className="flex items-center justify-between">
//                         <h1 className="text-2xl font-semibold text-white">Change Password</h1>
//                         <div className="flex items-center gap-5">
//                             <BellIcon className="w-6 h-6 text-white" />
//                             <img
//                                 src="/profile/Profile.png"
//                                 alt="Profile"
//                                 className="w-12 h-12 rounded-full object-cover"
//                             />
//                         </div>
//                     </div>
//                     <div className="mt-8 mb-12 w-full h-[1px] bg-gray-200/40" />
//                 </div>

//                 <div className=" w-full flex flex-col items-center px-4 pb-10">
//                     <div className=" w-full flex flex-col items-center px-4 pb-10">
//                         <div className="w-full max-w-[375px]  text-left space-y-6">
//                             <div>
//                                 <h2 className="text-lg font-semibold mb-1">Choose a New Password</h2>
//                             </div>

//                             {/* Current Password */}
//                             <div>
//                                 <label htmlFor="oldPassword" className="text-sm mb-2 block">Current Password</label>
//                                 <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
//                                     <div className="flex items-center bg-[#1f1f21] rounded-md px-4">
//                                         <input
//                                             type={showOldPassword ? "text" : "password"}
//                                             id="currentPassword"
//                                             placeholder="********"
//                                             className="w-full py-3 text-white outline-none placeholder-gray-400 bg-transparent"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowOldPassword(prev => !prev)}
//                                             className="ml-2"
//                                         >
//                                             {showOldPassword ? (
//                                                 <EyeIcon className="w-5 h-5 text-white opacity-70" />
//                                             ) : (
//                                                 <EyeSlashIcon className="w-5 h-5 text-white opacity-70" />
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* New Password */}
//                             <div>
//                                 <label htmlFor="newPassword" className="text-sm mb-2 block">New Password</label>
//                                 <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
//                                     <div className="flex items-center bg-[#1f1f21] rounded-md px-4">
//                                         <input
//                                             type={showNewPassword ? "text" : "password"}
//                                             id="newPassword"
//                                             placeholder="********"
//                                             className="w-full py-3 text-white outline-none placeholder-gray-400 bg-transparent"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowNewPassword(prev => !prev)}
//                                             className="ml-2"
//                                         >
//                                             {showNewPassword ? (
//                                                 <EyeIcon className="w-5 h-5 text-white opacity-70" />
//                                             ) : (
//                                                 <EyeSlashIcon className="w-5 h-5 text-white opacity-70" />
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Save Button */}
//                         <button className="w-full max-w-[340px] mt-72 md:mt-52 bg-gradient-to-r from-pink-500 to-teal-400 text-white py-3 rounded-lg font-semibold text-sm">
//                             Save
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChangePassword;



import { useState } from "react";
import {
    BellIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUserPassword } from "../api/updatePasswordApi";

const ChangePassword = () => {
    const location = useLocation();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);

    const submitChange = async () => {
        if (!oldPassword || !newPassword) {
            setMsg({ type: "err", text: "Please fill both fields." });
            return;
        }
        if (oldPassword === newPassword) {
            setMsg({ type: "err", text: "New password must be different." });
            return;
        }
        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Not logged in");
            const res = await updateUserPassword(oldPassword.trim(), newPassword.trim(), token);
            setMsg({ type: "ok", text: typeof res === "string" ? res : "Password updated" });
            setOldPassword("");
            setNewPassword("");
        } catch (e: any) {
            setMsg({ type: "err", text: e?.message || "Failed to update password" });
        } finally {
            setSaving(false);
            setTimeout(() => setMsg(null), 3000);
        }
    };

    const navigate = useNavigate();

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
            <div className="flex-1 pt-6 md:px-10 xl:px-14 2xl:px-20">
                {/* Mobile Header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">Change Password</h1>
                </div>
                {/* Desktop Header (optional) */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">Change Password</h1>
                        <div className="flex items-center gap-5">
                            <BellIcon className="w-6 h-6 text-white" />
                            <img
                                src="/profile/Profile.png"
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-8 mb-12 w-full h-[1px] bg-gray-200/40" />
                </div>

                <div className=" w-full flex flex-col items-center px-4 pb-10">
                    <div className=" w-full flex flex-col items-center px-4 pb-10">
                        <div className="w-full max-w-[375px]  text-left space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold mb-1">Choose a New Password</h2>
                            </div>

                            {/* Current Password */}
                            <div>
                                <label htmlFor="oldPassword" className="text-sm mb-2 block">Current Password</label>
                                <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                    <div className="flex items-center bg-[#1f1f21] rounded-md px-4">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            id="currentPassword"
                                            placeholder="********"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") submitChange(); }}
                                            className="w-full py-3 text-white outline-none placeholder-gray-400 bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowOldPassword(prev => !prev)}
                                            className="ml-2"
                                        >
                                            {showOldPassword ? (
                                                <EyeIcon className="w-5 h-5 text-white opacity-70" />
                                            ) : (
                                                <EyeSlashIcon className="w-5 h-5 text-white opacity-70" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label htmlFor="newPassword" className="text-sm mb-2 block">New Password</label>
                                <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                    <div className="flex items-center bg-[#1f1f21] rounded-md px-4">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            id="newPassword"
                                            placeholder="********"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") submitChange(); }}
                                            className="w-full py-3 text-white outline-none placeholder-gray-400 bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(prev => !prev)}
                                            className="ml-2"
                                        >
                                            {showNewPassword ? (
                                                <EyeIcon className="w-5 h-5 text-white opacity-70" />
                                            ) : (
                                                <EyeSlashIcon className="w-5 h-5 text-white opacity-70" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {msg && (
                            <div style={{ textTransform: 'capitalize' }} className={`mt-10 text-sm ${msg.type === "ok" ? "text-emerald-400" : "text-red-400"}`}>
                                {msg.text}
                            </div>
                        )}

                        {/* Save Button */}
                        <button
                            onClick={submitChange}
                            disabled={saving || !oldPassword || !newPassword}
                            className="w-full mt-20 md:mt-52 bg-gradient-to-r from-pink-500 to-teal-400 text-white py-3 rounded-lg font-semibold text-sm disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
