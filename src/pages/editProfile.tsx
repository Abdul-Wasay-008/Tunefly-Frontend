// import {
//     BellIcon,
//     SpeakerWaveIcon,
//     MusicalNoteIcon,
//     ChartBarSquareIcon,
//     Cog6ToothIcon,
//     QuestionMarkCircleIcon,
//     HomeIcon,
//     ArrowLeftCircleIcon,
//     PencilIcon,
//     UserIcon,
//     EnvelopeIcon,
//     PhoneIcon,
//     GlobeAltIcon,
// } from "@heroicons/react/24/outline";
// import { useLocation } from "react-router-dom";
// import countryList from 'react-select-country-list'
// import { useMemo, useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { getUserDetails } from "../api/getUserProfile";

// const EditProfile = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // profile fields
//     const [username, setUsername] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [email, setEmail] = useState("");
//     const list = useMemo(() => countryList(), []);
//     const countryOptions = useMemo(() => list.getData(), [list]);
//     const [selectedCountry, setSelectedCountry] = useState("");

//     // Helper: turn API value (code or name) into ISO code
//     const toIsoCode = (val?: string | null) => {
//         if (!val) return "";
//         const s = val.trim();

//         // If it's already a 2-letter code, normalize & verify it's valid
//         if (s.length === 2) {
//             const code = s.toUpperCase();
//             return countryOptions.some(o => o.value === code) ? code : "";
//         }

//         // Otherwise match by country name (case-insensitive)
//         const match = countryOptions.find(o => o.label.toLowerCase() === s.toLowerCase());
//         return match?.value ?? "";
//     };

//     //populating the input fields from the backend
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         getUserDetails(token)
//             .then((user: any) => {
//                 setUsername(user.username || "");
//                 setPhoneNumber(user.phoneNumber || "");
//                 setEmail(user.email || "");
//                 setSelectedCountry(toIsoCode(user.country));
//             })
//             .catch((err: any) => {
//                 console.error("Error fetching user details:", err);
//             });
//     }, [list]);

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
//                     <h1 className="text-[1.35rem] font-semibold text-white text-center">Edit Profile</h1>
//                 </div>

//                 {/* Desktop Header (optional) */}
//                 <div className="hidden md:block mb-6 mt-4">
//                     <div className="flex items-center justify-between">
//                         <h1 className="text-2xl font-semibold text-white">Campaigns</h1>
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

//                 <div className="w-full flex flex-col items-center px-4 pb-10">
//                     {/* Profile Image with Gradient Border + Pen Icon */}
//                     <div className="relative rounded-full w-24 h-24 mb-10">
//                         <img
//                             src="/profile/Profile.png"
//                             alt="User"
//                             className="w-full h-full rounded-full object-cover"
//                         />
//                         <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 p-[1px] bg-gradient-to-r from-pink-500 to-teal-400 rounded-full">
//                             <div className="bg-[#1f1f21] p-[6px] rounded-full">
//                                 <PencilIcon className="w-3 h-3 text-white" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Input Fields */}
//                     <div className="w-full max-w-[370px] space-y-6">
//                         {/* Username */}
//                         <div>
//                             <label className="block mb-1 text-sm text-gray-300">Username</label>
//                             <div className="flex items-center border-b border-white pb-2">
//                                 <UserIcon className="w-5 h-5 text-white opacity-70 mr-3" />
//                                 <input
//                                     type="text"
//                                     value={username}
//                                     style={{ textTransform: 'capitalize' }}
//                                     readOnly
//                                     className="bg-transparent text-white text-sm w-full focus:outline-none"
//                                 />
//                             </div>
//                         </div>

//                         {/* Email */}
//                         <div>
//                             <label className="block mb-1 text-sm text-gray-300">Email</label>
//                             <div className="flex items-center border-b border-white pb-2">
//                                 <EnvelopeIcon className="w-5 h-5 text-white opacity-70 mr-3" />
//                                 <input
//                                     type="text"
//                                     value={email}
//                                     readOnly
//                                     className="bg-transparent text-white text-sm w-full focus:outline-none"
//                                 />
//                             </div>
//                         </div>

//                         {/* Phone Number */}
//                         <div>
//                             <label className="block mb-1 text-sm text-gray-300">Phone Number</label>
//                             <div className="flex items-center border-b border-white pb-2">
//                                 <PhoneIcon className="w-5 h-5 text-white opacity-70 mr-3" />
//                                 <input
//                                     type="text"
//                                     value={phoneNumber}
//                                     readOnly
//                                     className="bg-transparent text-white text-sm w-full focus:outline-none"
//                                 />
//                             </div>
//                         </div>

//                         {/* Country (disabled select) */}
//                         <div>
//                             <label className="block mb-1 text-sm text-gray-300">Country</label>
//                             <div className="flex items-center border-b border-white pb-2">
//                                 <GlobeAltIcon className="w-5 h-5 text-white opacity-70 mr-3" />
//                                 <select
//                                     value={selectedCountry}     // ISO code (e.g., "PK")
//                                     disabled                     // read-only equivalent for select
//                                     className="bg-transparent text-white text-sm w-full focus:outline-none appearance-none disabled:opacity-80"
//                                 >
//                                     <option value="" className="text-black">Select Country</option>
//                                     {countryOptions.map((c) => (
//                                         <option key={c.value} value={c.value} className="text-black">
//                                             {c.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Save Button */}
//                     <button className="w-full max-w-[340px] mt-52 md:mt-28 bg-gradient-to-r from-pink-500 to-teal-400 text-white py-3 rounded-lg font-semibold text-sm">
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProfile;


