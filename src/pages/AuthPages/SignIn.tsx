import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In Admin | Rengginang Sabit"
        description="Halaman masuk eksklusif manajemen pusat UMKM Rengginang Sabit."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}