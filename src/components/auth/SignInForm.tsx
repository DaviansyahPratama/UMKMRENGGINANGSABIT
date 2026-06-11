import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const ok = login({ username, password });
    if (ok) {
      navigate("/dashboard");
      return;
    }

    setError("Username atau password salah.");
  };

  return (
    // DIUBAH: Menghilangkan border kotak kaku dan shadow tebal karena layoutnya sudah membatasi di kanan
    <div className="w-full bg-transparent py-4">
      
      {/* Tombol Kembali */}
      <div className="mb-6">
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:text-orange-600"
        >
          <ChevronLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* Header Section */}
      <div className="mb-7">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">
          Login <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Admin</span>
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
          Silakan masuk untuk mengelola dan memantau seluruh aktivitas sistem manajemen Rengginang Sabit.
        </p>
      </div>

      {/* Alert Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-center text-xs font-semibold text-red-600 animate-in fade-in-50 duration-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          
          {/* Input Username */}
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block pl-0.5">
              Username
            </Label>
            <Input
              type="text"
              placeholder="Masukkan username admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 !bg-zinc-100/70 px-4 py-3 text-sm !text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-orange-500 focus:!bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          {/* Input Password */}
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block ml-0.5">
              Password
            </Label>
            <div className="relative flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 !bg-zinc-100/70 py-3 pl-4 pr-12 text-sm !text-zinc-900 placeholder-zinc-400 transition-all duration-200 focus:border-orange-500 focus:!bg-white focus:ring-4 focus:ring-orange-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 flex h-full items-center px-4 text-zinc-400 transition-colors hover:text-orange-500 focus:outline-none z-10"
              >
                {showPassword ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeCloseIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Opsi Tambahan */}
          <div className="flex items-center justify-between pt-1">
            <label className="group flex select-none items-center gap-2.5 cursor-pointer">
              <Checkbox 
                checked={isChecked} 
                onChange={setIsChecked} 
                className="rounded border-zinc-300 bg-white text-orange-500 focus:ring-orange-500/20 focus:ring-offset-white"
              />
              <span className="text-xs font-semibold text-zinc-500 transition-colors group-hover:text-zinc-800">
                Ingat saya
              </span>
            </label>
            <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 ring-1 ring-inset ring-zinc-200">
              Admin Only
            </span>
          </div>

          {/* Tombol Submit */}
          <Button
            className="w-full mt-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 bg-[length:200%_auto] py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-orange-500/10 transition-all duration-300 hover:bg-right hover:shadow-orange-500/20 active:scale-[0.985]"
            size="md"
          >
            Masuk ke Dashboard
          </Button>
          
        </div>
      </form>
    </div>
  );
}