import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";

<<<<<<< HEAD
// Menggunakan nomor telepon resmi yang tertera langsung pada logo fisik Anda
const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";
=======
const WHATSAPP_URL =
  "https://wa.me/628123456789?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd

export default function KontakOwner() {
  return (
    <>
      <PageMeta
        title="Kontak Owner | Rengginang Sabit"
        description="Hubungi owner Rengginang Sabit."
      />

<<<<<<< HEAD
      {/* Menggunakan kelas bg-black agar mulus di bawah navbar absolute */}
      <div className="space-y-14 bg-black text-white min-h-screen pt-28 px-6 pb-20">

        {/* SECTION HEADER */}
        <section className="text-center space-y-4">

          {/* Badge diubah dari hijau bulat menjadi kotak warna emas logo */}
          <span className="inline-block rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#E2A929] backdrop-blur">
            Kontak Owner
          </span>

          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white uppercase tracking-wider">
            Hubungi Kami
          </h1>

          <p className="max-w-md mx-auto text-xs tracking-wider uppercase text-gray-400">
=======
      <div className="space-y-14">

        <section className="text-center">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Kontak Owner
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-800 dark:text-white">
            Hubungi Kami
          </h1>

          <p className="mt-5 text-gray-500 dark:text-gray-400">
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
            Hubungi owner untuk pemesanan ataupun informasi produk.
          </p>

        </section>

<<<<<<< HEAD
        {/* SECTION KARTU KONTAK */}
        {/* Mengubah bg-white menjadi transparan gelap dengan border tipis dan rounded-none */}
        <section className="mx-auto max-w-2xl rounded-none bg-white/[0.02] border border-white/10 p-12 text-center shadow-2xl">

          <div className="text-6xl select-none">
            📱
          </div>

          <h2 className="mt-6 text-3xl font-serif font-bold text-white uppercase tracking-wide">
            WhatsApp Owner
          </h2>

          <p className="mt-4 text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Klik tombol di bawah untuk terhubung langsung dengan manajemen resmi Rengginang Sabit.
          </p>

          <div className="mt-8 flex justify-center">

            {/* Menggunakan tombol kustom kotak dengan warna marun khas logo */}
            <button
              className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white font-bold text-xs tracking-widest uppercase px-10 py-4 transition duration-300 shadow-lg"
=======
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
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
              onClick={() =>
                window.open(
                  WHATSAPP_URL,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Chat WhatsApp
<<<<<<< HEAD
            </button>
=======
            </Button>
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd

          </div>

        </section>

      </div>
    </>
  );
}