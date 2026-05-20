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
import { TrashBinIcon, PlusIcon } from "../../icons";
import {
  addModalPenjualan,
  deleteModalPenjualan,
  loadModalPenjualan,
} from "../../lib/umkmStorage";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function ModalPenjualan() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const modalEntries = useMemo(
    () => loadModalPenjualan(),
    [refreshKey]
  );

  const total = useMemo(
    () => modalEntries.reduce((acc, x) => acc + (x.amount || 0), 0),
    [modalEntries]
  );

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Tanggal wajib diisi.");
    if (!description.trim()) return setError("Keterangan wajib diisi.");
    if (amount === "" || Number.isNaN(Number(amount)))
      return setError("Nominal harus berupa angka.");
    const numeric = Number(amount);
    if (numeric <= 0) return setError("Nominal harus > 0.");

    addModalPenjualan({
      date,
      description: description.trim(),
      amount: numeric,
    });

    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Hapus data modal penjualan ini?");
    if (!ok) return;
    deleteModalPenjualan(id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Modal Penjualan | UMKM Rengginang Sabit"
        description="Pencatatan modal penjualan untuk mendokumentasikan pengeluaran usaha."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Modal Penjualan" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Tambah Modal
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Input pengeluaran modal agar perhitungan keuntungan akurat.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAdd} className="mt-5 space-y-5">
                <div>
                  <Label>Tanggal</Label>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div>
                  <Label>Keterangan</Label>
                  <Input
                    placeholder="Contoh: Pembelian bahan baku"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Nominal (IDR)</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="0"
                    min="0"
                    step={1000}
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
                    Simpan
                  </Button>
                  <Button
                    className="flex-1"
                    size="md"
                    variant="outline"
                    onClick={() => {
                      setDescription("");
                      setAmount("");
                      setError(null);
                      setDate(new Date().toISOString().slice(0, 10));
                    }}
                  >
                    Reset
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
                    Daftar Modal Penjualan
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Total semua modal: <b>{formatRupiah(total)}</b>
                  </p>
                </div>
                <Link
                  to="/owner/keuntungan"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Lihat Keuntungan
                </Link>
              </div>

              <div className="mt-5 overflow-x-auto">
                <Table className="min-w-[720px]">
                  <TableHeader>
                    <TableRow>
                      <TableCell isHeader className="py-3">
                        Tanggal
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Keterangan
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Nominal
                      </TableCell>
                      <TableCell isHeader className="py-3">
                        Aksi
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {modalEntries.length === 0 ? (
                      <TableRow>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-gray-500 dark:text-gray-300"
                        >
                          Belum ada data modal.
                        </td>
                      </TableRow>
                    ) : (
                      modalEntries.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {m.date}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {m.description}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {formatRupiah(m.amount)}
                          </TableCell>
                          <TableCell className="py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              startIcon={<TrashBinIcon className="size-4" />}
                              onClick={() => handleDelete(m.id)}
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

