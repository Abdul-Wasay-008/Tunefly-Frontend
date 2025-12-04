import axios from "axios";

export interface DriverUser {
    uuid: string;
    email: string;
    username?: string;
    name?: string;
    usertype?: string; // should be "driver"
    UserDriverProfile?: {
        full_name?: string;
        username?: string;
        avatar?: string;
        [k: string]: any;
    } | null;
    license?: any; // backend returns driveruserlicense row (shape not strictly typed)
    qrcode?: any;  // backend returns qrcode row (shape not strictly typed)
    [k: string]: any;
}

export async function fetchAllDrivers(): Promise<DriverUser[]> {
    const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
    const token = localStorage.getItem("tf_admin_token");
    if (!token) throw new Error("No admin token found");

    const { data } = await axios.get<{ status: string; alldrivers: DriverUser[] }>(
        `${BASE}/api/admin/alldriver`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return data.alldrivers || [];
}
