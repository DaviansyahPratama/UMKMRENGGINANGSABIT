import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

const menus = [
  {
    name: "Coklat Classic",
    desc: "Coklat premium dengan susu creamy dan rasa manis lembut.",
  },
  {
    name: "Matcha Latte",
    desc: "Matcha pilihan dengan perpaduan susu segar khas Jepang.",
  },
  {
    name: "Strawberry Milk",
    desc: "Susu strawberry segar dengan rasa manis menyegarkan.",
  },
  {
    name: "Taro Creamy",
    desc: "Minuman taro lembut dengan aroma khas dan tekstur creamy.",
  },
];

export default function KatalogMenu() {
  return (
    <>
      <PageMeta
        title="Katalog Menu | UMKM Rengginang Sabit"
        description="Katalog menu produk sederhana untuk customer/guest."
      />

      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Katalog Menu (Guest)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Menu Produk
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Halaman guest hanya menampilkan katalog produk sederhana.
          </p>

          <div className="mt-6 grid grid-cols-12 gap-4">
            {menus.map((item) => (
              <div
                key={item.name}
                className="col-span-12 sm:col-span-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
              >
                <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {item.name}
                </h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

