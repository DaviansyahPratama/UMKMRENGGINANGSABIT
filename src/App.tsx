import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RequireOwner from "./components/auth/RequireOwner";
import AppLayout from "./layout/AppLayout";
import GuestLayout from "./layout/GuestLayout";

/* ================================= */
/* AUTH */
/* ================================= */
import SignIn from "./pages/AuthPages/SignIn";

/* ================================= */
/* ERROR PAGE */
/* ================================= */
import NotFound from "./pages/OtherPage/NotFound";

/* ================================= */
/* PUBLIC PAGES */
/* ================================= */
import LandingPage from "./pages/Public/LandingPage";
import KatalogMenu from "./pages/Public/KatalogMenu";
import OutletLokasi from "./pages/Public/OutletLokasi";
import KontakOwner from "./pages/Public/KontakOwner";

/* ================================= */
/* OWNER PAGES */
/* ================================= */
import Home from "./pages/Dashboard/Home";
import ModalPenjualan from "./pages/Owner/ModalPenjualan";
import DistribusiStok from "./pages/Owner/DistribusiStok";
import TransferOutlet from "./pages/Owner/TransferOutlet";
import Keuntungan from "./pages/Owner/Keuntungan";
import DashboardKeuntungan from "./pages/Owner/DashboardKeuntungan";
import StatistikOutlet from "./pages/Owner/StatistikOutlet";
import OutletManagement from "./pages/Owner/OutletManagement";
import MenuManagement from "./pages/Owner/MenuManagement";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* ================================= */}
        {/* PUBLIC / LANDING PAGE (TAMPILAN GUEST) */}
        {/* ================================= */}
        <Route element={<GuestLayout />}>
          
          {/* HOME */}
          <Route
            path="/"
            element={<LandingPage />}
          />

          {/* KATALOG */}
          <Route
            path="/menu"
            element={<KatalogMenu />}
          />

          {/* OUTLET */}
          <Route
            path="/outlets"
            element={<OutletLokasi />}
          />

          {/* KONTAK */}
          <Route
            path="/kontak"
            element={<KontakOwner />}
          />

        </Route>

        {/* ================================= */}
        {/* OWNER / ADMIN (TAMPILAN DASHBOARD) */}
        {/* ================================= */}
        <Route element={<AppLayout />}>

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <RequireOwner>
                <Home />
              </RequireOwner>
            }
          />

          {/* MODAL PENJUALAN */}
          <Route
            path="/owner/modal-penjualan"
            element={
              <RequireOwner>
                <ModalPenjualan />
              </RequireOwner>
            }
          />

          {/* DISTRIBUSI STOK */}
          <Route
            path="/owner/distribusi-stok"
            element={
              <RequireOwner>
                <DistribusiStok />
              </RequireOwner>
            }
          />

          {/* TRANSFER OUTLET */}
          <Route
            path="/owner/transfer-outlet"
            element={
              <RequireOwner>
                <TransferOutlet />
              </RequireOwner>
            }
          />

          {/* OUTLET MANAGEMENT */}
          <Route
            path="/owner/outlet-management"
            element={
              <RequireOwner>
                <OutletManagement />
              </RequireOwner>
            }
          />

          {/* MENU MANAGEMENT */}
          <Route
            path="/owner/menu-management"
            element={
              <RequireOwner>
                <MenuManagement />
              </RequireOwner>
            }
          />

          {/* KEUNTUNGAN */}
          <Route
            path="/owner/keuntungan"
            element={
              <RequireOwner>
                <Keuntungan />
              </RequireOwner>
            }
          />

          {/* DASHBOARD KEUNTUNGAN */}
          <Route
            path="/owner/dashboard-keuntungan"
            element={
              <RequireOwner>
                <DashboardKeuntungan />
              </RequireOwner>
            }
          />

          {/* STATISTIK OUTLET */}
          <Route
            path="/owner/statistik-outlet"
            element={
              <RequireOwner>
                <StatistikOutlet />
              </RequireOwner>
            }
          />

        </Route>

        {/* ================================= */}
        {/* AUTH */}
        {/* ================================= */}
        <Route
          path="/signin"
          element={<SignIn />}
        />

        {/* ================================= */}
        {/* NOT FOUND */}
        {/* ================================= */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Router>
  );
}