import {
    BellIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    PencilIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import countryList from 'react-select-country-list'
import { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserDetails } from "../api/getUserProfile";
import { uploadAvatar } from "../api/uploadAvatarApi";
import { jwtDecode } from "jwt-decode";


const EditProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // profile fields
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const list = useMemo(() => countryList(), []);
    const countryOptions = useMemo(() => list.getData(), [list]);
    const [selectedCountry, setSelectedCountry] = useState("");

    // avatar (mobile)
    const [avatar, setAvatar] = useState("/profile/Profile.png");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);

    //Avatar mounting logic
    useEffect(() => {
        const token = localStorage.getItem("token");
        const filename = localStorage.getItem("avatar");
        if (token && filename) {
            const decoded: any = jwtDecode(token);
            const userId = decoded.uuid;
            const fullUrl = `${import.meta.env.VITE_API_BASE_URL}public/avatar/${userId}/${filename}`;
            setAvatar(fullUrl);
        }
    }, []);

    //File system triggering logic with auto-upload
    const openPicker = () => fileInputRef.current?.click();

    const handleMobileFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // optimistic preview
        const previewUrl = URL.createObjectURL(file);
        setAvatar(previewUrl);

        try {
            setUploading(true);
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Not logged in");

            const res = await uploadAvatar(file, token);
            // backend returns { uploadavatar: { avatar: "<filename>" } }
            const filename = res.uploadavatar.avatar;
            localStorage.setItem("avatar", filename);

            // rebuild CDN/public URL using userId
            const decoded: any = jwtDecode(token);
            const userId = decoded.uuid;
            const fullUrl = `${import.meta.env.VITE_API_BASE_URL}public/avatar/${userId}/${filename}`;
            setAvatar(fullUrl);
        } catch (err: any) {
            console.error("Mobile upload failed:", err?.response?.data?.message || err.message);
            // revert preview on failure (optional)
            const fallback = "/profile/Profile.png";
            setAvatar(fallback);
        } finally {
            setUploading(false);
            // clear input so selecting same file again still triggers change
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Helper: turn API value (code or name) into ISO code
    const toIsoCode = (val?: string | null) => {
        if (!val) return "";
        const s = val.trim();

        // If it's already a 2-letter code, normalize & verify it's valid
        if (s.length === 2) {
            const code = s.toUpperCase();
            return countryOptions.some(o => o.value === code) ? code : "";
        }

        // Otherwise match by country name (case-insensitive)
        const match = countryOptions.find(o => o.label.toLowerCase() === s.toLowerCase());
        return match?.value ?? "";
    };

    //populating the input fields from the backend
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        getUserDetails(token)
            .then((user: any) => {
                setUsername(user.username || "");
                setPhoneNumber(user.phoneNumber || "");
                setEmail(user.email || "");
                setSelectedCountry(toIsoCode(user.country));
            })
            .catch((err: any) => {
                console.error("Error fetching user details:", err);
            });
    }, [list]);

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
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">Edit Profile</h1>
                </div>

                {/* Desktop Header (optional) */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">Campaigns</h1>
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

                <div className="w-full flex flex-col items-center px-4 pb-10">
                    {/* Profile Image with Gradient Border + Pen Icon (Mobile) */}
                    <div className="relative rounded-full w-24 h-24 mb-10 p-[1px] bg-gradient-to-r from-pink-500 to-teal-400">
                        <img
                            src={avatar}
                            onError={(e) => (e.currentTarget.src = "/profile/Profile.png")}
                            alt="User"
                            className="w-full h-full rounded-full object-cover"
                        />

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMobileFileChange}
                        />

                        {/* Pen button */}
                        <button
                            type="button"
                            onClick={openPicker}
                            disabled={uploading}
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-[1px] bg-gradient-to-r from-pink-500 to-teal-400 rounded-full disabled:opacity-60"
                            aria-label="Change profile picture"
                        >
                            <span className="bg-[#1f1f21] p-[6px] rounded-full flex items-center justify-center">
                                <PencilIcon className={`w-3 h-3 text-white ${uploading ? "animate-pulse" : ""}`} />
                            </span>
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="w-full max-w-[370px] space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Username</label>
                            <div className="flex items-center border-b border-white pb-2">
                                <UserIcon className="w-5 h-5 text-white opacity-70 mr-3" />
                                <input
                                    type="text"
                                    value={username}
                                    style={{ textTransform: 'capitalize' }}
                                    readOnly
                                    className="bg-transparent text-white text-sm w-full focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Email</label>
                            <div className="flex items-center border-b border-white pb-2">
                                <EnvelopeIcon className="w-5 h-5 text-white opacity-70 mr-3" />
                                <input
                                    type="text"
                                    value={email}
                                    readOnly
                                    className="bg-transparent text-white text-sm w-full focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Phone Number</label>
                            <div className="flex items-center border-b border-white pb-2">
                                <PhoneIcon className="w-5 h-5 text-white opacity-70 mr-3" />
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    readOnly
                                    className="bg-transparent text-white text-sm w-full focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Country (disabled select) */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Country</label>
                            <div className="flex items-center border-b border-white pb-2">
                                <GlobeAltIcon className="w-5 h-5 text-white opacity-70 mr-3" />
                                <select
                                    value={selectedCountry}     // ISO code (e.g., "PK")
                                    disabled                     // read-only equivalent for select
                                    className="bg-transparent text-white text-sm w-full focus:outline-none appearance-none disabled:opacity-80"
                                >
                                    <option value="" className="text-black">Select Country</option>
                                    {countryOptions.map((c) => (
                                        <option key={c.value} value={c.value} className="text-black">
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button className="w-full max-w-[340px] mt-52 md:mt-28 bg-gradient-to-r from-pink-500 to-teal-400 text-white py-3 rounded-lg font-semibold text-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;