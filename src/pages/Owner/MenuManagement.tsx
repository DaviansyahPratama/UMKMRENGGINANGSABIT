import { useMemo, useState, type FormEvent } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  addMenuItem,
  deleteMenuItem,
  loadAppSettings,
  loadMenuItems,
  updateAppSettings,
  updateMenuItem,
} from "../../lib/umkmStorage";
import { PlusIcon, TrashBinIcon } from "../../icons";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function MenuManagement() {
  const [refreshKey, setRefreshKey] = useState(0);
  const menuItems = useMemo(() => loadMenuItems(), [refreshKey]);
  const settings = useMemo(() => loadAppSettings(), [refreshKey]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [composition, setComposition] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ownerWhatsapp, setOwnerWhatsapp] = useState(settings.ownerWhatsapp);
  const [shopeeUrl, setShopeeUrl] = useState(settings.shopeeUrl);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setComposition("");
    setPrice("");
    setCategory("");
    setImageUrl("");
    setBestSeller(false);
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Nama menu wajib diisi.");
    if (!description.trim()) return setError("Deskripsi wajib diisi.");
    if (!composition.trim()) return setError("Komposisi wajib diisi.");
    if (price === "" || Number.isNaN(Number(price)) || Number(price) <= 0)
      return setError("Harga harus angka > 0.");
    if (!category.trim()) return setError("Kategori wajib diisi.");
    if (!imageUrl.trim()) return setError("URL foto produk wajib diisi.");

    const payload = {
      name: name.trim(),
      description: description.trim(),
      composition: composition.trim(),
      price: Number(price),
      category: category.trim(),
      imageUrl: imageUrl.trim(),
      isBestSeller: bestSeller,
    };

    if (editingId) {
      updateMenuItem(editingId, payload);
    } else {
      addMenuItem(payload);
    }

    resetForm();
    setRefreshKey((k) => k + 1);
  };

  const handleEdit = (id: string) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setComposition(item.composition);
    setPrice(item.price);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setBestSeller(!!item.isBestSeller);
  };

  const handleDelete = (id: string, itemName: string) => {
    const ok = window.confirm(`Hapus menu "${itemName}"?`);
    if (!ok) return;
    deleteMenuItem(id);
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
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Manajemen Katalog & Link Pemesanan" />

        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Pengaturan Link Pemesanan
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label>Nomor WhatsApp Owner (format: 628xxxx)</Label>
              <Input
                value={ownerWhatsapp}
                onChange={(e) => setOwnerWhatsapp(e.target.value)}
              />
            </div>
            <div>
              <Label>Link Shopee</Label>
              <Input value={shopeeUrl} onChange={(e) => setShopeeUrl(e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" onClick={handleSaveSettings}>
              Simpan Pengaturan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                {editingId ? "Edit Menu" : "Tambah Menu"}
              </h3>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <Label>Nama Menu</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <Label>Komposisi</Label>
                  <Input value={composition} onChange={(e) => setComposition(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Harga</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value === "" ? "" : Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label>Kategori</Label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>URL Foto Produk</Label>
                  <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={bestSeller}
                    onChange={(e) => setBestSeller(e.target.checked)}
                  />
                  Tandai sebagai Best Seller
                </label>
                {error && <p className="text-sm text-error-500">{error}</p>}
                <div className="flex gap-3">
                  <Button className="flex-1" startIcon={<PlusIcon />}>
                    {editingId ? "Update" : "Simpan"}
                  </Button>
                  <Button className="flex-1" variant="outline" onClick={resetForm}>
                    {editingId ? "Batal Edit" : "Reset"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Daftar Menu
              </h3>
              <div className="mt-5 overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow>
                      <TableCell isHeader className="py-3">Menu</TableCell>
                      <TableCell isHeader className="py-3">Kategori</TableCell>
                      <TableCell isHeader className="py-3">Harga</TableCell>
                      <TableCell isHeader className="py-3">Status</TableCell>
                      <TableCell isHeader className="py-3">Aksi</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {menuItems.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={m.imageUrl}
                              alt={m.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white/90">
                                {m.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {m.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                          {m.category}
                        </TableCell>
                        <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                          {formatRupiah(m.price)}
                        </TableCell>
                        <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                          {m.isBestSeller ? "Best Seller" : "-"}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(m.id)}>
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              startIcon={<TrashBinIcon className="size-4" />}
                              onClick={() => handleDelete(m.id, m.name)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

