import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import api from "../../services/api";

export default function OutletLokasi() {
  const [query, setQuery] = useState("");

  const [outlets, setOutlets] = useState<any[]>([]);
  const [filteredOutlets, setFilteredOutlets] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = outlets.filter((outlet) =>
        outlet.name.toLowerCase().includes(query.toLowerCase()),
      );

      setFilteredOutlets(result);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, outlets]);

  const loadOutlets = async () => {
    try {
      const response = await api.get("/outlets");

      const data = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        address: item.address,
        google_maps_url: item.google_maps_url,
      }));

      setOutlets(data);
      setFilteredOutlets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOutlets();
  }, []);

  return (
    <>
      <PageMeta
        title="Lokasi Outlet & Map | Rengginang Sabit"
        description="Temukan koordinat peta dan alamat resmi outlet Rengginang Sabit terdekat."
      />

      <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
        {/* HEADER */}
        <section className="pt-24 pb-10 text-center px-6">
          <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700">
            Peta Distribusi
          </span>

          <h1 className="mt-6 text-5xl font-extrabold">
            <span className="text-white">Lokasi</span>{" "}
            <span className="text-amber-400">& Outlet</span>
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            Temukan outlet resmi Rengginang Sabit terdekat.
          </p>
        </section>

        {/* SEARCH */}
        <div className="mx-auto mb-12 max-w-md px-4">
          <input
            type="text"
            placeholder="Cari outlet..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full
              rounded-full
              border-2
              border-amber-400
              bg-slate-800
              px-6
              py-4
              text-white
              placeholder:text-gray-400
              shadow-lg
              focus:outline-none
              focus:ring-4
              focus:ring-amber-300
            "
          />
        </div>

        {/* LIST OUTLET */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {filteredOutlets.length > 0 ? (
              filteredOutlets.map((outlet) => (
                <div
                  key={outlet.id}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-amber-400
                    bg-slate-800
                    shadow-xl
                    transition-all
                    duration-300
                    hover:shadow-amber-500/20
                  "
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* INFO OUTLET */}
                    <div className="lg:w-[380px] p-8 border-b lg:border-b-0 lg:border-r border-amber-400/20">
                      <div className="space-y-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400 text-amber-400 font-bold">
                          {outlet.id}
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-amber-400">
                            {outlet.name}
                          </h3>

                          <p className="mt-3 text-gray-300">{outlet.address}</p>
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(outlet.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-block
                            rounded-xl
                            bg-amber-400
                            px-6
                            py-3
                            font-semibold
                            text-slate-900
                            transition
                            hover:bg-amber-500
                          "
                        >
                          Buka Rute Navigasi
                        </a>
                      </div>
                    </div>

                    {/* MAP */}
                    <div className="relative min-h-[350px] flex-1">
                      <iframe
                        src={outlet.google_maps_url}
                        width="100%"
                        height="100%"
                        style={{
                          border: 0,
                          filter: "grayscale(1) invert(0.92) contrast(1.2)",
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Peta ${outlet.name}`}
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-gray-300">Outlet tidak ditemukan.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
