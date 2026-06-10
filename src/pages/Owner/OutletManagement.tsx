import { useState, type FormEvent } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { useEffect } from "react";
import api from "../../services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { PlusIcon, TrashBinIcon } from "../../icons";

export default function OutletManagement() {
  const [outlets, setOutlets] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Nama outlet wajib diisi.");
    if (!address.trim()) return setError("Alamat outlet wajib diisi.");
    if (!googleMapsUrl.trim()) return setError("URL Google Maps wajib diisi.");

    try {
      await api.post("/outlets", {
        name: name.trim(),
        address: address.trim(),
        google_maps_url: googleMapsUrl.trim(),
      });

      await loadOutlets();

      setName("");
      setAddress("");
      setGoogleMapsUrl("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menambahkan outlet.",
      );
    }
  };

  const handleDelete = async (outletId: string, outletName: string) => {
    const ok = window.confirm(
      `Hapus outlet "${outletName}"?\nData distribusi stok dan transfer yang terkait outlet ini juga akan terhapus.`,
    );
    if (!ok) return;

    await api.delete(`/outlets/${outletId}`);
    await loadOutlets();
  };

  useEffect(() => {
    loadOutlets();
  }, []);

  const loadOutlets = async () => {
    try {
      const response = await api.get("/outlets");

      setOutlets(response.data);
    } catch (error) {
      console.error(error);
    }
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
                <div>
                  <Label>Link Google Maps</Label>
                  <Input
                    placeholder="Paste URL Embed Google Maps"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Google Maps → Share → Embed a map → Copy HTML → ambil URL
                    pada src
                  </p>
                </div>

                {error && (
                  <p className="text-sm font-medium text-error-500">{error}</p>
                )}

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
                      <TableCell isHeader className="py-3">
                        Nama
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Alamat
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Google Maps
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Aksi
                      </TableCell>
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
                          <TableCell className="py-3">
                            <a
                              href={o.google_maps_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              Buka Maps
                            </a>
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
