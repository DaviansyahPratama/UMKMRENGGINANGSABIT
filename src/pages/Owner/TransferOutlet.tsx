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
  addTransferOutlet,
  deleteTransferOutlet,
  getOutletLabel,
  loadOutlets,
  loadTransferOutlet,
} from "../../lib/umkmStorage";

function formatDateNow() {
  return new Date().toISOString().slice(0, 10);
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

function toDigitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function formatThousandsDot(value: string) {
  const digits = toDigitsOnly(value);
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function TransferOutlet() {
  const outlets = useMemo(() => loadOutlets(), []);
  const outletOptions = useMemo(
    () => outlets.map((o) => ({ value: o.id, label: o.name })),
    [outlets]
  );

  const [refreshKey, setRefreshKey] = useState(0);
  const transferEntries = useMemo(() => loadTransferOutlet(), [refreshKey]);

  const [date, setDate] = useState(() => formatDateNow());
  const [outletId, setOutletId] = useState<string>(outlets[0]?.id ?? "");
  const [selectKey, setSelectKey] = useState(0);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const totalTransfer = useMemo(
    () => transferEntries.reduce((acc, x) => acc + (x.amount || 0), 0),
    [transferEntries]
  );

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Tanggal wajib diisi.");
    if (!outletId) return setError("Outlet wajib dipilih.");
    const numeric = Number(toDigitsOnly(amount));
    if (!amount || Number.isNaN(numeric))
      return setError("Nominal transfer harus berupa angka.");
    if (numeric <= 0) return setError("Nominal harus > 0.");

    addTransferOutlet({
      date,
      outletId,
      amount: numeric,
      notes: notes.trim(),
    });

    setDate(formatDateNow());
    setOutletId(outlets[0]?.id ?? "");
    setSelectKey((k) => k + 1);
    setAmount("");
    setNotes("");
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Hapus data transfer outlet ini?");
    if (!ok) return;
    deleteTransferOutlet(id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Transfer Outlet | UMKM Rengginang Sabit"
        description="Pencatatan transfer dari outlet untuk mendokumentasikan pemasukan usaha."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Transfer Outlet (Pemasukan)" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Tambah Transfer Outlet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Catat pemasukan dari outlet.
              </p>

              <form onSubmit={handleAdd} className="mt-5 space-y-5">
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
                  <Label>Nominal Transfer (IDR)</Label>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(formatThousandsDot(e.target.value))}
                    placeholder="10.000"
                  />
                </div>

                <div>
                  <Label>Catatan</Label>
                  <Input
                    placeholder="Opsional: rincian transfer"
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
                    Simpan
                  </Button>
                  <Button
                    className="flex-1"
                    size="md"
                    variant="outline"
                    onClick={() => {
                      setDate(formatDateNow());
                      setOutletId(outlets[0]?.id ?? "");
                      setSelectKey((k) => k + 1);
                      setAmount("");
                      setNotes("");
                      setError(null);
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
                    Daftar Transfer Outlet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Total pemasukan: <b>{formatRupiah(totalTransfer)}</b>
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
                        Nominal
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
                    {transferEntries.length === 0 ? (
                      <TableRow>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-gray-500 dark:text-gray-300"
                        >
                          Belum ada data transfer outlet.
                        </td>
                      </TableRow>
                    ) : (
                      transferEntries.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {t.date}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {getOutletLabel(t.outletId)}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {formatRupiah(t.amount)}
                          </TableCell>
                          <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                            {t.notes || "-"}
                          </TableCell>
                          <TableCell className="py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              startIcon={<TrashBinIcon className="size-4" />}
                              onClick={() => handleDelete(t.id)}
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

