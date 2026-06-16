import PageMeta from "../../components/common/PageMeta";

const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";

export default function KontakOwner() {
  return (
    <>
      <PageMeta
        title="Kontak Owner | Rengginang Sabit"
        description="Hubungi owner Rengginang Sabit."
      />

      <div className="min-h-screen bg-black text-white pt-28 px-6 pb-20">

        {/* HEADER */}
        <section className="text-center">

          <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700 shadow">
            Kontak Owner
          </span>

          <h1 className="mt-6 text-5xl font-extrabold">
            <span className="text-white">Hubungi</span>{" "}
            <span className="text-amber-400">Kami</span>
          </h1>

          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
            Informasi lebih lanjut tentang produk, pemesanan, atau pertanyaan lainnya? Jangan ragu untuk menghubungi owner resmi Rengginang Sabit melalui WhatsApp di bawah ini.
          </p>

        </section>

        {/* CARD */}
        <section className="mx-auto mt-14 max-w-2xl">

          <div
            className="
              rounded-3xl
              bg-slate-800
              border
              border-amber-400
              p-12
              text-center
              shadow-xl
              transition-all
              duration-300
              hover:shadow-amber-500/20
            "
          >

            <div className="text-7xl">
              📱
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              WhatsApp Owner
            </h2>

            <p className="mt-4 text-gray-300 max-w-md mx-auto leading-relaxed">
              Klik tombol di bawah untuk terhubung langsung
              dengan owner resmi Rengginang Sabit melalui WhatsApp.
            </p>

            <div className="mt-8">

              <button
                onClick={() =>
                  window.open(
                    WHATSAPP_URL,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="
                  rounded-xl
                  bg-amber-400
                  px-8
                  py-3
                  font-bold
                  text-slate-900
                  shadow-lg
                  transition
                  hover:bg-amber-500
                "
              >
                Chat WhatsApp
              </button>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}