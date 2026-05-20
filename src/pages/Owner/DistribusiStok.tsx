import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import Select from "../../components/form/Select";
import { PlusIcon, TrashBinIcon } from "../../icons";
import {
  addStokDistribusi,
  deleteStokDistribusi,
  getOutletLabel,
  loadOutlets,
  loadStokDistribusi,
  updateStokDistribusi,
} from "../../lib/umkmStorage";

function formatDateNow() {
  return new Date().toISOString().slice(0, 10);
}

export default function DistribusiStok() {
  const outlets = useMemo(() => loadOutlets(), []);
  const outletOptions = useMemo(
    () => outlets.map((o) => ({ value: o.id, label: o.name })),
    [outlets]
  );

  const [refreshKey, setRefreshKey] = useState(0);
  const stokEntries = useMemo(() => loadStokDistribusi(), [refreshKey]);

  const [date, setDate] = useState(() => formatDateNow());
  const [outletId, setOutletId] = useState<string>(outlets[0]?.id ?? "");
  const [selectKey, setSelectKey] = useState(0);
  const [quantity, setQuantity] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalStok = useMemo(
    () => stokEntries.reduce((acc, x) => acc + (x.quantity || 0), 0),
    [stokEntries]
  );

  const resetForm = () => {
    setDate(formatDateNow());
    setOutletId(outlets[0]?.id ?? "");
    setSelectKey((k) => k + 1);
    setQuantity("");
    setNotes("");
    setError(null);
    setEditingId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Tanggal wajib diisi.");
    if (!outletId) return setError("Outlet wajib dipilih.");
    if (quantity === "" || Number.isNaN(Number(quantity)))
      return setError("Jumlah stok harus berupa angka.");
    const numeric = Number(quantity);
    if (numeric <= 0) return setError("Jumlah stok harus > 0.");

    if (editingId) {
      updateStokDistribusi(editingId, {
        date,
        outletId,
        quantity: numeric,
        notes: notes.trim(),
      });
    } else {
      addStokDistribusi({
        date,
        outletId,
        quantity: numeric,
        notes: notes.trim(),
      });
    }

    resetForm();
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Hapus data distribusi stok ini?");
    if (!ok) return;
    deleteStokDistribusi(id);
    setRefreshKey((k) => k + 1);
  };

  const handleEdit = (id: string) => {
    const item = stokEntries.find((x) => x.id === id);
    if (!item) return;
    setEditingId(item.id);
    setDate(item.date);
    setOutletId(item.outletId);
    setSelectKey((k) => k + 1);
    setQuantity(item.quantity);
    setNotes(item.notes);
    setError(null);
  };

  return (
    <>
      <PageMeta
        title="Distribusi Stok Outlet | UMKM Rengginang Sabit"
        description="Pencatatan distribusi stok ke outlet agar jumlah stok yang diberikan dapat terdata."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Distribusi Stok Outlet" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                {editingId ? "Edit Distribusi Stok" : "Tambah Distribusi Stok"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Catat outlet dan jumlah stok yang dikirim.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <div>
                  <Label>Tanggal</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                  <Label>Outlet</Label>
                  <Select
                    key={selectKey}
                    options={outletOptions}
                    placeholder="Pilih outlet"
                    defaultValue={outletId}
                    onChange={setOutletId}
                  />
                </div>

                <div>
                  <Label>Jumlah Stok (pcs)</Label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="0"
                    min="0"
                    step={1}
                  />
                </div>

                <div>
                  <Label>Catatan</Label>
                  <Input
                    placeholder="Opsional: rincian pengiriman"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-error-500">{error}</p>
                )}

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    size="md"
                    startIcon={<PlusIcon />}
                  >
                    {editingId ? "Update" : "Simpan"}
                  </Button>
                  <Button
                    className="flex-1"
                    size="md"
                    variant="outline"
                    onClick={resetForm}
                  >
                    {editingId ? "Batal Edit" : "Reset"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Daftar Distribusi Stok
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Total stok terdistribusi: <b>{totalStok} pcs</b>
                  </p>
                </div>
                <Link
                  to="/owner/transfer-outlet"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Lanjut Transfer Outlet
                </Link>
              </div>

              <div className="mt-5 overflow-x-auto">
                <Table className="min-w-[860px]">
                  <TableHeader>
                    <TableRow>
                      <TableCell isHeader className="py-3">
                        Tanggal
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Outlet
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Jumlah (pcs)
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Catatan
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Aksi
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {stokEntries.length === 0 ? (
                      <TableRow>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-gray-500 dark:text-gray-300"
                        >
                          Belum ada data distribusi stok.
                        </td>
                      </TableRow>
                    ) : (
                      stokEntries.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {s.date}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {getOutletLabel(s.outletId)}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {s.quantity}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {s.notes || "-"}
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(s.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                startIcon={<TrashBinIcon className="size-4" />}
                                onClick={() => handleDelete(s.id)}
                              >
                                Hapus
                              </Button>
                            </div>
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

