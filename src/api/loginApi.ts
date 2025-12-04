import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
  usertype: 'artist' | 'driver';
}

export interface UserProfile {
  uuid: string;
  email: string;
  usertype: string;
  verify_email: boolean;
  username?: string;
  name?: string;
  phonenumber?: string;
  country?: string;
  UserArtistProfile?: any;
}

export interface LoginResponse {
  status: string;
  user: {
    token: string;
    user: UserProfile;
  };
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_API_BASE_URL}api/auth/login`,
    payload,
    { withCredentials: false }
  );

  return response.data;
};
