import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function approveArtist(toId: string, status: boolean) {
    const token = localStorage.getItem("tf_admin_token");
    console.log("approveArtist sending:", { toId, status });


    const res = await axios.post(
        `${API_URL}api/admin/changestatus`,
        {
            toId,   // <-- backend expects this
            status, // should be true/false (boolean)
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}
