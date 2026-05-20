import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

const WHATSAPP_URL =
  "https://wa.me/628123456789?text=Halo%20Owner%2C%20saya%20ingin%20bertanya%20atau%20pesan%20rengginang.";

export default function KontakOwner() {
  return (
    <>
      <PageMeta
        title="Kontak Owner | UMKM Rengginang Sabit"
        description="Hubungi Owner melalui WhatsApp untuk bertanya atau melakukan pemesanan."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Kontak Owner (KF11)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Kontak WhatsApp Owner
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Klik tombol di bawah untuk menghubungkan Anda dengan WhatsApp Owner.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button
              size="md"
              onClick={() =>
                window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
              }
              startIcon={<span className="inline-flex w-2 h-2 rounded-full bg-brand-500" />}
            >
              Buka WhatsApp
            </Button>
            <Link
              to="/pemesanan"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              Kembali ke Pemesanan Online
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

