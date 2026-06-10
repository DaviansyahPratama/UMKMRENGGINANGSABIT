import { useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { DEFAULT_MENU_ITEMS } from "../../lib/umkmData";
import Input from "../../components/form/input/InputField";

type ProductVariant = {
  id: string;
  name: string;
  variants: string[];
};

const PRODUCTS: ProductVariant[] = DEFAULT_MENU_ITEMS.map((item) => ({
  id: item.id,
  name: item.name,
  variants: [item.category || "Standar"],
}));

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
      
      {/* Container utama berlatar hitam pekat dengan padding top lolos dari navbar absolute */}
      <div className="space-y-6 bg-black text-white min-h-screen pt-28 px-6 pb-20">
        <PageBreadcrumb pageTitle="Informasi Varian Rasa (KF09)" />

        {/* Pembungkus utama diubah menjadi rounded-none dengan latar gelap transparan */}
        <div className="rounded-none border border-white/10 bg-white/[0.02] p-6 max-w-7xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#E2A929] uppercase tracking-wide">
                Daftar Produk
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Tampilkan varian rasa untuk setiap lini produk Rengginang Sabit.
              </p>
            </div>
            
            {/* Input pencarian dengan sedikit kustomisasi kelas CSS agar menyatu di tema gelap */}
            <div className="w-full sm:w-80 text-black dark:text-white">
              <Input
                placeholder="Cari produk/varian..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-none border-white/20 bg-black/50 text-white focus:border-[#E2A929]"
              />
            </div>
          </div>

          {/* Grid Konten Produk */}
          <div className="mt-8 grid grid-cols-12 gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="col-span-12 sm:col-span-6 xl:col-span-4 rounded-none border border-white/10 bg-white/[0.02] p-5 hover:border-[#E2A929]/30 transition duration-300"
              >
                <h4 className="text-lg font-serif font-bold text-white uppercase tracking-wide">
                  {p.name}
                </h4>
                <p className="mt-1 text-xs tracking-wider uppercase text-gray-400">
                  {p.variants.length} Varian Tersedia
                </p>
                
                {/* Pembungkus Badge Varian Rasa */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.variants.map((v) => (
                    <span 
                      key={v}
                      className="inline-block rounded-none bg-[#611414] border border-[#611414] text-[#E2A929] font-bold text-[11px] tracking-wider uppercase px-3 py-1 shadow-sm"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Keadaan jika pencarian kosong */}
            {filteredProducts.length === 0 && (
              <div className="col-span-12 text-center text-sm text-gray-500 py-12">
                Tidak ada produk atau varian rasa yang cocok dengan pencarian.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}