import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import RequireOwner from "./components/auth/RequireOwner";
import GuestHome from "./pages/Customer/GuestHome";
import { useAuth } from "./context/AuthContext";

import ModalPenjualan from "./pages/Owner/ModalPenjualan";
import DistribusiStok from "./pages/Owner/DistribusiStok";
import TransferOutlet from "./pages/Owner/TransferOutlet";
import Keuntungan from "./pages/Owner/Keuntungan";
import DashboardKeuntungan from "./pages/Owner/DashboardKeuntungan";
import StatistikOutlet from "./pages/Owner/StatistikOutlet";
import OutletManagement from "./pages/Owner/OutletManagement";
import MenuManagement from "./pages/Owner/MenuManagement";

import KatalogMenu from "./pages/Customer/KatalogMenu";
import OutletLokasi from "./pages/Customer/OutletLokasi";

export default function App() {
  function RootIndexRoute() {
    const { isOwnerAuthenticated } = useAuth();
    return isOwnerAuthenticated ? <Home /> : <GuestHome />;
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route
              index
              path="/"
              element={<RootIndexRoute />}
            />

            {/* Owner (UMKM) */}
            <Route
              path="/owner/modal-penjualan"
              element={
                <RequireOwner>
                  <ModalPenjualan />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/distribusi-stok"
              element={
                <RequireOwner>
                  <DistribusiStok />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/transfer-outlet"
              element={
                <RequireOwner>
                  <TransferOutlet />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/outlet-management"
              element={
                <RequireOwner>
                  <OutletManagement />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/menu-management"
              element={
                <RequireOwner>
                  <MenuManagement />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/keuntungan"
              element={
                <RequireOwner>
                  <Keuntungan />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/dashboard-keuntungan"
              element={
                <RequireOwner>
                  <DashboardKeuntungan />
                </RequireOwner>
              }
            />
            <Route
              path="/owner/statistik-outlet"
              element={
                <RequireOwner>
                  <StatistikOutlet />
                </RequireOwner>
              }
            />

            {/* Pelanggan (Guest) */}
            <Route path="/menu" element={<KatalogMenu />} />
            <Route path="/outlets" element={<OutletLokasi />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
