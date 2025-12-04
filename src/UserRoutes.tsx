import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import NewCampaigns from "./pages/newCampaigns";
import CreateCampaigns from "./pages/createCampaigns";
import AssetLibrary from "./pages/assetLibrary";
import Analytics from "./pages/analytics";
import Settings from "./pages/settings";
import EditProfile from "./pages/editProfile";
import ChangePassword from "./pages/changePassword";
import IntegratedAccount from "./pages/integratedAccounts";
import Faqs from "./pages/faqs";
import QrLanding from "./pages/qrLanding";
import VerifyScreen from "./pages/verifyScreen";
import NoNotifications from "./pages/Notifications";
import Landing from "./pages/landing";
import PrivacyPolicy from "./pages/privacyPolicy";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verifyEmail" element={<VerifyScreen />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/newCampaigns" element={<NewCampaigns />} />
      <Route path="/createCampaigns" element={<CreateCampaigns />} />
      <Route path="/assetLibrary" element={<AssetLibrary />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/integratedAccounts" element={<IntegratedAccount />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/qrlanding" element={<QrLanding />} />
      <Route path="/noNotifications" element={<NoNotifications />} />
    </Routes>
  );
}
