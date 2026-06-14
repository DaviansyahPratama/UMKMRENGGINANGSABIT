import { useMemo, useState, type FormEvent } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useEffect } from "react";
import api, { buildProductImageUrl } from "../../services/api"; // 👈 Impor buildProductImageUrl di sini
import type { Product } from "../../types/Product";
import { loadAppSettings, updateAppSettings } from "../../lib/umkmStorage";
import { PlusIcon, TrashBinIcon } from "../../icons";

// Fungsi format tampilan standard Rupiah untuk Tabel
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

// HELPER INPUT: Mengubah angka murni menjadi string ber-titik (150000 -> "150.000")
function toThousandSeparator(value: number | string): string {
  if (value === "" || value === undefined || value === null) return "";
  const numString = value.toString().replace(/\D/g, ""); 
  if (!numString) return "";
  return new Intl.NumberFormat("id-ID").format(Number(numString));
}

// HELPER INPUT: Mengubah string ber-titik kembali menjadi angka murni ("150.000" -> 150000)
function parseRawNumber(formattedValue: string): number | "" {
  const raw = formattedValue.replace(/\./g, ""); 
  return raw === "" ? "" : Number(raw);
}

export default function MenuManagement() {
  const [refreshKey, setRefreshKey] = useState(0);
  const settings = useMemo(() => loadAppSettings(), [refreshKey]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [composition, setComposition] = useState("");
  const [price, setPrice] = useState<number | "">(""); 
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bestSeller, setBestSeller] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ownerWhatsapp, setOwnerWhatsapp] = useState(settings.ownerWhatsapp);
  const [shopeeUrl, setShopeeUrl] = useState(settings.shopeeUrl);
  const [menuItems, setMenuItems] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      const products = response.data.map((item: any) => {
        // Deteksi field gambar dari backend secara dinamis agar aman
        const imageFile = item.image || item.image_url || item.image_path || "";

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          composition: item.composition,
          price: item.price,
          category: item.category,
          imageUrl: buildProductImageUrl(imageFile), // 👈 Menggunakan fungsi dinamis otomatis
          isBestSeller: item.is_best_seller,
        };
      });

      products.sort((a: Product, b: Product) => {
        return Number(b.isBestSeller) - Number(a.isBestSeller);
      });

      setMenuItems(products);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setComposition("");
    setPrice("");
    setCategory("");
    setImageFile(null);
    setBestSeller(false);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Nama menu wajib diisi.");
    if (!description.trim()) return setError("Deskripsi wajib diisi.");
    if (!composition.trim()) return setError("Komposisi wajib diisi.");
    if (price === "" || Number.isNaN(Number(price)) || Number(price) <= 0)
      return setError("Harga harus angka > 0.");
    if (!category.trim()) return setError("Kategori wajib diisi.");
    if (!editingId && !imageFile) {
      return setError("Foto produk wajib dipilih.");
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      composition: composition.trim(),
      price: Number(price),
      category: category.trim(),
      isBestSeller: bestSeller,
    };

    try {
      if (editingId) {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("composition", payload.composition);
        formData.append("price", payload.price.toString());
        formData.append("category", payload.category);
        formData.append("is_best_seller", payload.isBestSeller ? "1" : "0");

        if (imageFile) {
          formData.append("image", imageFile);
        }

        await api.post(`/products/${editingId}?_method=PUT`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("composition", payload.composition);
        formData.append("price", payload.price.toString());
        formData.append("category", payload.category);
        formData.append("is_best_seller", payload.isBestSeller ? "1" : "0");

        if (imageFile) {
          formData.append("image", imageFile);
        }
        await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await loadProducts();
      resetForm();
    } catch (error) {
      console.error(error);
      setError("Gagal menyimpan produk.");
    }
  };

  const handleEdit = (id: number) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setComposition(item.composition);
    setPrice(item.price);
    setCategory(item.category);
    setImageFile(null);
    setBestSeller(!!item.isBestSeller);
  };

  const handleDelete = async (id: number, itemName: string) => {
    const ok = window.confirm(`Hapus menu "${itemName}"?`);
    if (!ok) return;
    await api.delete(`/products/${id}`);
    await loadProducts();
    setRefreshKey((k) => k + 1);
  };

  const handleSaveSettings = () => {
    updateAppSettings({ ownerWhatsapp, shopeeUrl });
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Manajemen Katalog | UMKM Rengginang Sabit"
        description="Admin dapat menambah, edit, hapus menu serta mengatur link WhatsApp dan Shopee."
      />
      
      <div className="space-y-8 p-4 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Manajemen Katalog & Link Pemesanan" />
          </div>
        </div>

        {/* INTEGRASI LINK CARD */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
          <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-amber-500 to-red-700" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Pengaturan Link Pemesanan External
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5 mb-4">
            Kelola integrasi gerbang transaksi langsung konsumen.
          </p>
          
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                Nomor WhatsApp Owner (format: 628xxxx)
              </Label>
              <Input
                className="w-full focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                value={ownerWhatsapp}
                onChange={(e) => setOwnerWhatsapp(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                Link Marketplace Shopee
              </Label>
              <Input
                className="w-full focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                value={shopeeUrl}
                onChange={(e) => setShopeeUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button 
              type="button"
              onClick={handleSaveSettings}
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-900 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/10 border-none outline-none transition-all cursor-pointer"
            >
              Simpan Integrasi Link
            </button>
          </div>
        </div>

        {/* LAYOUT GRID UTAMA */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: FORM MANAGEMENT */}
          <div className="col-span-12 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className={`absolute top-0 left-0 h-full w-[4px] ${editingId ? 'bg-amber-500' : 'bg-red-700'}`} />
              
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5 pl-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editingId ? "Mode Koreksi Menu" : "Entri Produk Baru"}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  {editingId ? `Sedang mengubah ID #${editingId}` : "Tambahkan katalog produk retail Sabit."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pl-2">
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Nama Menu</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Deskripsi Singkat</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Komposisi Bahan</Label>
                  <Input