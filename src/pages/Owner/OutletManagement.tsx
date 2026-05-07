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
import { PlusIcon, TrashBinIcon } from "../../icons";
import {
  addOutlet,
  deleteOutlet,
  loadOutlets,
} from "../../lib/umkmStorage";

export default function OutletManagement() {
  const [refreshKey, setRefreshKey] = useState(0);
  const outlets = useMemo(() => loadOutlets(), [refreshKey]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | "">("");
  const [lng, setLng] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Nama outlet wajib diisi.");
    if (!address.trim()) return setError("Alamat outlet wajib diisi.");
    if (lat === "" || Number.isNaN(Number(lat)))
      return setError("Latitude harus angka.");
    if (lng === "" || Number.isNaN(Number(lng)))
      return setError("Longitude harus angka.");

    try {
      addOutlet({
        name: name.trim(),
        address: address.trim(),
        lat: Number(lat),
        lng: Number(lng),
      });
      setName("");
      setAddress("");
      setLat("");
      setLng("");
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambahkan outlet.");
    }
  };

  const handleDelete = (outletId: string, outletName: string) => {
    const ok = window.confirm(
      `Hapus outlet "${outletName}"?\nData distribusi stok dan transfer yang terkait outlet ini juga akan terhapus.`
    );
    if (!ok) return;

    deleteOutlet(outletId);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Manajemen Outlet | UMKM Rengginang Sabit"
        description="Owner dapat menambah dan menghapus outlet."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Manajemen Outlet (CRUD)" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Tambah Outlet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Owner bisa menambahkan outlet baru.
              </p>

              <form onSubmit={handleAdd} className="mt-5 space-y-5">
                <div>
                  <Label>Nama Outlet</Label>
                  <Input
                    placeholder="Contoh: Outlet Rengginang Sabit - Cabang Utara"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Alamat Outlet</Label>
                  <Input
                    placeholder="Contoh: Jl. Contoh No. 10"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Latitude</Label>
                    <Input
                      type="number"
                      value={lat}
                      onChange={(e) =>
                        setLat(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      step={0.000001}
                    />
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Input
                      type="number"
                      value={lng}
                      onChange={(e) =>
                        setLng(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      step={0.000001}
                    />
                  </div>
                </div>

                {error && <p className="text-sm font-medium text-error-500">{error}</p>}

                <Button className="w-full" size="md" startIcon={<PlusIcon />}>
                  Simpan Outlet
                </Button>
              </form>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Daftar Outlet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Total outlet: <b>{outlets.length}</b>
              </p>

              <div className="mt-5 overflow-x-auto">
                <Table className="min-w-[860px]">
                  <TableHeader>
                    <TableRow>
                      <TableCell isHeader className="py-3">Nama</TableCell>
                      <TableCell isHeader className="py-3">Alamat</TableCell>
                      <TableCell isHeader className="py-3">Koordinat</TableCell>
                      <TableCell isHeader className="py-3">Aksi</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {outlets.length === 0 ? (
                      <TableRow>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-gray-500 dark:text-gray-300"
                        >
                          Belum ada outlet.
                        </td>
                      </TableRow>
                    ) : (
                      outlets.map((o) => (
                        <TableRow key={o.id}>
                          <TableCell className="py-3 text-gray-800 dark:text-white/90">
                            {o.name}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {o.address}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {o.lat}, {o.lng}
                          </TableCell>
                          <TableCell className="py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              startIcon={<TrashBinIcon className="size-4" />}
                              onClick={() => handleDelete(o.id, o.name)}
                            >
                              Hapus
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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

