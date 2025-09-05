import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchArtistLibrary() {
    const token = localStorage.getItem("tf_admin_token");
    const res = await axios.get(`${API_URL}api/admin/artistlibrary`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return (res.data as any).artistlibrary;
}
