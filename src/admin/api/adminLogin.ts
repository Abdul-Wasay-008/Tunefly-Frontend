import axios from "axios";

export interface AdminUser {
    uuid: string;
    email: string;
    usertype?: string;
    role?: string;
    verify_email?: boolean;
    [k: string]: any;
}
export interface AdminLoginResult {
    user: AdminUser;
    token: string;
}

// According to the backend 
type ServerShapeA = { status?: string; user: { user: AdminUser; token: string } };
type ServerShapeB = { status?: string; user: AdminUser; token: string };

const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export async function adminLogin(
    email: string,
    password: string
): Promise<AdminLoginResult> {
    const { data } = await axios.post<ServerShapeA | ServerShapeB>(
        `${BASE}/api/auth/login`,
        { email, password, usertype: "admin" },
        { withCredentials: true }
    );

    // Normalize response
    let user: AdminUser | undefined;
    let token: string | undefined;

    if ("token" in data && "user" in data) {
        // Shape B
        token = (data as ServerShapeB).token;
        user = (data as ServerShapeB).user;
    } else if ("user" in data && "user" in (data as ServerShapeA).user) {
        // Shape A
        token = (data as ServerShapeA).user.token;
        user = (data as ServerShapeA).user.user;
    }

    if (!token || !user) {
        console.warn("Unexpected admin login response:", data);
        throw new Error("Malformed login response");
    }

    // Accept either marker
    const isAdmin = user.usertype === "admin" || user.role === "admin";
    if (!isAdmin) throw new Error("Not an admin account");

    return { user, token };
}
