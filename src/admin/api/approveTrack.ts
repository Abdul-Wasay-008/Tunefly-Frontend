import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function approveTrack(recordId: string, status: string, userId: string) {
    const token = localStorage.getItem("tf_admin_token");
    const res = await axios.post(
        `${API_URL}api/admin/approveartist`,
        {
            recordId,
            status,
            userId,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res.data;
}
