import axios from "axios";

export interface ArtistUser {
    uuid: string;
    email: string;
    usertype?: string; // "artist"
    name?: string;
    username?: string;
    UserArtistProfile?: {
        full_name?: string;
        country?: string;
        username?: string;
        avatar?: string;
        [k: string]: any;
    } | null;
    // whatever getdashBoardData() returns for this user
    logs?: Record<string, any> | null;
    [k: string]: any;
}

export async function fetchAllArtists(): Promise<ArtistUser[]> {
    const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
    const token = localStorage.getItem("tf_admin_token");
    if (!token) throw new Error("No admin token found");

    const { data } = await axios.get<{ status: string; allartists: ArtistUser[] }>(
        `${BASE}/api/admin/allartist`,
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        }
    );

    return data.allartists || [];
}
