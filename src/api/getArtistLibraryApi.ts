import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface Campaign {
    id: string;
    userId: string;
    artistname: string;
    songname: string;
    genre: string;
    country: string;
    coverart: string;
    media: string;
    subscription: boolean;
    budgetplan: string;
    budgetamount: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    // Add other fields as needed
}

interface ArtistLibraryResponse {
    status: string;
    artistlibrary: Campaign[];
}

export const getArtistLibrary = async (token: string): Promise<Campaign[]> => {
    const userId = jwtDecode<{ uuid: string }>(token).uuid;

    const response = await axios.get<ArtistLibraryResponse>(
        `${import.meta.env.VITE_API_BASE_URL}api/user/artist/artistlibrary?userId=${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.artistlibrary;
};
