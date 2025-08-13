import api from "./axios";
import { jwtDecode } from "jwt-decode";

export interface SongPlayedResponse {
    songplayed: number;
    listener: number;
    scanned: number;
    monthlistener: number;
}

type ServerEnvelope =
    | SongPlayedResponse
    | { status: string; data: SongPlayedResponse }
    | { status: string; songplayed: SongPlayedResponse }; // in case BE wraps differently

export const fetchSongPlayed = async (): Promise<SongPlayedResponse> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token");

    const { uuid: userId } = (jwtDecode(token) as any) || {};
    if (!userId) throw new Error("Invalid token: UUID missing");

    const base = "[fetchSongPlayed]";
    const label = `${base} ${Date.now()}`;
    console.group(base);
    console.time(label);
    console.log("➡️ GET params:", { userId });

    try {
        const res = await api.get<ServerEnvelope>("/api/user/artist/songplayed", {
            params: { userId },
            headers: { Authorization: `Bearer ${token}` }, // keep if api instance doesn't auto-add it
        });

        console.log("✅ Status:", res.status);
        console.log("📦 Body:", res.data);

        // Unwrap common shapes safely
        const body: any = res.data;
        const payload: SongPlayedResponse =
            (body && typeof body.songplayed === "number" && body) ||
            body?.data ||
            body?.songplayed;

        if (!payload || typeof payload.songplayed !== "number") {
            throw new Error("Unexpected response shape from /songplayed");
        }

        return payload;
    } catch (err: any) {
        console.error("❌ Request failed");
        console.error("Status:", err?.response?.status);
        console.error("URL:", err?.config?.url);
        console.error("Response:", err?.response?.data);
        throw err;
    } finally {
        console.timeEnd(label);
        console.groupEnd();
    }
};