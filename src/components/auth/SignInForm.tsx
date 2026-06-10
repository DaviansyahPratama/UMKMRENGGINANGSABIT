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
    <div className="flex flex-col flex-1 w-full">
      <div className="w-full max-w-md pt-8 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-orange-200/70 transition-colors hover:text-orange-300"
        >
          <ChevronLeftIcon className="size-5" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-amber-300 text-2xl">
            Login Admin
          </h1>
          <p className="text-sm text-orange-100/70">
            Masukkan username dan password untuk mengakses sistem manajemen.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <Label>
                Username <span className="text-orange-300">*</span>
              </Label>
              <Input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/30 border-orange-400/20 text-white placeholder-orange-200/30 focus:border-orange-300 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <Label>
                Password <span className="text-orange-300">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/30 border-orange-400/20 text-white placeholder-orange-200/30 focus:border-orange-300 focus:ring-orange-500/20"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-orange-300 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-orange-300 size-5" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="block text-sm text-orange-100/70">
                  Ingat saya
                </span>
              </div>
              <span className="text-xs text-orange-200/50">Admin Only</span>
            </div>

            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold"
              size="sm"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
