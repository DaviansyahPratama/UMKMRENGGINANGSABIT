import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import product from "../../data/product";

export default function KatalogMenu() {
  return (
    <>
      <PageMeta
        title="Katalog Menu | Rengginang Sabit"
        description="Daftar produk Rengginang Sabit"
      />

      <div className="space-y-14">

        <section className="text-center">

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            Produk Premium
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-800 dark:text-white">
            Katalog Menu
          </h1>

          <p className="mt-5 text-gray-500 dark:text-gray-400">
            Pilihan rengginang premium khas nusantara.
          </p>

        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

          {product.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-white/[0.03]"
            >

              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {item.name}
                </h2>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-2xl font-extrabold text-amber-600">
                    {item.price}
                  </span>

                  <Button size="sm">
                    Detail
                  </Button>

                </div>

              </div>

            </div>
          ))}

        </section>

      </div>
    </>
  );
}