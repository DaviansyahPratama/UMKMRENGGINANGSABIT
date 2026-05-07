import {
  DEFAULT_APP_SETTINGS,
  DEFAULT_MENU_ITEMS,
  DEFAULT_OUTLETS,
  type AppSettings,
  type MenuItem,
  type Outlet,
} from "./umkmData";

export type ModalPenjualanEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number; // IDR
};

export type StokDistribusiEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  outletId: string;
  quantity: number; // pcs
  notes: string;
};

export type TransferOutletEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  outletId: string;
  amount: number; // IDR
  notes: string;
};

const MODAL_KEY = "umkm_modal_penjualan_v1";
const STOK_KEY = "umkm_stok_distribusi_v1";
const TRANSFER_KEY = "umkm_transfer_outlet_v1";
const OUTLET_KEY = "umkm_outlet_v1";
const MENU_KEY = "umkm_menu_catalog_v1";
const SETTINGS_KEY = "umkm_app_settings_v1";

function toISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return toISODate(d);
}

function uid() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    // ignore
  }
  return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadOutlets(): Outlet[] {
  return safeParseJSON<Outlet[]>(
    localStorage.getItem(OUTLET_KEY),
    DEFAULT_OUTLETS
  );
}

export function loadMenuItems(): MenuItem[] {
  return safeParseJSON<MenuItem[]>(
    localStorage.getItem(MENU_KEY),
    DEFAULT_MENU_ITEMS
  );
}

export function loadAppSettings(): AppSettings {
  return safeParseJSON<AppSettings>(
    localStorage.getItem(SETTINGS_KEY),
    DEFAULT_APP_SETTINGS
  );
}

function ensureUmkmSeed() {
  if (!localStorage.getItem(OUTLET_KEY)) {
    localStorage.setItem(OUTLET_KEY, JSON.stringify(DEFAULT_OUTLETS));
  }
  if (!localStorage.getItem(MENU_KEY)) {
    localStorage.setItem(MENU_KEY, JSON.stringify(DEFAULT_MENU_ITEMS));
  }
  if (!localStorage.getItem(SETTINGS_KEY)) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_APP_SETTINGS));
  }

  const modalRaw = localStorage.getItem(MODAL_KEY);
  const stokRaw = localStorage.getItem(STOK_KEY);
  const transferRaw = localStorage.getItem(TRANSFER_KEY);

  if (modalRaw && stokRaw && transferRaw) return;

  const outlets = loadOutlets().length >= 3 ? loadOutlets() : DEFAULT_OUTLETS;
  const [o1, o2, o3] = outlets;

  const seededModal: ModalPenjualanEntry[] = [
    {
      id: uid(),
      date: daysAgo(45),
      description: "Pembelian bahan baku rengginang",
      amount: 250000,
    },
    {
      id: uid(),
      date: daysAgo(38),
      description: "Kemasan & label",
      amount: 120000,
    },
    {
      id: uid(),
      date: daysAgo(31),
      description: "Pembelian tepung & bumbu",
      amount: 180000,
    },
    {
      id: uid(),
      date: daysAgo(24),
      description: "Ongkos produksi",
      amount: 140000,
    },
    {
      id: uid(),
      date: daysAgo(17),
      description: "Bahan baku tambahan",
      amount: 160000,
    },
    {
      id: uid(),
      date: daysAgo(10),
      description: "Kemasan tambahan",
      amount: 110000,
    },
    {
      id: uid(),
      date: daysAgo(3),
      description: "Pembelian bahan baku",
      amount: 210000,
    },
  ];

  const seededStok: StokDistribusiEntry[] = [
    {
      id: uid(),
      date: daysAgo(35),
      outletId: o1.id,
      quantity: 35,
      notes: "Pengiriman stok awal minggu ini",
    },
    {
      id: uid(),
      date: daysAgo(28),
      outletId: o2.id,
      quantity: 40,
      notes: "Stok untuk promo cabang barat",
    },
    {
      id: uid(),
      date: daysAgo(21),
      outletId: o3.id,
      quantity: 30,
      notes: "Pengisian ulang stok",
    },
    {
      id: uid(),
      date: daysAgo(14),
      outletId: o1.id,
      quantity: 38,
      notes: "Tambah stok untuk produk pedas",
    },
    {
      id: uid(),
      date: daysAgo(7),
      outletId: o2.id,
      quantity: 32,
      notes: "Pengiriman rutin",
    },
  ];

  const seededTransfer: TransferOutletEntry[] = [
    {
      id: uid(),
      date: daysAgo(42),
      outletId: o1.id,
      amount: 420000,
      notes: "Transfer hasil penjualan minggu lalu",
    },
    {
      id: uid(),
      date: daysAgo(35),
      outletId: o2.id,
      amount: 360000,
      notes: "Transfer penjualan cabang barat",
    },
    {
      id: uid(),
      date: daysAgo(28),
      outletId: o3.id,
      amount: 310000,
      notes: "Transfer penjualan cabang timur",
    },
    {
      id: uid(),
      date: daysAgo(21),
      outletId: o1.id,
      amount: 390000,
      notes: "Transfer hasil penjualan ulang",
    },
    {
      id: uid(),
      date: daysAgo(14),
      outletId: o2.id,
      amount: 405000,
      notes: "Transfer setelah pengiriman stok",
    },
    {
      id: uid(),
      date: daysAgo(7),
      outletId: o3.id,
      amount: 350000,
      notes: "Transfer penjualan akhir minggu",
    },
    {
      id: uid(),
      date: daysAgo(2),
      outletId: o1.id,
      amount: 460000,
      notes: "Transfer penjualan minggu berjalan",
    },
  ];

  localStorage.setItem(MODAL_KEY, JSON.stringify(seededModal));
  localStorage.setItem(STOK_KEY, JSON.stringify(seededStok));
  localStorage.setItem(TRANSFER_KEY, JSON.stringify(seededTransfer));
}

