export const navItems = [
  {
    icon: null,
    name: "Dashboard",
    subItems: [
      { name: "Beranda", path: "/", pro: false },
      { name: "Manajemen Katalog", path: "/owner/menu-management", pro: false },
      { name: "Manajemen Outlet", path: "/owner/outlet-management", pro: false },
      { name: "Modal Penjualan", path: "/owner/modal-penjualan", pro: false },
      { name: "Distribusi Stok Outlet", path: "/owner/distribusi-stok", pro: false },
      { name: "Transfer Outlet", path: "/owner/transfer-outlet", pro: false },
      { name: "Perhitungan Keuntungan", path: "/owner/keuntungan", pro: false },
      { name: "Dashboard Keuntungan", path: "/owner/dashboard-keuntungan", pro: false },
      { name: "Statistik Outlet", path: "/owner/statistik-outlet", pro: false },
    ],
  },
];

export const othersItems = [
  {
    icon: null,
    name: "Pelanggan",
    subItems: [
      { name: "Katalog Menu", path: "/menu", pro: false },
      { name: "Lokasi Outlet", path: "/outlets", pro: false },
    ],
  },
  {
    icon: null,
    name: "Authentication",
    subItems: [{ name: "Sign In", path: "/signin", pro: false }],
  },
];
