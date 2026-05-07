import { useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { loadOutlets } from "../../lib/umkmStorage";

function getMapEmbedUrl(lat: number, lng: number) {
  const delta = 0.01;
  const west = lng - delta;
  const south = lat - delta;
  const east = lng + delta;
  const north = lat + delta;
  const bbox = `${west},${south},${east},${north}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;
}

export default function OutletLokasi() {
  const outlets = useMemo(() => loadOutlets(), []);
  const [selectedOutletId, setSelectedOutletId] = useState<string>(
    outlets[0]?.id ?? ""
  );

  const selectedOutlet = useMemo(
    () => outlets.find((o) => o.id === selectedOutletId) ?? outlets[0],
    [selectedOutletId, outlets]
  );

  const iframeSrc = useMemo(() => {
    if (!selectedOutlet) return "";
    return getMapEmbedUrl(selectedOutlet.lat, selectedOutlet.lng);
  }, [selectedOutlet]);

  return (
    <>
      <PageMeta
        title="Outlet & Lokasi | UMKM Rengginang Sabit"
        description="Informasi lokasi outlet agar pelanggan mudah menemukan tempat pembelian."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Informasi Lokasi Outlet (KF08)" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Pilih Outlet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Klik outlet untuk melihat alamat dan peta.
              </p>

              <div className="mt-4 space-y-3">
                {outlets.map((o) => {
                  const isActive = o.id === selectedOutletId;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setSelectedOutletId(o.id)}
                      className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                        isActive
                          ? "border-brand-300 bg-brand-50 dark:bg-brand-500/10"
                          : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <p className="font-medium text-gray-900 dark:text-white/90">
                        {o.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {o.address}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-8">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {selectedOutlet?.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Alamat: {selectedOutlet?.address}
                  </p>
                </div>
              </div>

              {iframeSrc && (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <iframe
                    title="Map Outlet"
                    src={iframeSrc}
                    className="w-full h-[380px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

