import { useMemo, useState } from "react";

import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";

const outlets = [
  {
    id: "1",
    name: "Swalayan Maju Bersama",
    address: "Jl. Raya Serang No. 12, Kabupaten Serang, Banten",
    lat: -6.1201,
    lng: 106.1503,
    image:
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Toko Oleh-Oleh Nusantara",
    address: "Jl. Ciruas No. 45, Serang, Banten",
    lat: -6.1115,
    lng: 106.1846,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Minimarket Berkah",
    address: "Jl. Pandeglang KM 5, Banten",
    lat: -6.3091,
    lng: 106.1045,
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Swalayan Sukses Jaya",
    address: "Jl. Cilegon Raya No. 88, Banten",
    lat: -6.0025,
    lng: 106.0112,
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1400&auto=format&fit=crop",
  },
];

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
  const [selectedOutletId, setSelectedOutletId] = useState<string>(
    outlets[0].id
  );

  const selectedOutlet = useMemo(
    () =>
      outlets.find((o) => o.id === selectedOutletId) ?? outlets[0],
    [selectedOutletId]
  );

  const iframeSrc = useMemo(() => {
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

      <div className="space-y-14">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 p-10 text-white shadow-2xl">

          <div className="relative z-10">

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              Outlet Resmi
            </span>

            <h1 className="mt-6 text-5xl font-extrabold lg:text-6xl">
              Lokasi Outlet
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-orange-100">
              Temukan outlet dan swalayan resmi Rengginang Sabit
              terdekat di kota Anda.
            </p>

          </div>

          <div className="absolute right-5 top-5 text-[180px] opacity-10">
            📍
          </div>

        </section>

        {/* CONTENT */}
        <div className="grid grid-cols-12 gap-8">

          {/* LIST OUTLET */}
          <div className="col-span-12 xl:col-span-4">

            <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-white/[0.03]">

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Daftar Outlet
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Pilih outlet untuk melihat lokasi maps.
              </p>

              <div className="mt-6 space-y-4">

                {outlets.map((o) => {
                  const isActive = o.id === selectedOutletId;

                  return (
                    <button
                      key={o.id}
                      onClick={() => setSelectedOutletId(o.id)}
                      className={`w-full rounded-2xl border p-5 text-left transition duration-300 ${
                        isActive
                          ? "border-amber-300 bg-amber-50 dark:bg-amber-500/10"
                          : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
                      }`}
                    >

                      <div className="flex items-start gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                          🏪
                        </div>

                        <div>

                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {o.name}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            {o.address}
                          </p>

                        </div>

                      </div>

                    </button>
                  );
                })}

              </div>

            </div>

          </div>

          {/* MAP DETAIL */}
          <div className="col-span-12 xl:col-span-8">

            <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-white/[0.03]">

              {/* IMAGE */}
              <div className="relative h-[260px] overflow-hidden">

                <img
                  src={selectedOutlet.image}
                  alt={selectedOutlet.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-6 left-6 text-white">

                  <h2 className="text-4xl font-extrabold">
                    {selectedOutlet.name}
                  </h2>

                  <p className="mt-2 max-w-xl text-gray-200">
                    {selectedOutlet.address}
                  </p>

                </div>

              </div>

              {/* DETAIL */}
              <div className="p-8">

                <div className="grid gap-6 md:grid-cols-3">

                  <div className="rounded-2xl bg-amber-50 p-5 dark:bg-amber-500/10">

                    <div className="text-3xl">
                      🏪
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                      Nama Swalayan
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {selectedOutlet.name}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-500/10">

                    <div className="text-3xl">
                      📍
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                      Alamat
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {selectedOutlet.address}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-500/10">

                    <div className="text-3xl">
                      🕒
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">
                      Jam Operasional
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      08.00 - 21.00 WIB
                    </p>

                  </div>

                </div>

                {/* BUTTON */}
                <div className="mt-8 flex flex-wrap gap-4">

                  <Button size="md">
                    Lihat Detail
                  </Button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedOutlet.lat},${selectedOutlet.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.05]"
                  >
                    Buka Google Maps
                  </a>

                </div>

                {/* MAP */}
                <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800">

                  <iframe
                    title="Map Outlet"
                    src={iframeSrc}
                    className="h-[500px] w-full"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}