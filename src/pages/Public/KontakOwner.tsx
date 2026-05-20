import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";

const WHATSAPP_URL =
  "https://wa.me/628123456789?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";

export default function KontakOwner() {
  return (
    <>
      <PageMeta
        title="Kontak Owner | Rengginang Sabit"
        description="Hubungi owner Rengginang Sabit."
      />

      <div className="space-y-14">

        <section className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Kontak Owner
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-800 dark:text-white">
            Hubungi Kami
          </h1>

          <p className="mt-5 text-gray-500 dark:text-gray-400">
            Hubungi owner untuk pemesanan ataupun informasi produk.
          </p>

        </section>

        <section className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl dark:bg-white/[0.03]">

          <div className="text-7xl">
            📱
          </div>

          <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">
            WhatsApp Owner
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Klik tombol di bawah untuk terhubung langsung dengan owner.
          </p>

          <div className="mt-8">

            <Button
              size="md"
              onClick={() =>
                window.open(
                  WHATSAPP_URL,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Chat WhatsApp
            </Button>

          </div>

        </section>

      </div>
    </>
  );
}