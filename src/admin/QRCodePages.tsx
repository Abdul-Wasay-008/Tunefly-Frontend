import {
    BellIcon,
    HomeIcon,
    ArrowLeftCircleIcon,
    MagnifyingGlassIcon,
    UserIcon,
    UserGroupIcon,
    QrCodeIcon,
    PowerIcon,
} from "@heroicons/react/24/outline";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ReactQRCode from "react-qr-code";
import LogoutModal from "./modals/LogoutModal";

type QrRow = {
    id: number;
    qrId: string;
    userId: string | null;
    driverName?: string | null; // ← from backend if you added it
    created_At?: string;
    updated_At?: string;
};

type Driver = {
    uuid: string;
    email: string;
    usertype?: string;
    UserDriverProfile?: {
        name?: string | null;
        username?: string | null;
        fullname?: string | null; // keep in case some rows use it
    } | null;
};

function pickDriverName(d: Driver): string {
    const p = d.UserDriverProfile;
    return (
        (p?.name && p.name.trim()) ||
        (p?.username && p.username.trim()) ||
        (p?.fullname && p.fullname.trim()) ||
        (d.email?.split("@")[0]) ||
        d.uuid.slice(0, 8)
    );
}

const QRCodesPage = () => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
    const token = localStorage.getItem("token") || "";

    // Codes
    const [codes, setCodes] = useState<QrRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // Drivers + name lookup
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [driverMap, setDriverMap] = useState<Record<string, string>>({}); // uuid -> display name

    // Create-to-DB FAB
    const [fabOpen, setFabOpen] = useState(false);
    const [qty, setQty] = useState(1);
    const [creating, setCreating] = useState(false);
    const incQty = () => setQty((q) => Math.min(999, (Number(q) || 1) + 1));
    const decQty = () => setQty((q) => Math.max(1, (Number(q) || 1) - 1));

    // Assign picker
    const [assignOpen, setAssignOpen] = useState(false);
    const [assignQrId, setAssignQrId] = useState<string | null>(null);
    const [selectedDriverId, setSelectedDriverId] = useState<string>("");
    const [actionId, setActionId] = useState<string | null>(null); // which QR is busy



    const loadCodes = useCallback(async () => {
        try {
            setLoading(true);
            setErr(null);
            const res = await fetch(`${BASE}/api/admin/qrcode`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to load QR codes");
            setCodes(Array.isArray(data.getQR) ? data.getQR : []);
        } catch (e: any) {
            setErr(e.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [BASE, token]);

    const loadDrivers = useCallback(async () => {
        try {
            const res = await fetch(`${BASE}/api/admin/alldriver`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to load drivers");

            const list: Driver[] = Array.isArray(data.alldrivers) ? data.alldrivers : [];
            setDrivers(list);

            const m: Record<string, string> = {};
            for (const d of list) m[d.uuid] = pickDriverName(d);
            setDriverMap(m);
        } catch (e) {
            console.error(e); // optional: surface in UI if you prefer
        }
    }, [BASE, token]);

    useEffect(() => {
        loadCodes();
        loadDrivers();
    }, [loadCodes, loadDrivers]);

    async function createQRCodesToDB() {
        try {
            if (!qty || qty < 1) return alert("Enter a valid quantity.");
            setCreating(true);
            const res = await fetch(`${BASE}/api/admin/qrcode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ number: qty }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to create QR codes");
            await loadCodes();
        } catch (e: any) {
            alert(e.message || "Something went wrong");
        } finally {
            setCreating(false);
            setFabOpen(false);
        }
    }

    async function confirmAssign() {
        if (!assignQrId || !selectedDriverId) return alert("Pick a driver first.");
        try {
            setActionId(assignQrId);
            const res = await fetch(`${BASE}/api/admin/qrcode/assign`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ qrId: assignQrId, userId: selectedDriverId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to assign QR");

            // Update just this QR locally
            const updated = data.qr as QrRow; // has driverName
            setCodes(prev =>
                prev.map(c => (c.qrId === updated.qrId
                    ? { ...c, userId: updated.userId, driverName: updated.driverName }
                    : c))
            );

            setAssignOpen(false);
            setAssignQrId(null);
        } catch (e: any) {
            alert(e.message || "Failed to assign QR");
        } finally {
            setActionId(null);
        }
    }

    const handleLogout = () => {

    };

    async function unassign(qrId: string) {
        try {
            const res = await fetch(`${BASE}/api/admin/qrcode/unassign`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ qrId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to unassign QR");

            const updated = data.qr as QrRow; // driverName should be null
            setCodes(prev =>
                prev.map(c => (c.qrId === updated.qrId
                    ? { ...c, userId: updated.userId, driverName: null }
                    : c))
            );
        } catch (e: any) {
            alert(e.message || "Failed to unassign QR");
        }
    }


    function handleStatusClick(row: QrRow) {
        const assigned = row.userId !== null && row.userId !== "null"; // keep "null" check until you migrate
        if (assigned) {
            // unassign flow
            if (confirm("Unassign this QR code from the driver?")) {
                setActionId(row.qrId);
                unassign(row.qrId).finally(() => setActionId(null));
            }
        } else {
            // assign flow
            setAssignQrId(row.qrId);
            setSelectedDriverId("");
            setAssignOpen(true);
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row text-white bg-cover bg-top md:bg-bottom bg-[url('/background/DashM.png')] md:bg-[url('/background/bg.png')]">
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

            {/* Main */}
            <div className="flex-1 px-4 py-6 lg:px-10 xl:px-14 2xl:px-20">
                {/* Mobile header */}
                <div className="relative mb-6 md:hidden">
                    <button className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ArrowLeftCircleIcon className="w-8 h-8 text-gray-400" onClick={() => navigate(-1)} />
                    </button>
                    <h1 className="text-[1.35rem] font-semibold text-white text-center mb-10">QR Codes</h1>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Desktop header */}
                {/* Desktop header only */}
                <div className="hidden md:block mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-white">QR Codes</h1>
                        <div className="flex items-center gap-5">
                            <BellIcon className="w-6 h-6 text-white" />
                            <img src="/profile/Profile.png" alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="mt-8 w-full h-[1px] bg-gray-200/40" />
                </div>

                {/* Grid — visible on ALL sizes */}
                <div className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
                    {codes.map((row) => {
                        const assigned = !!row.userId && row.userId !== "null";

                        return (
                            <div key={row.qrId} className="bg-[#0F0F0F] rounded-md overflow-hidden shadow-md">
                                <div className="flex items-center justify-center bg-gray-200">
                                    {/* make the QR responsive */}
                                    <div className="bg-white p-3 rounded max-w-[192px] w-full mx-auto">
                                        <ReactQRCode
                                            value={row.qrId}
                                            size={192}
                                            style={{ width: "100%", height: "auto", maxWidth: 192 }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-[#1B1B1B] px-3 py-3 flex flex-col items-center gap-2">
                                    {assigned ? (
                                        <button
                                            onClick={() => handleStatusClick(row)}
                                            disabled={actionId === row.qrId}
                                            title="Click to unassign"
                                            className={[
                                                "inline-flex items-center gap-2 px-4 py-[6px] rounded-2xl text-sm transition",
                                                "bg-[#0F0F0F] hover:bg-[#141414]",
                                                "text-teal-300 border border-teal-500/30 ring-1 ring-inset ring-teal-500/20",
                                                actionId === row.qrId ? "opacity-60 cursor-wait" : "",
                                            ].join(" ")}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                                            {actionId === row.qrId ? "Working…" : "Assigned"}
                                        </button>
                                    ) : (
                                        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-pink-500 to-teal-400">
                                            <button
                                                onClick={() => handleStatusClick(row)}
                                                disabled={actionId === row.qrId}
                                                title="Click to assign"
                                                className={[
                                                    "inline-flex items-center gap-2 px-4 py-[6px] rounded-2xl text-sm transition",
                                                    "bg-[#0F0F0F] hover:bg-[#121212] text-white",
                                                    "border border-transparent md:text-xs",
                                                    actionId === row.qrId ? "opacity-60 cursor-wait" : "",
                                                ].join(" ")}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                                {actionId === row.qrId ? "Working…" : "Not Assigned"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* FAB overlay (close) */}
            {fabOpen && (
                <button className="fixed inset-0 bg-transparent z-40" onClick={() => setFabOpen(false)} aria-hidden />
            )}

            {/* Generate-to-DB FAB */}
            <div className="fixed bottom-6 right-6 lg:right-11 xl:right-16 2xl:right-20 z-50">
                {!fabOpen ? (
                    <button
                        onClick={() => setFabOpen(true)}
                        className="rounded-xl px-5 py-3 shadow-lg bg-gradient-to-r from-pink-500 to-teal-400 text-white font-medium hover:brightness-110 active:scale-[0.98] transition"
                    >
                        Generate to DB
                    </button>
                ) : (
                    <div className="flex items-center gap-2 bg-[#111111]/90 backdrop-blur rounded-2xl p-3 shadow-2xl border border-white/10">
                        <div className="inline-flex items-center rounded-xl overflow-hidden bg-[#1F1F21] border border-white/10">
                            <button onClick={decQty} className="px-3 py-2 hover:bg-white/5 active:scale-[0.98] transition" aria-label="decrease">−</button>
                            <div className="px-4 py-2 text-sm min-w-10 text-center select-none">{qty}</div>
                            <button onClick={incQty} className="px-3 py-2 hover:bg-white/5 active:scale-[0.98] transition" aria-label="increase">+</button>
                        </div>
                        <button
                            onClick={createQRCodesToDB}
                            disabled={creating}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-teal-400 font-medium disabled:opacity-60"
                        >
                            {creating ? "Creating…" : "Add to DB"}
                        </button>
                        <button onClick={() => setFabOpen(false)} className="ml-1 px-2 py-1 rounded-lg hover:bg-white/5" aria-label="close" title="Close">✕</button>
                    </div>
                )}
            </div>

            {/* Assign modal */}
            {assignOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <button className="absolute inset-0 bg-black/40" onClick={() => setAssignOpen(false)} aria-hidden />
                    <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-[#161616] border border-white/10 p-5">
                        <h3 className="text-lg font-semibold mb-4">Assign QR to Driver</h3>
                        <label className="block text-sm mb-2 opacity-80">Select driver</label>
                        <select
                            value={selectedDriverId}
                            onChange={(e) => setSelectedDriverId(e.target.value)}
                            className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-3 py-2 focus:outline-none"
                        >
                            <option value="">— Choose a driver —</option>
                            {drivers.map((d) => (
                                <option key={d.uuid} value={d.uuid}>
                                    {driverMap[d.uuid] || d.email || d.uuid}
                                </option>
                            ))}
                        </select>

                        <div className="mt-5 flex justify-end gap-2">
                            <button onClick={() => setAssignOpen(false)} className="px-4 py-2 rounded-lg bg-[#2A2A2A] border border-white/10 hover:bg-[#333]">Cancel</button>
                            <button onClick={confirmAssign} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-teal-400 font-medium">Assign</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QRCodesPage;
