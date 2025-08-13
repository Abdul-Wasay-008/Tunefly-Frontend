import { useMemo, useState, useEffect } from "react";
import {
    BellIcon,
    SpeakerWaveIcon,
    MusicalNoteIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    CloudArrowUpIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    PhotoIcon
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";
import { createCampaign } from "../api/createCampaignApi";
import { jwtDecode } from "jwt-decode";

const CreateCampaigns = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const countryOptions = useMemo(() => countryList().getData(), []);
    const [countryOpen, setCountryOpen] = useState(false);
    const [gnereOpen, setGenreOpen] = useState(false);
    const [artistName, setArtistName] = useState("");
    const [songName, setSongName] = useState("");
    const [genre, setGenre] = useState("");
    const [targetedCountry, setTargetedCountry] = useState("");
    const [coverArt, setCoverArt] = useState<File | null>(null);
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [ownRights, setOwnRights] = useState(false);

    //Token
    const token = localStorage.getItem("token") || "";
    const decoded: any = token ? jwtDecode(token) : null;
    const userId = decoded?.uuid || "";

    const handleSubmit = async () => {
        if (!artistName || !songName || !genre || !targetedCountry || !coverArt || !mediaFile) {
            alert("Please fill all fields and upload the files.");
            return;
        }

        try {
            await createCampaign({
                userId,
                artistname: artistName,
                songname: songName,
                genre,
                country: targetedCountry,
                cover: coverArt,
                media: mediaFile,
                budgetplan: "Starter",         // static for now
                budgetamount: "100",           // static for now
                startDateTime: new Date().toISOString(),
                endDateTime: new Date(Date.now() + 7 * 86400000).toISOString(),
                token,
            });

            alert("Campaign created successfully ✅");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert("Something went wrong while creating campaign ❌");
        }
    };

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
            <div className="flex-1 py-6 md:px-10 xl:px-14 2xl:px-20">

                {/* Desktop Header */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">New Campaigns</h1>
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
                    <div className="mt-8 mb-10 w-full h-[1px] bg-gray-200/40" />
                </div>

                <div className="font-bold text-center text-xl hidden md:block">Create a New Campaign</div>

                {/* Mobile Header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center">Create a Campaign</h1>
                </div>

                {/* Mobile Form */}
                <div className=" flex justify-center mt-10 px-6 md:px-0">
                    <div className="w-full max-w-full grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6">

                        {/* Artist/Band Name */}
                        <div className="flex flex-col">
                            <label htmlFor="artistName" className="text-white text-sm mb-2">Artist/Band Name</label>
                            <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                <input
                                    type="text"
                                    id="artistName"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                    placeholder="e.g. Taylor Swift"
                                    className="w-full bg-[#1f1f21] bg-opacity-100 text-white placeholder-gray-400 placeholder:text-xs placeholder-3 px-4 py-3 rounded-md outline-none"
                                />
                            </div>
                        </div>

                        {/* Song Name */}
                        <div className="flex flex-col">
                            <label htmlFor="songName" className="text-white text-sm mb-2">Song Name</label>
                            <div className="p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                <input
                                    type="text"
                                    id="songName"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                    placeholder="e.g. Cruel Summer"
                                    className="w-full bg-[#1f1f21] bg-opacity-100 text-white placeholder-gray-400 placeholder:text-xs px-4 py-3 rounded-md outline-none"
                                />
                            </div>
                        </div>

                        {/* Genre Dropdown */}
                        <div className="flex flex-col">
                            <label htmlFor="genre" className="text-white text-sm mb-2">Genre</label>
                            <div className="relative p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                <select
                                    id="genre"
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="w-full bg-[#1f1f21] bg-opacity-100 text-white text-sm px-4 py-3 pr-10 rounded-md outline-none appearance-none cursor-pointer"
                                    defaultValue=""
                                    onFocus={() => setGenreOpen(true)}
                                    onBlur={() => setGenreOpen(false)}
                                >
                                    <option value="" disabled hidden>e.g. Pop</option>

                                    {[
                                        "Pop", "Rock", "Hip-Hop", "R&B", "Jazz", "Electronic", "Classical", "Reggae", "Blues",
                                        "Country", "Metal", "Folk", "Soul", "Funk", "Lo-fi", "Trap", "Techno", "House", "Dubstep",
                                        "Ambient", "Trance", "Drum & Bass", "K-Pop", "J-Pop", "Latin", "Afrobeats", "Dancehall",
                                        "Disco", "Indie", "Opera", "Gospel", "Punk", "Alternative", "Grunge", "Synthpop",
                                        "EDM", "Chillout", "Acoustic", "Instrumental", "Soundtrack", "World"
                                    ].map((genre) => (
                                        <option key={genre} value={genre.toLowerCase()} className="bg-black">
                                            {genre}
                                        </option>
                                    ))}
                                </select>

                                {/* chevron */}
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    {gnereOpen
                                        ? <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                                        : <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Country Dropdown */}
                        <div className="flex flex-col active:cursor-pointer">
                            <label htmlFor="country" className="text-white text-sm mb-2">Targeted Country</label>
                            <div className="relative p-[1px] rounded-md bg-gradient-to-r from-pink-500 to-teal-400">
                                <select
                                    id="country"
                                    value={targetedCountry}
                                    onChange={(e) => setTargetedCountry(e.target.value)}
                                    onFocus={() => setCountryOpen(true)}
                                    onBlur={() => setCountryOpen(false)}
                                    className="w-full px-4 py-3 rounded-md bg-[#1f1f21] text-white text-sm outline-none appearance-none pr-8 cursor-pointer"
                                >
                                    <option value="" disabled>Choose your country</option>
                                    {countryOptions.map(c => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>

                                {/* chevron */}
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    {countryOpen
                                        ? <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                                        : <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Upload Cover Art */}
                        <div className="flex flex-col lg:col-span-2">
                            <label className="text-white text-sm mb-2">Upload Campaign Image</label>
                            <div className="p-[1px] rounded-lg bg-gradient-to-r from-pink-500 to-teal-400">
                                <div className="rounded-lg bg-black bg-opacity-80 px-4 py-6 flex flex-col items-center justify-center text-white text-sm text-center">

                                    <PhotoIcon className="h-12 w-12 text-white mb-3" />
                                    <p className="font-semibold">Select image to upload</p>
                                    <p className="text-xs text-gray-300 mt-1 mb-4">
                                        Supported Format: JPG, JPEG, PNG
                                    </p>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        id="coverUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setCoverArt(file);
                                            }
                                        }}
                                    />

                                    {/* Styled label as button */}
                                    <label
                                        htmlFor="coverUpload"
                                        className="text-sm bg-white text-black px-4 py-[6px] rounded-full font-medium cursor-pointer"
                                    >
                                        Select File
                                    </label>

                                    {/* Optional preview */}
                                    {coverArt && (
                                        <p className="text-xs text-green-400 mt-2">
                                            Selected: {coverArt.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>


                        {/* Upload Track */}
                        <div className="flex flex-col lg:col-span-2">
                            <label className="text-white text-sm mb-2">Upload Track</label>
                            <div className="p-[1px] rounded-lg bg-gradient-to-r from-pink-500 to-teal-400">
                                <div className="rounded-lg bg-black bg-opacity-80 px-4 py-6 flex flex-col items-center justify-center text-white text-sm text-center">

                                    <CloudArrowUpIcon className="h-12 w-12 text-white mb-3" />
                                    <p className="font-semibold">Select song to upload</p>
                                    <p className="text-xs text-gray-300 mt-1 mb-4">
                                        Supported Format: MP3, WAV, AAC
                                    </p>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        id="trackUpload"
                                        accept=".mp3,.wav,.aac"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setMediaFile(file);
                                            }
                                        }}
                                    />

                                    {/* Styled label as file select trigger */}
                                    <label
                                        htmlFor="trackUpload"
                                        className="text-sm bg-white text-black px-4 py-[6px] rounded-full font-medium cursor-pointer"
                                    >
                                        Select File
                                    </label>

                                    {/* Optional file name preview */}
                                    {mediaFile && (
                                        <p className="text-xs text-green-400 mt-2">
                                            Selected: {mediaFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Rights Checkbox */}
                        <div className="flex items-center gap-2 text-sm text-white">
                            <input
                                type="checkbox"
                                id="rights"
                                checked={ownRights}
                                onChange={(e) => setOwnRights(e.target.checked)}
                                className="accent-pink-500"
                            />
                            <label htmlFor="rights">Own full rights to this song</label>
                        </div>

                        {/* Create Campaign Button */}
                        <div className="w-full flex justify-center md:justify-end">
                            <button className="hidden md:block text-xs mr-8">Cancel</button>
                            <button
                                onClick={handleSubmit}
                                className="w-full md:rounded-md md:text-xs md:w-40 bg-gradient-to-r from-pink-500 to-teal-400 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md transition-all hover:brightness-110">

                                Create Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaigns;