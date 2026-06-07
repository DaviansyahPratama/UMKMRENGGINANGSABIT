import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import product from "../../data/product";

export default function KatalogMenu() {
  const [query, setQuery] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(product);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = product.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredMenu(result);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <PageMeta
        title="Katalog Menu | Rengginang Sabit"
        description="Daftar produk Rengginang Sabit"
      />

      <div className="container mx-auto px-6 py-10">
        {/* HEADER */}
        <section className="pt-16 text-center">
          <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700 shadow">
            Produk Premium
          </span>

          <h1 className="mt-6 text-5xl font-extrabold">
            <span className="text-white">Katalog</span>{" "}
            <span className="text-amber-400">Menu</span>
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            Pilihan rengginang premium khas nusantara.
          </p>
        </section>

        {/* SEARCH */}
        <div className="mx-auto mt-10 max-w-md">
          <input
            type="text"
            placeholder="Cari menu rengginang..."
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

        {/* LIST MENU */}
        <section className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  bg-slate-800
                  border
                  border-amber-400
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-amber-500/20
                "
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-72
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-110
                    "
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white">
                    {item.name}
                  </h2>

                  <p className="mt-3 text-gray-300">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-amber-400">
                      {item.price}
                    </span>

                  <Button
  size="sm"
  className="
    bg-amber-400
    text-slate-900
    font-semibold
    shadow-md
    hover:bg-amber-500
    transition-all
    duration-300
  "
>
  Detail
</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-lg text-gray-300">
                Menu tidak ditemukan.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}