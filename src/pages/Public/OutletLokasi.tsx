import { useMemo, useState } from "react";

import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";

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

    return getMapEmbedUrl(
      selectedOutlet.lat,
      selectedOutlet.lng
    );
  }, [selectedOutlet]);

  return (
    <>
      <PageMeta
        title="Lokasi Outlet | Rengginang Sabit"
        description="Temukan outlet Rengginang Sabit terdekat."
      />

      <div className="space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Lokasi Outlet
          </h1>

          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Temukan outlet Rengginang Sabit terdekat di kotamu.
          </p>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-6">

          {/* LIST OUTLET */}
          <div className="col-span-12 xl:col-span-4">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">

              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Daftar Outlet
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Pilih outlet untuk melihat lokasi dan peta.
              </p>

              <div className="mt-6 space-y-4">

                {outlets.map((o) => {
                  const isActive = o.id === selectedOutletId;

                  return (
                    <button
                      key={o.id}
                      onClick={() => setSelectedOutletId(o.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition duration-200 ${
                        isActive
                          ? "border-amber-300 bg-amber-50 dark:bg-amber-500/10"
                          : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                      }`}
                    >

                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {o.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {o.address}
                      </p>

                    </button>
                  );
                })}

              </div>

            </div>

          </div>

          {/* MAP */}
          <div className="col-span-12 xl:col-span-8">

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">

              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedOutlet?.name}
                  </h2>

                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {selectedOutlet?.address}
                  </p>

                </div>

                <Button size="sm">
                  Lihat Detail
                </Button>

              </div>

              {/* MAP */}
              {iframeSrc && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">

                  <iframe
                    title="Map Outlet"
                    src={iframeSrc}
                    className="h-[450px] w-full"
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