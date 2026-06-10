import { Outlet } from "react-router-dom";
import PublicNavbar from "../../components/ui/PublicNavbar";
import PublicFooter from "../../components/ui/PublicFooter";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* NAVBAR */}
      <PublicNavbar />

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <Outlet />
      </main>

      {/* FOOTER */}
      <PublicFooter />

    </div>
  );
}