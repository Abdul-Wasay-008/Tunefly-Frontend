import axios from "axios";

export interface UserDetails {
    uuid: string;
    email: string;
    username: string;
    phoneNumber: string;
    country: string;
}

interface UserDetailsResponse {
    status: string;
    user: UserDetails;
}

export const getUserDetails = async (token: string): Promise<UserDetails> => {
    const response = await axios.get<UserDetailsResponse>(
        `${import.meta.env.VITE_API_BASE_URL}api/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.user;
};
