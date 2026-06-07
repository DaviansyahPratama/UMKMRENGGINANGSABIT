import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RequireOwner from "./components/auth/RequireOwner";
import AppLayout from "./layout/AppLayout";
import GuestLayout from "./layout/GuestLayout";
import ProductDetail from "./pages/Public/ProductDetail";

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
        {/* PUBLIC / LANDING PAGE */}
        {/* ================================= */}
        <Route element={<GuestLayout />}>

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/menu"
            element={<KatalogMenu />}
          />

          {/* DETAIL PRODUK */}
          <Route
            path="/products/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/outlets"
            element={<OutletLokasi />}
          />

          <Route
            path="/kontak"
            element={<KontakOwner />}
          />

        </Route>

        {/* ================================= */}
        {/* OWNER / ADMIN */}
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