export function loadModalPenjualan(): ModalPenjualanEntry[] {
  ensureUmkmSeed();
  return safeParseJSON<ModalPenjualanEntry[]>(localStorage.getItem(MODAL_KEY), []);
}

export function loadStokDistribusi(): StokDistribusiEntry[] {
  ensureUmkmSeed();
  return safeParseJSON<StokDistribusiEntry[]>(
    localStorage.getItem(STOK_KEY),
    []
  );
}

export function loadTransferOutlet(): TransferOutletEntry[] {
  ensureUmkmSeed();
  return safeParseJSON<TransferOutletEntry[]>(
    localStorage.getItem(TRANSFER_KEY),
    []
  );
}

export function addModalPenjualan(entry: Omit<ModalPenjualanEntry, "id">) {
  const items = loadModalPenjualan();
  items.unshift({ ...entry, id: uid() });
  localStorage.setItem(MODAL_KEY, JSON.stringify(items));
}

export function deleteModalPenjualan(id: string) {
  const items = loadModalPenjualan().filter((x) => x.id !== id);
  localStorage.setItem(MODAL_KEY, JSON.stringify(items));
}

export function addStokDistribusi(entry: Omit<StokDistribusiEntry, "id">) {
  const items = loadStokDistribusi();
  items.unshift({ ...entry, id: uid() });
  localStorage.setItem(STOK_KEY, JSON.stringify(items));
}

export function deleteStokDistribusi(id: string) {
  const items = loadStokDistribusi().filter((x) => x.id !== id);
  localStorage.setItem(STOK_KEY, JSON.stringify(items));
}

export function updateStokDistribusi(
  id: string,
  payload: Omit<StokDistribusiEntry, "id">
) {
  const items = loadStokDistribusi();
  const next = items.map((x) =>
    x.id === id
      ? {
          ...x,
          date: payload.date,
          outletId: payload.outletId,
          quantity: payload.quantity,
          notes: payload.notes,
        }
      : x
  );
  localStorage.setItem(STOK_KEY, JSON.stringify(next));
}

export function addTransferOutlet(entry: Omit<TransferOutletEntry, "id">) {
  const items = loadTransferOutlet();
  items.unshift({ ...entry, id: uid() });
  localStorage.setItem(TRANSFER_KEY, JSON.stringify(items));
}

