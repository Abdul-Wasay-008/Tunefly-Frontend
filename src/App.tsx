import { BrowserRouter, useLocation } from "react-router-dom";
import AdminApp from "./admin/AdminApp";
import UserRoutes from "./UserRoutes";

function AppRouter() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return isAdmin ? <AdminApp /> : <UserRoutes />;
}

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
