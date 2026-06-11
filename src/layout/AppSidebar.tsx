import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Assume these icons are imported from an icon library
import {
  ChatIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PlugInIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import {
  navItems as sharedNavItems,
  othersItems as sharedOthersItems,
} from "../data/menu";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// use shared menu data; icons are applied at render time
const navItems: NavItem[] = sharedNavItems.map((n) => ({
  ...n,
  icon: <GridIcon />,
}));
const othersItems: NavItem[] = sharedOthersItems.map((n, idx) => ({
  ...n,
  icon: idx === 0 ? <ChatIcon /> : <PlugInIcon />,
}));

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const { isOwnerAuthenticated } = useAuth();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-2">
      {" "}
      {/* Mengurangi gap dari 4 ke 2 agar menu lebih rapi dan tidak terlalu renggang */}
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group w-full ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-amber-50/80 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 font-bold"
                  : "menu-item-inactive"
              } cursor-pointer flex items-center p-3 rounded-xl transition-all ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start gap-3"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-amber-600 dark:text-amber-400"
                    : "menu-item-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-sm">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-amber-600 dark:text-amber-400"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group flex items-center p-3 rounded-xl transition-all ${
                  isActive(nav.path)
                    ? "bg-amber-50/80 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 font-bold"
                    : "menu-item-inactive"
                } ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start gap-3"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "text-amber-600 dark:text-amber-400"
                      : "menu-item-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text text-sm">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-1 ml-9 border-l border-gray-100 dark:border-gray-800 pl-2">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item block py-2 px-3 text-sm rounded-lg transition-all ${
                        isActive(subItem.path)
                          ? "bg-amber-50/60 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 font-bold"
                          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{subItem.name}</span>
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase ${
                                isActive(subItem.path)
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                              }`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase ${
                                isActive(subItem.path)
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                  : "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400"
                              }`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen flex flex-col
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-800
      transition-all duration-300 ease-in-out px-4.5 /* Ditambahkan padding horizontal sisi dalam */

      ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[90px]"}

      ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand Logo Section */}
      <div
        className={`py-6 flex shrink-0 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start px-2"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/rengginang-sabit.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                RengginangSabit
              </span>
            </div>
          ) : (
            <img
              src="/images/logo/rengginang-sabit.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
          )}
        </Link>
      </div>

      {/* Navigation Menu Section */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-1">
        <nav className="mb-6">
          <div className="flex flex-col gap-6">
            {/* Main Menu */}
            <div>
              <h2
                className={`mb-3 text-[10px] font-bold uppercase tracking-wider flex text-gray-400/80 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start px-3"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-5" />
                )}
              </h2>
              {renderMenuItems(
                navItems.map((nav) => {
                  if (nav.name !== "Dashboard") return nav;
                  return {
                    ...nav,
                    subItems: nav.subItems?.filter((s) => {
                      if (!s.path) return true;
                      if (s.path === "/") return true;
                      return isOwnerAuthenticated
                        ? s.path.startsWith("/owner/")
                        : false;
                    }),
                  };
                }),
                "main",
              )}
            </div>

            {/* Others Menu */}
            <div>
              <h2
                className={`mb-3 text-[10px] font-bold uppercase tracking-wider flex text-gray-400/80 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start px-3"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots className="size-5" />
                )}
              </h2>
              {renderMenuItems(
                othersItems.map((nav) => {
                  if (nav.name !== "Authentication") return nav;
                  return {
                    ...nav,
                    subItems: nav.subItems?.filter((s) => s.path === "/signin"),
                  };
                }),
                "others",
              )}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
