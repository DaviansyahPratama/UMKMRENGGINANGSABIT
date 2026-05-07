export type Outlet = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  operationalHours?: string;
  imageUrl?: string;
  whatsapp?: string;
  googleMapsUrl?: string;
};

export type MenuItem = {
  id: string;
  name: string; // varian/rasa
  description: string;
  composition: string;
  price: number;
  category: string;
  imageUrl: string;
  isBestSeller?: boolean;
};

export const DEFAULT_OUTLETS: Outlet[] = [
  {
    id: "outlet-1",
    name: "Outlet Rengginang Sabit - Utama",
    address: "Jl. Contoh No. 1, Kecamatan Sabit",
    lat: -7.250972,
    lng: 112.726,
    operationalHours: "08.00 - 21.00",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
    whatsapp: "628123456789",
    googleMapsUrl: "https://maps.google.com/?q=-7.250972,112.726",
  },
  {
    id: "outlet-2",
    name: "Outlet Rengginang Sabit - Cabang Barat",
    address: "Jl. Contoh No. 22, Kecamatan Sabit",
    lat: -7.2605,
    lng: 112.7122,
    operationalHours: "09.00 - 20.30",
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    whatsapp: "628123456780",
    googleMapsUrl: "https://maps.google.com/?q=-7.2605,112.7122",
  },
  {
    id: "outlet-3",
    name: "Outlet Rengginang Sabit - Cabang Timur",
    address: "Jl. Contoh No. 7, Kecamatan Sabit",
    lat: -7.2438,
    lng: 112.7339,
    operationalHours: "08.30 - 21.30",
    imageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    whatsapp: "628123456781",
    googleMapsUrl: "https://maps.google.com/?q=-7.2438,112.7339",
  },
];

// Backward compatibility (jika masih ada import lama).
export const OUTLETS = DEFAULT_OUTLETS;

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: "menu-1",
    name: "Coklat Classic",
    description: "Coklat premium dipadukan susu creamy dengan rasa manis lembut.",
    composition: "Susu segar, coklat premium, gula.",
    price: 18000,
    category: "Coklat",
    imageUrl:
      "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80",
    isBestSeller: true,
  },
  {
    id: "menu-2",
    name: "Matcha Latte",
    description: "Matcha pilihan dengan perpaduan susu segar khas Jepang.",
    composition: "Matcha bubuk premium, susu segar, gula.",
    price: 20000,
    category: "Matcha",
    imageUrl:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80",
    isBestSeller: true,
  },
  {
    id: "menu-3",
    name: "Strawberry Milk",
    description: "Susu strawberry segar dengan rasa manis menyegarkan.",
    composition: "Susu segar, sirup strawberry, es batu.",
    price: 17000,
    category: "Milk",
    imageUrl:
      "https://images.unsplash.com/photo-1553530979-fbb9e4aee36f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "menu-4",
    name: "Taro Creamy",
    description: "Minuman taro lembut dengan aroma khas dan tekstur creamy.",
    composition: "Taro powder, susu segar, gula.",
    price: 19000,
    category: "Taro",
    imageUrl:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=900&q=80",
  },
];

export type AppSettings = {
  ownerWhatsapp: string;
  shopeeUrl: string;
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  ownerWhatsapp: "628123456789",
  shopeeUrl: "https://shopee.co.id/",
};

