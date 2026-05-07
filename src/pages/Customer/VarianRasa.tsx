import { useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { PRODUCTS } from "../../lib/umkmData";
import Badge from "../../components/ui/badge/Badge";
import Input from "../../components/form/input/InputField";

export default function VarianRasa() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      if (p.name.toLowerCase().includes(q)) return true;
      return p.variants.some((v) => v.toLowerCase().includes(q));
    });
  }, [query]);

  return (
    <>
      <PageMeta
        title="Produk & Varian Rasa | UMKM Rengginang Sabit"
        description="Informasi varian rasa produk agar pelanggan mengetahui pilihan produk yang tersedia."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Informasi Varian Rasa (KF09)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Daftar Produk
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Tampilkan varian rasa untuk setiap produk.
              </p>
            </div>
            <div className="w-full sm:w-80">
              <Input
                placeholder="Cari produk/varian..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="col-span-12 sm:col-span-6 xl:col-span-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5"
              >
                <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {p.name}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {p.variants.length} varian
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.variants.map((v) => (
                    <Badge
                      key={v}
                      size="sm"
                      variant="light"
                      color="primary"
                    >
                      {v}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-12 text-center text-sm text-gray-500">
                Tidak ada produk/varian yang cocok dengan pencarian.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

