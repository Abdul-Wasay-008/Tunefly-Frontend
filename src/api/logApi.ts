import api from "./axios";
import { jwtDecode } from "jwt-decode";

export interface LogResponse {
    listenerlist: number[];    // [0, US, Canada, UK, China]
    songplayedlist: number[];  // [0, US, Canada, UK, China]
}

export const fetchLog = async (): Promise<LogResponse> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token");

    const { uuid: userId } = (jwtDecode(token) as any) || {};
    if (!userId) throw new Error("Invalid token: UUID missing");

    const label = `[fetchLog ${Date.now()}]`;
    console.group("[fetchLog]");
    console.time(label);
    console.log("➡️ GET params:", { userId });

    const res = await api.get<{ status: string; log: LogResponse }>(
        "/api/user/artist/log",
        { params: { userId }, headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Status:", res.status);
    console.log("📦 Raw body:", res.data);

    console.timeEnd(label);
    console.groupEnd();

    if (!res.data?.log) throw new Error("Unexpected response shape from /log");
    return res.data.log;
};