export function deleteTransferOutlet(id: string) {
  const items = loadTransferOutlet().filter((x) => x.id !== id);
  localStorage.setItem(TRANSFER_KEY, JSON.stringify(items));
}

export function addOutlet(entry: Omit<Outlet, "id">) {
  const items = loadOutlets();
  const normalizedName = entry.name.trim().toLowerCase();

  const exists = items.some((o) => o.name.trim().toLowerCase() === normalizedName);
  if (exists) {
    throw new Error("Nama outlet sudah ada.");
  }

  items.unshift({
    id: uid(),
    name: entry.name.trim(),
    address: entry.address.trim(),
    lat: entry.lat,
    lng: entry.lng,
    operationalHours: entry.operationalHours?.trim() || "",
    imageUrl: entry.imageUrl?.trim() || "",
    whatsapp: entry.whatsapp?.trim() || "",
    googleMapsUrl: entry.googleMapsUrl?.trim() || "",
  });
  localStorage.setItem(OUTLET_KEY, JSON.stringify(items));
}

export function updateOutlet(outletId: string, payload: Omit<Outlet, "id">) {
  const outlets = loadOutlets();
  const next = outlets.map((o) =>
    o.id === outletId
      ? {
          ...o,
          name: payload.name.trim(),
          address: payload.address.trim(),
          lat: payload.lat,
          lng: payload.lng,
          operationalHours: payload.operationalHours?.trim() || "",
          imageUrl: payload.imageUrl?.trim() || "",
          whatsapp: payload.whatsapp?.trim() || "",
          googleMapsUrl: payload.googleMapsUrl?.trim() || "",
        }
      : o
  );
  localStorage.setItem(OUTLET_KEY, JSON.stringify(next));
}

export function deleteOutlet(outletId: string) {
  const outlets = loadOutlets();
  const nextOutlets = outlets.filter((o) => o.id !== outletId);
  localStorage.setItem(OUTLET_KEY, JSON.stringify(nextOutlets));

  // Cascade delete data terkait outlet agar referensi tetap konsisten.
  const nextStok = loadStokDistribusi().filter((x) => x.outletId !== outletId);
  localStorage.setItem(STOK_KEY, JSON.stringify(nextStok));

  const nextTransfer = loadTransferOutlet().filter((x) => x.outletId !== outletId);
  localStorage.setItem(TRANSFER_KEY, JSON.stringify(nextTransfer));
}

export function addMenuItem(entry: Omit<MenuItem, "id">) {
  const items = loadMenuItems();
  items.unshift({
    id: uid(),
    name: entry.name.trim(),
    description: entry.description.trim(),
    composition: entry.composition.trim(),
    price: entry.price,
    category: entry.category.trim(),
    imageUrl: entry.imageUrl.trim(),
    isBestSeller: !!entry.isBestSeller,
  });
  localStorage.setItem(MENU_KEY, JSON.stringify(items));
}

export function updateMenuItem(menuId: string, payload: Omit<MenuItem, "id">) {
  const items = loadMenuItems();
  const next = items.map((m) =>
    m.id === menuId
      ? {
          ...m,
          name: payload.name.trim(),
          description: payload.description.trim(),
          composition: payload.composition.trim(),
          price: payload.price,
          category: payload.category.trim(),
          imageUrl: payload.imageUrl.trim(),
          isBestSeller: !!payload.isBestSeller,
        }
      : m
  );
  localStorage.setItem(MENU_KEY, JSON.stringify(next));
}

export function deleteMenuItem(menuId: string) {
  const items = loadMenuItems().filter((m) => m.id !== menuId);
  localStorage.setItem(MENU_KEY, JSON.stringify(items));
}

export function updateAppSettings(payload: AppSettings) {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({
      ownerWhatsapp: payload.ownerWhatsapp.trim(),
      shopeeUrl: payload.shopeeUrl.trim(),
    })
  );
}

export function getOutletLabel(outletId: string) {
  const outlet = loadOutlets().find((o) => o.id === outletId);
  return outlet ? outlet.name : `Unknown outlet (${outletId})`;
}

export function getOutletById(outletId: string): Outlet | undefined {
  return loadOutlets().find((o) => o.id === outletId);
}

