import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "../AppHeader";
import Backdrop from "../Backdrop";
import AppSidebar from "../AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered } = useSidebar();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <AppSidebar />
      <Backdrop />

      <main
        className={`flex-1 min-w-0 transition-all duration-300 ease-in-out
        ${
          isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]"
        }`}
      >
        <AppHeader />

        <div className="w-full px-4 py-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;