import {
    BellIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    MagnifyingGlassIcon,
    ChevronRightIcon,
    UserIcon,
    UserGroupIcon,
    QrCodeIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LogoutModal from "./modals/LogoutModal";
import { useEffect, useMemo, useState } from "react";
import { fetchAllArtists } from "./api/adminArtists";
import { approveArtist } from "./api/approveArtists";

type ArtistRow = {
    uuid: string;
    userId: string;
    name: string;
    email: string;
    country: string;
    statusLabel: "Approved" | "Pending" | "Rejected" | "—";
};


const ArtistProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const [artists, setArtists] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const list = await fetchAllArtists();
                setArtists(list);
            } catch (e: any) {
                console.error("Fetch artists failed:", e?.response ?? e);
                setErr("Failed to load artists");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Safely derive fields from UserArtistProfile + logs
    const rows: ArtistRow[] = useMemo(() => {
        return artists.map((a) => {
            const name =
                a?.UserArtistProfile?.name ||
                a?.UserArtistProfile?.username ||
                a?.name ||
                "—";

            const country =
                a?.UserArtistProfile?.country ||
                a?.country ||
                "—";

            const approved = a?.UserArtistProfile?.approvel;

            let status: ArtistRow["statusLabel"] = "—";
            if (approved === true) status = "Approved";
            else if (approved === false) status = "Pending";

            return {
                uuid: a?.uuid,
                userId: a?.UserArtistProfile?.userId,  // <- instead of a?.id
                name,
                email: a?.email ?? "—",
                country,
                statusLabel: status,
            };
        });
    }, [artists]);

    const handleLogout = () => {
        localStorage.removeItem("tf_admin_token");
        localStorage.removeItem("tf_admin_user");
        navigate("/admin/login");
    };

    return (
        <div
            className="
        min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom
        bg-[url('/background/DashM.png')] md:bg-[url('/background/bg.png')]
      "
        >
            {/* Sidebar (Desktop Only) */}
            <aside className="hidden md:flex flex-col justify-between h-screen w-64 bg-[#111111] p-6">
                <div>
                    <img
                        src="/assets/logo.svg"
                        alt="Tunefly Logo"
                        className="w-20 lg:w-24 mx-auto mb-12"
                    />

                    <ul className="text-white text-base font-medium space-y-4">
                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
              ${location.pathname === "/admin/dashboard" ? "bg-[#1F1F21] text-white" : "hover:bg-[#1F1F21]/50"}`}
                        >
                            {location.pathname === "/admin/dashboard" && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <HomeIcon className="w-5 h-5" />
                            <Link to="/admin/dashboard">Home</Link>
                        </li>

                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
              ${location.pathname === "/admin/driverProfile" ? "bg-[#1F1F21] text-white" : "hover:bg-[#1F1F21]/50"}`}
                        >
                            {location.pathname === "/admin/driverProfile" && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <UserIcon className="w-5 h-5" />
                            <Link to="/admin/driverProfile">Driver Profiles</Link>
                        </li>

                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
              ${location.pathname === "/admin/artistProfile" ? "bg-[#1F1F21] text-white" : "hover:bg-[#1F1F21]/50"}`}
                        >
                            {location.pathname === "/admin/artistProfile" && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-400 rounded-r"></span>
                            )}
                            <UserGroupIcon className="w-5 h-5" />
                            <Link to="/admin/artistProfile">Artist Profiles</Link>
                        </li>

                        <li
                            className={`relative flex items-center gap-3 px-4 py-2 rounded-r-full transition-all duration-300 cursor-pointer
              ${location.pathname === "/admin/noQR" ? "bg-[#1F1F21] text-white" : "hover:bg-[#1F1F21]/50"}`}
                        >
                            {location.pathname === "/admin/noQR" && (
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

                    <LogoutModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onConfirm={handleLogout}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 py-6 md:px-10 xl:px-14 2xl:px-20">
                {/* Desktop Header */}
                <div className="hidden md:block mb-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">Artist Profiles</h1>
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

                {/* Mobile Header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center mb-10">
                        Artist Profiles
                    </h1>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Loading / Error */}
                {loading && <div className="px-5 md:px-0 text-gray-300">Loading artists…</div>}
                {err && !loading && <div className="px-5 md:px-0 text-red-500">{err}</div>}

                {!loading && !err && (
                    <>
                        {/* Mobile cards */}
                        {/* Mobile cards */}
                        <div className="px-5 md:px-0 space-y-4 lg:hidden">
                            {rows.map((r, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg p-[1px] bg-gradient-to-r from-pink-400 to-teal-400"
                                >
                                    <div className="bg-[#1f1f21] rounded-lg p-4 flex items-center justify-between gap-4">
                                        {/* Left side: image + info */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src="/assets/ArtistProfile.svg"
                                                alt="Artist"
                                                className="w-20 h-24 rounded-md object-cover"
                                            />
                                            <div>
                                                <h3 className="text-xl mb-2 font-semibold">{r.name}</h3>
                                                <p className="text-base mb-2 text-gray-300">{r.email}</p>
                                                <p className="text-base text-gray-500">{r.country}</p>
                                            </div>
                                        </div>

                                        {/* Right side: approve / status + chevron */}
                                        <div className="flex flex-col justify-between items-end h-24">
                                            {r.statusLabel === "Approved" ? (
                                                <span className="text-green-400 text-sm font-semibold">
                                                    Approved
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            await approveArtist(r.userId, true); // approve API
                                                            const list = await fetchAllArtists();
                                                            setArtists(list);
                                                        } catch (e) {
                                                            console.error("Approval failed:", e);
                                                        }
                                                    }}
                                                    className="text-green-400 hover:text-green-300 cursor-pointer"
                                                    title="Approve artist"
                                                >
                                                    ✓
                                                </button>
                                            )}

                                            <Link to="/admin/ArtistAccount">
                                                <ChevronRightIcon className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {rows.length === 0 && (
                                <div className="text-gray-400">No artists found.</div>
                            )}
                        </div>

                        {/* Desktop table */}
                        <div className="hidden lg:block mt-8">
                            <div className="bg-gradient-to-r from-pink-500 to-teal-400 p-[1px] rounded-md">
                                <div className="overflow-x-auto rounded-md">
                                    <table className="min-w-full text-left text-sm text-white">
                                        <thead className="bg-[#c0c0c0] text-black text-xs">
                                            <tr>
                                                <th className="px-6 py-4">Sr No.</th>
                                                <th className="px-6 py-4">Artist Name</th>
                                                <th className="px-6 py-4">Email</th>
                                                <th className="px-6 py-4">Country</th>
                                                <th className="px-6 py-4">Track Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gradient-to-b from-[#111112] to-[#1A1A1B]">
                                            {rows.map((r, idx) => (
                                                <tr key={idx} className="border-t border-gray-700">
                                                    <td className="px-6 py-4">{idx + 1}</td>
                                                    <td className="px-6 py-4">{r.name}</td>
                                                    <td className="px-6 py-4">{r.email}</td>
                                                    <td className="px-6 py-4">{r.country}</td>
                                                    <td className="px-6 py-2">
                                                        {r.statusLabel === "Approved" ? (
                                                            <span className="...">Approved</span>
                                                        ) : (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={async () => {
                                                                        try {
                                                                            await approveArtist(r.userId, true); // approve
                                                                            const list = await fetchAllArtists();
                                                                            setArtists(list);
                                                                        } catch (e) {
                                                                            console.error("Approval failed:", e);
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
                                            {rows.length === 0 && (
                                                <tr>
                                                    <td className="px-6 py-6 text-gray-400" colSpan={5}>
                                                        No artists found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArtistProfile;
