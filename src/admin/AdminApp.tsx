import { Routes, Route } from "react-router-dom";
import AdminLogin from "./adminLogin";
import AdminDashboard from "./adminDashboard";
import DriverProfile from "./DriverProfile";
import ArtistProfile from "./ArtistProfile";
import NoQR from "./noQr";
import QRCodePages from "./QRCodePages";
import MusicRates from "./musicRates";
import DriverAccount from "./DriverAccont";
import ArtistAccount from "./ArtistAccount";
import NoNotifications from "./Notifications";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/driverProfile" element={<DriverProfile />} />
      <Route path="/admin/artistProfile" element={<ArtistProfile />} />
      <Route path="/admin/noQR" element={<NoQR />} />
      <Route path="/admin/qrCode" element={<QRCodePages />} />
      <Route path="/admin/musicRates" element={<MusicRates />} />
      <Route path="/admin/DriverAccount" element={<DriverAccount />} />
      <Route path="/admin/ArtistAccount" element={<ArtistAccount />} />
      <Route path="/admin/noNotifications" element={<NoNotifications />} />
    </Routes>
  );
}
