import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";

const menus = [
  {
    name: "Rengginang Original",
    desc: "Rengginang gurih dengan cita rasa tradisional khas nusantara.",
    price: "Rp 15.000",
    icon: "🍘",
  },
  {
    name: "Rengginang Pedas",
    desc: "Perpaduan rasa gurih dan pedas yang bikin nagih.",
    price: "Rp 18.000",
    icon: "🌶️",
  },
  {
    name: "Rengginang Balado",
    desc: "Taburan bumbu balado dengan rasa khas Indonesia.",
    price: "Rp 20.000",
    icon: "🔥",
  },
  {
    name: "Rengginang BBQ",
    desc: "Rasa modern dengan aroma barbeque lezat.",
    price: "Rp 22.000",
    icon: "🍖",
  },
];

export default function KatalogMenu() {
  return (
    <>
      <PageMeta
        title="Katalog Produk | Rengginang Sabit"
        description="Katalog produk UMKM Rengginang Sabit."
      />

      <div className="space-y-8">

        {/* HEADER */}
        <div>

          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Katalog Produk
          </h1>

          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            Nikmati berbagai varian rengginang premium favorit pelanggan.
          </p>

        </div>

        {/* GRID PRODUK */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {menus.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-white/[0.03]"
            >

              {/* IMAGE */}
              <div className="flex h-52 items-center justify-center bg-amber-100">
                <span className="text-7xl">
                  {item.icon}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {item.name}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-xl font-bold text-amber-700">
                    {item.price}
                  </span>

                  <Button size="sm">
                    Detail
                  </Button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}