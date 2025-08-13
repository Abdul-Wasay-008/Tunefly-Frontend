// import { BrowserRouter } from "react-router-dom";
// import AdminApp from "./admin/AdminApp"; // admin-specific routes
// import UserRoutes from "./UserRoutes"; // user-specific routes

// function App() {
//   const isAdmin = window.location.pathname.startsWith("/admin");

//   return (
//     <BrowserRouter>
//       {isAdmin ? <AdminApp /> : <UserRoutes />}
//     </BrowserRouter>
//   );
// }

// export default App;


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
