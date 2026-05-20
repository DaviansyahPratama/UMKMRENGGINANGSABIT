import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";

import AppLayout from "./layout/AppLayout";
import GuestLayout from "./layout/GuestLayout";

import { ScrollToTop } from "./components/common/ScrollToTop";

import RequireOwner from "./components/auth/RequireOwner";

/* OWNER */
import Home from "./pages/Dashboard/Home";
import ModalPenjualan from "./pages/Owner/ModalPenjualan";
import DistribusiStok from "./pages/Owner/DistribusiStok";
import TransferOutlet from "./pages/Owner/TransferOutlet";
import Keuntungan from "./pages/Owner/Keuntungan";
import DashboardKeuntungan from "./pages/Owner/DashboardKeuntungan";
import StatistikOutlet from "./pages/Owner/StatistikOutlet";
import OutletManagement from "./pages/Owner/OutletManagement";
import MenuManagement from "./pages/Owner/MenuManagement";

/* PUBLIC */
import GuestHome from "./pages/Public/GuestHome";
import KatalogMenu from "./pages/Public/KatalogMenu";
import OutletLokasi from "./pages/Public/OutletLokasi";

export default function App() {
  return (
    <Router>

      <ScrollToTop />

      <Routes>

        {/* ================================= */}
        {/* PUBLIC / GUEST */}
        {/* ================================= */}
        <Route element={<GuestLayout />}>

          <Route
            path="/"
            element={<GuestHome />}
          />

          <Route
            path="/menu"
            element={<KatalogMenu />}
          />

          <Route
            path="/outlets"
            element={<OutletLokasi />}
          />

        </Route>

        {/* ================================= */}
        {/* ADMIN / OWNER */}
        {/* ================================= */}
        <Route element={<AppLayout />}>

          <Route
            path="/dashboard"
            element={
              <RequireOwner>
                <Home />
              </RequireOwner>
            }
          />

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

        </Route>

        {/* AUTH */}
        <Route
          path="/signin"
          element={<SignIn />}
        />

        {/* NOT FOUND */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </Router>
  );
}