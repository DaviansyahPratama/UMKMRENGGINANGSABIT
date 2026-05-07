import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

const SHOPEE_URL = "https://shopee.co.id/";
const WHATSAPP_URL =
  "https://wa.me/628123456789?text=Halo%20Owner%2C%20saya%20ingin%20pemesanan%20rengginang.";

export default function PemesananOnline() {
  return (
    <>
      <PageMeta
        title="Pemesanan Online | UMKM Rengginang Sabit"
        description="Pemesanan online melalui Shopee atau WhatsApp."
      />
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
              onClick={() =>
                window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")
              }
            >
              Order via WhatsApp
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

