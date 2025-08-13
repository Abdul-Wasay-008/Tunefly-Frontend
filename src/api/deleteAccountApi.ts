import api from "./axios";
import { jwtDecode } from "jwt-decode";

// Server returns either:
// { status: "success", user: "Delete Account successfully!" }  (201)
// or on error it will throw a non-2xx with { message: string }
type DeleteAccountSuccess = { status?: string; user: string };
type DeleteAccountError = { message: string };
type DeleteAccountEnvelope = DeleteAccountSuccess | DeleteAccountError | string;

export const deleteAccount = async (): Promise<string> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No auth token");

    const { uuid: userId } = (jwtDecode(token) as any) || {};
    if (!userId) throw new Error("Invalid token: UUID missing");

    const label = "[deleteAccount]";
    console.group(label);
    console.time(label);
    console.log("➡️ POST /api/user/deleteaccount", { userId });

    try {
        const res = await api.post<DeleteAccountEnvelope>(
            "/api/auth/deleteaccount",
            { userId },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅", res.status, res.data);

        const body = res.data;

        if (typeof body === "string") {
            return body; // e.g. plain success string
        }

        if ("message" in body && typeof body.message === "string") {
            // unlikely on 2xx, but keep for completeness
            throw new Error(body.message);
        }

        if ("user" in body && typeof body.user === "string") {
            return body.user; // "Delete Account successfully!"
        }

        if ("status" in body && typeof body.status === "string") {
            return body.status; // fallback
        }

        return "Account deleted";
    } catch (err: any) {
        const status = err?.response?.status;
        const body = err?.response?.data;
        console.error("❌", status, body);

        // normalize error message
        const msg =
            (body && typeof body === "object" && "message" in body && (body as any).message) ||
            (typeof body === "string" ? body : undefined) ||
            err?.message ||
            "Delete failed";
        throw new Error(msg);
    } finally {
        console.timeEnd(label);
        console.groupEnd();
    }
};
