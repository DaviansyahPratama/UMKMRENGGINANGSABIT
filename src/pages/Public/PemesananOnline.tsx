import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router-dom"; // Diselaraskan menggunakan react-router-dom seperti layout lainnya

const SHOPEE_URL = "https://shopee.co.id/";
const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20melakukan%20pemesanan%20online.";

export default function PemesananOnline() {
  return (
    <>
      <PageMeta
        title="Pemesanan Online | UMKM Rengginang Sabit"
        description="Pemesanan online melalui Shopee atau WhatsApp."
      />
      
      {/* Container utama berlatar hitam pekat, diberikan padding top agar pas di bawah navbar absolute */}
      <div className="space-y-6 bg-black text-white min-h-screen pt-28 px-6 pb-20">
        
        {/* Breadcrumb bawaan proyek Anda */}
        <PageBreadcrumb pageTitle="Pemesanan Online (KF10)" />

        {/* Kotak pilihan platform dirubah menjadi rounded-none dengan border transparan tipis */}
        <div className="rounded-none border border-white/10 bg-white/[0.02] p-8 max-w-4xl mx-auto shadow-2xl">
          
          <h3 className="text-xl font-serif font-bold text-[#E2A929] uppercase tracking-wide">
            Pilih Platform Pemesanan
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Sistem akan mengarahkan Anda langsung ke platform resmi pilihan Anda.
          </p>

          {/* Tombol-tombol kustom dengan gaya kotak tegas tanpa melengkung */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 text-xs font-bold tracking-widest uppercase">
            
            {/* Tombol Shopee menggunakan warna Marun Utama Logo */}
            <button
              className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-8 py-4 transition duration-300 shadow-md flex items-center justify-center gap-2"
              onClick={() => window.open(SHOPEE_URL, "_blank", "noopener,noreferrer")}
            >
              <span className="inline-flex w-2 h-2 rounded-full bg-[#E2A929]" />
              Order via Shopee
            </button>
            
            {/* Tombol WhatsApp menggunakan border warna Emas Logo */}
            <button
              className="rounded-none border border-[#E2A929] text-[#E2A929] bg-transparent hover:bg-[#E2A929] hover:text-black px-8 py-4 transition duration-300 flex items-center justify-center"
              onClick={() =>
                window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
              }
            >
              Order via WhatsApp
            </button>
          </div>

          {/* Link Bantuan / Kontak Owner */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <Link
              to="/kontak" // Disesuaikan ke rute halaman kontak owner publik Anda
              className="text-xs font-bold tracking-wider uppercase text-gray-400 hover:text-[#E2A929] transition duration-200"
            >
              Butuh bantuan? Kontak Owner di sini &rarr;
            </Link>
          </div>

        </div>

      </div>
    </>
  );
}