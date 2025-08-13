import axios from "axios";
import { jwtDecode } from "jwt-decode";

export type UpdatePasswordResponse = { message?: string; status?: string } | string;

export const updateUserPassword = async (
    currentPassword: string,
    newPassword: string,
    token: string
): Promise<string> => {
    if (!token) throw new Error("No auth token");

    const decoded: any = jwtDecode(token);
    const userId = decoded?.uuid;
    if (!userId) throw new Error("Invalid token: UUID missing");

    const url = `${import.meta.env.VITE_API_BASE_URL}api/user/update/password`;

    try {
        const { data } = await axios.post<UpdatePasswordResponse>(
            url,
            {
                userId,
                oldpassword: currentPassword,
                newpassword: newPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // normalize backend responses ("update password successfull" or {message: "..."} )
        return typeof data === "string"
            ? data
            : data?.message || data?.status || "Password updated";
    } catch (err: any) {
        const data = err?.response?.data;
        const msg =
            data?.message ??
            (typeof data === "string" ? data : undefined) ??
            err?.message;
        throw new Error(msg || "Failed to update password");
    }
};
