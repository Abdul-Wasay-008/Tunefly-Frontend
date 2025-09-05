import axios from "axios";

export interface AdminLogs {
    totaldriver: number;
    totalartist: number;
    totalsong: number;
    totalEarning: number;
}

export async function fetchAdminLogs(): Promise<AdminLogs> {
    const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
    const token = localStorage.getItem("tf_admin_token");

    if (!token) throw new Error("No admin token found");

    const { data } = await axios.get<{ status: string; logs: AdminLogs }>(
        `${BASE}/api/admin/logs`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }
    );

    return data.logs;
}
