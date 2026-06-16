import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router
import { lazy, Suspense } from "react"; // Lazy Loading + Suspense

import { ScrollToTop } from "./components/common/ScrollToTop"; // Nested Components
import RequireOwner from "./components/auth/RequireOwner"; // Login API + Axios (auth guard)

import AppLayout from "./layout/multilayout/AppLayout"; // Multi Layout & Nested Routes
import GuestLayout from "./layout/multilayout/GuestLayout"; // Multi Layout & Nested Routes

/* ================================= */
/* AUTH */
/* ================================= */
const SignIn = lazy(() => import("./pages/AuthPages/SignIn")); // Lazy Loading

/* ================================= */
/* ERROR PAGE */
/* ================================= */
const NotFound = lazy(() => import("./pages/OtherPage/NotFound")); // Lazy Loading

/* ================================= */
/* PUBLIC PAGES */
/* ================================= */
const LandingPage = lazy(() => import("./pages/Public/LandingPage")); // Lazy Loading
const KatalogMenu = lazy(() => import("./pages/Public/KatalogMenu")); // Lazy Loading
const ProductDetail = lazy(() => import("./pages/Public/ProductDetail")); // Dynamic Route
const OutletLokasi = lazy(() => import("./pages/Public/OutletLokasi")); // useEffect + API
const KontakOwner = lazy(() => import("./pages/Public/KontakOwner")); // Lazy Loading

/* ================================= */
/* OWNER PAGES */
/* ================================= */
const Home = lazy(() => import("./pages/Dashboard/Home")); // useEffect (dashboard data)

const ModalPenjualan = lazy(() => import("./pages/Owner/ModalPenjualan")); // Component JavaScript
const DistribusiStok = lazy(() => import("./pages/Owner/DistribusiStok")); // Component JavaScript
const TransferOutlet = lazy(() => import("./pages/Owner/TransferOutlet")); // Component JavaScript
const Keuntungan = lazy(() => import("./pages/Owner/Keuntungan")); // Component JavaScript
const DashboardKeuntungan = lazy(() => import("./pages/Owner/DashboardKeuntungan")); // useEffect state
const StatistikOutlet = lazy(() => import("./pages/Owner/StatistikOutlet")); // useEffect state
const OutletManagement = lazy(() => import("./pages/Owner/OutletManagement")); // Component dengan Props
const MenuManagement = lazy(() => import("./pages/Owner/MenuManagement")); // Component dengan Props

export default function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Parent-Child Component */}

      <Suspense fallback={<div>Loading...</div>}> {/* Lazy Loading + Suspense */}
        <Routes>

          {/* PUBLIC / LANDING PAGE */}
          <Route element={<GuestLayout />}> {/* Nested Components */}
            <Route path="/" element={<LandingPage />} /> {/* React Router + Component JS */}
            <Route path="/menu" element={<KatalogMenu />} /> {/* React Router */}
            <Route path="/products/:id" element={<ProductDetail />} /> {/* Dynamic Route */}
            <Route path="/outlets" element={<OutletLokasi />} /> {/* useEffect */}
            <Route path="/kontak" element={<KontakOwner />} /> {/* React Router */}
          </Route>

          {/* OWNER / ADMIN */}
          <Route element={<AppLayout />}> {/* Multi Layout & Nested Routes */}

            <Route
              path="/dashboard"
              element={<RequireOwner><Home /></RequireOwner>} // Login API + Axios
            />

            <Route
              path="/owner/modal-penjualan"
              element={<RequireOwner><ModalPenjualan /></RequireOwner>} // Component JS
            />

            <Route
              path="/owner/distribusi-stok"
              element={<RequireOwner><DistribusiStok /></RequireOwner>} // Component JS
            />

            <Route
              path="/owner/transfer-outlet"
              element={<RequireOwner><TransferOutlet /></RequireOwner>} // Component JS
            />

            <Route
              path="/owner/outlet-management"
              element={<RequireOwner><OutletManagement /></RequireOwner>} // Component dengan Props
            />

            <Route
              path="/owner/menu-management"
              element={<RequireOwner><MenuManagement /></RequireOwner>} // Component dengan Props
            />

            <Route
              path="/owner/keuntungan"
              element={<RequireOwner><Keuntungan /></RequireOwner>} // Component JS
            />

            <Route
              path="/owner/dashboard-keuntungan"
              element={<RequireOwner><DashboardKeuntungan /></RequireOwner>} // useEffect state
            />

            <Route
              path="/owner/statistik-outlet"
              element={<RequireOwner><StatistikOutlet /></RequireOwner>} // useEffect state
            />
          </Route>

          {/* AUTH */}
          <Route path="/signin" element={<SignIn />} /> {/* Lazy Loading */}

          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} /> {/* Lazy Loading */}

        </Routes>
      </Suspense>
    </Router>
  );
}