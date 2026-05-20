import type {
  ModalPenjualanEntry,
  StokDistribusiEntry,
  TransferOutletEntry,
} from "./umkmStorage";

function parseISODate(dateStr: string) {
  // Expects YYYY-MM-DD
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function toISODate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function startOfISOWeek(date: Date) {
  // Monday as first day
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = (d.getDay() + 6) % 7; // Mon=0 ... Sun=6
  d.setDate(d.getDate() - day);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function computeProfitTotals(
  modalEntries: ModalPenjualanEntry[],
  transferEntries: TransferOutletEntry[]
) {
  const totalModal = modalEntries.reduce((acc, x) => acc + (x.amount || 0), 0);
  const totalTransfer = transferEntries.reduce(
    (acc, x) => acc + (x.amount || 0),
    0
  );
  const profit = totalTransfer - totalModal;

  return { totalModal, totalTransfer, profit };
}

export function computeProfitSeriesWeekly(
  modalEntries: ModalPenjualanEntry[],
  transferEntries: TransferOutletEntry[],
  weeksCount = 8
) {
  const today = new Date();
  const currentWeekStart = startOfISOWeek(today);

  const buckets = Array.from({ length: weeksCount }).map((_, idx) => {
    const offset = weeksCount - 1 - idx;
    const start = addDays(currentWeekStart, -7 * offset);
    const key = toISODate(start);
    const label = start.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
    return { key, label, modalSum: 0, transferSum: 0 };
  });

  const bucketMap = new Map(buckets.map((b) => [b.key, b]));

  for (const m of modalEntries) {
    const dt = parseISODate(m.date);
    const key = toISODate(startOfISOWeek(dt));
    const bucket = bucketMap.get(key);
    if (bucket) bucket.modalSum += m.amount || 0;
  }
  for (const t of transferEntries) {
    const dt = parseISODate(t.date);
    const key = toISODate(startOfISOWeek(dt));
    const bucket = bucketMap.get(key);
    if (bucket) bucket.transferSum += t.amount || 0;
  }

  return {
    labels: buckets.map((b) => b.label),
    profits: buckets.map((b) => b.transferSum - b.modalSum),
    totalTransfers: buckets.map((b) => b.transferSum),
    totalModal: buckets.map((b) => b.modalSum),
  };
}

export function computeProfitSeriesMonthly(
  modalEntries: ModalPenjualanEntry[],
  transferEntries: TransferOutletEntry[],
  monthsCount = 12
) {
  const now = new Date();
  const buckets = Array.from({ length: monthsCount }).map((_, idx) => {
    const offset = monthsCount - 1 - idx;
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const key = monthKey(d);
    const label = d.toLocaleDateString("id-ID", { month: "short" });
    return { key, label, modalSum: 0, transferSum: 0 };
  });

  const bucketMap = new Map(buckets.map((b) => [b.key, b]));

  for (const m of modalEntries) {
    const dt = parseISODate(m.date);
    const key = monthKey(dt);
    const bucket = bucketMap.get(key);
    if (bucket) bucket.modalSum += m.amount || 0;
  }
  for (const t of transferEntries) {
    const dt = parseISODate(t.date);
    const key = monthKey(dt);
    const bucket = bucketMap.get(key);
    if (bucket) bucket.transferSum += t.amount || 0;
  }

  return {
    labels: buckets.map((b) => b.label),
    profits: buckets.map((b) => b.transferSum - b.modalSum),
    totalTransfers: buckets.map((b) => b.transferSum),
    totalModal: buckets.map((b) => b.modalSum),
  };
}

export function computeOutletStats(
  outletId: string,
  stokEntries: StokDistribusiEntry[],
  transferEntries: TransferOutletEntry[]
) {
  const stokSum = stokEntries
    .filter((x) => x.outletId === outletId)
    .reduce((acc, x) => acc + (x.quantity || 0), 0);

  const transferForOutlet = transferEntries.filter((x) => x.outletId === outletId);

  const pemasukanSum = transferForOutlet.reduce(
    (acc, x) => acc + (x.amount || 0),
    0
  );

  return {
    totalStokTerdistribusi: stokSum,
    totalTransaksiTransfer: transferForOutlet.length,
    totalPemasukan: pemasukanSum,
    rataRataPemasukan: transferForOutlet.length
      ? pemasukanSum / transferForOutlet.length
      : 0,
    recentTransfers: transferForOutlet.slice(0, 5),
  };
}

export function computeOutletTransferSeriesMonthly(
  outletId: string,
  transferEntries: TransferOutletEntry[],
  monthsCount = 6
) {
  const now = new Date();
  const buckets = Array.from({ length: monthsCount }).map((_, idx) => {
    const offset = monthsCount - 1 - idx;
    const d = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const key = monthKey(d);
    const label = d.toLocaleDateString("id-ID", { month: "short" });
    return { key, label, sum: 0 };
  });

  const bucketMap = new Map(buckets.map((b) => [b.key, b]));

  for (const t of transferEntries) {
    if (t.outletId !== outletId) continue;
    const dt = parseISODate(t.date);
    const key = monthKey(dt);
    const bucket = bucketMap.get(key);
    if (bucket) bucket.sum += t.amount || 0;
  }

  return { labels: buckets.map((b) => b.label), values: buckets.map((b) => b.sum) };
}

