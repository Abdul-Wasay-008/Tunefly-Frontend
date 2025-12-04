import api from "./axios";
import { jwtDecode } from "jwt-decode";

export interface DashboardResponse {
    impressions: number;
    listener: number;
    totalArtistLibrary: number;
    monthlistener: number;
}

// Server responds: { status: "success", dashboard: DashboardResponse }
type ServerEnvelope = { status: string; dashboard: DashboardResponse };

export const fetchDashboard = async (): Promise<DashboardResponse> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token");

    const { uuid: userId } = (jwtDecode(token) as any) || {};
    if (!userId) throw new Error("Invalid token: UUID missing");

    const label = "[fetchDashboard]";
    console.group(label);
    console.time(`${label} time`);
    console.log("➡️ Request (GET) params:", { userId });

    try {
        const res = await api.get<ServerEnvelope>("/api/user/artist/dashboard", {
            // params: { userId },                          // <-- query string ?userId=...
            headers: { Authorization: `Bearer ${token}` } // <-- include if your api instance doesn't
        });

        console.log("✅ Status:", res.status);          // likely 201 from your controller
        console.log("📦 Body:", res.data);

        return res.data.dashboard;                      // <-- unwrap the payload
    } catch (err: any) {
        console.error("❌ Request failed");
        console.error("Status:", err?.response?.status);
        console.error("URL:", err?.config?.url);
        console.error("Response:", err?.response?.data);
        throw err;
    } finally {
        console.timeEnd(`${label} time`);
        console.groupEnd();
    }
};
