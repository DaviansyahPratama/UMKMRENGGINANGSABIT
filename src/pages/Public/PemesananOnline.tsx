import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
<<<<<<< HEAD
import { Link } from "react-router-dom"; // Diselaraskan menggunakan react-router-dom seperti layout lainnya

const SHOPEE_URL = "https://shopee.co.id/";
const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20melakukan%20pemesanan%20online.";
=======
import { Link } from "react-router";

const SHOPEE_URL = "https://shopee.co.id/";
const WHATSAPP_URL =
  "https://wa.me/628123456789?text=Halo%20Owner%2C%20saya%20ingin%20pemesanan%20rengginang.";
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd

export default function PemesananOnline() {
  return (
    <>
      <PageMeta
        title="Pemesanan Online | UMKM Rengginang Sabit"
        description="Pemesanan online melalui Shopee atau WhatsApp."
      />
<<<<<<< HEAD
      
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
=======
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Pemesanan Online (KF10)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Pilih Platform Pemesanan
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Sistem akan mengarahkan Anda ke platform yang dipilih.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              size="md"
              onClick={() => window.open(SHOPEE_URL, "_blank", "noopener,noreferrer")}
              startIcon={
                <span className="inline-flex w-2 h-2 rounded-full bg-brand-500" />
              }
            >
              Order via Shopee
            </Button>
            <Button
              size="md"
              variant="outline"
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
              onClick={() =>
                window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
              }
            >
              Order via WhatsApp
<<<<<<< HEAD
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
=======
            </Button>
          </div>

          <div className="mt-6">
            <Link
              to="/kontak-owner"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
            >
              Butuh bantuan? Kontak Owner di sini.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
