import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ScrollToTop } from "./components/common/ScrollToTop";

import RequireOwner from "./components/auth/RequireOwner";

import AppLayout from "./layout/AppLayout";
import GuestLayout from "./layout/GuestLayout";

/* ================================= */
/* AUTH */
/* ================================= */
<<<<<<< HEAD
=======

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
import SignIn from "./pages/AuthPages/SignIn";

/* ================================= */
/* ERROR PAGE */
/* ================================= */
<<<<<<< HEAD
=======

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
import NotFound from "./pages/OtherPage/NotFound";

/* ================================= */
/* PUBLIC PAGES */
/* ================================= */
<<<<<<< HEAD
=======

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
import LandingPage from "./pages/Public/LandingPage";
import KatalogMenu from "./pages/Public/KatalogMenu";
import OutletLokasi from "./pages/Public/OutletLokasi";
import KontakOwner from "./pages/Public/KontakOwner";

/* ================================= */
/* OWNER PAGES */
/* ================================= */
<<<<<<< HEAD
import Home from "./pages/Dashboard/Home";
import ModalPenjualan from "./pages/Owner/ModalPenjualan";
import DistribusiStok from "./pages/Owner/DistribusiStok";
import TransferOutlet from "./pages/Owner/TransferOutlet";
import Keuntungan from "./pages/Owner/Keuntungan";
import DashboardKeuntungan from "./pages/Owner/DashboardKeuntungan";
import StatistikOutlet from "./pages/Owner/StatistikOutlet";
=======

import Home from "./pages/Dashboard/Home";

import ModalPenjualan from "./pages/Owner/ModalPenjualan";
import DistribusiStok from "./pages/Owner/DistribusiStok";
import TransferOutlet from "./pages/Owner/TransferOutlet";

import Keuntungan from "./pages/Owner/Keuntungan";
import DashboardKeuntungan from "./pages/Owner/DashboardKeuntungan";
import StatistikOutlet from "./pages/Owner/StatistikOutlet";

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
import OutletManagement from "./pages/Owner/OutletManagement";
import MenuManagement from "./pages/Owner/MenuManagement";

export default function App() {
  return (
    <Router>
<<<<<<< HEAD
      <ScrollToTop />

      <Routes>
        {/* ================================= */}
        {/* PUBLIC / LANDING PAGE (TAMPILAN GUEST) */}
        {/* ================================= */}
        {/* Perubahan style full-screen, transparan, & tema gelap diatur dari dalam GuestLayout & LandingPage */}
        <Route element={<GuestLayout />}>
          
=======

      <ScrollToTop />

      <Routes>

        {/* ================================= */}
        {/* PUBLIC / LANDING PAGE */}
        {/* ================================= */}

        <Route element={<GuestLayout />}>

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
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
<<<<<<< HEAD
        {/* OWNER / ADMIN (TAMPILAN DASHBOARD) */}
        {/* ================================= */}
=======
        {/* OWNER / ADMIN */}
        {/* ================================= */}

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
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
<<<<<<< HEAD
=======

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
        <Route
          path="/signin"
          element={<SignIn />}
        />

        {/* ================================= */}
        {/* NOT FOUND */}
        {/* ================================= */}
<<<<<<< HEAD
=======

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
<<<<<<< HEAD
=======

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
    </Router>
  );
}