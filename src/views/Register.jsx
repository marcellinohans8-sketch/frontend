import { useState } from "react";
import axios from "axios";
import baseUrl from "../constant/BaseUrl";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/register`, { email, password });
      Toastify({
        text: "Success Register 🎉",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      navigate("/login");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Register Failed",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
      }).showToast();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-700 via-black to-teal-900 p-4">
      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-md border border-teal-500/40 rounded-2xl p-10 shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-serif text-teal-400 tracking-wide">
            IVP
          </h1>
          <p className="text-xs text-gray-400 tracking-[0.3em]">LAW FIRM</p>
        </div>

        <h2 className="text-3xl text-center font-semibold text-teal-300 mb-8">
          Daftar Akun
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="email@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full mt-1 px-4 py-3
                bg-slate-800
                border border-slate-600
                rounded-lg
                text-white
                focus:outline-none
                focus:border-teal-400
                focus:ring-2 focus:ring-teal-500/30
                transition
              "
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Create password"
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full mt-1 px-4 py-3
                bg-slate-800
                border border-slate-600
                rounded-lg
                text-white
                focus:outline-none
                focus:border-teal-400
                focus:ring-2 focus:ring-teal-500/30
                transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full py-3 mt-4
              bg-teal-500
              hover:bg-teal-600
              text-black
              font-semibold
              rounded-lg
              transition
              shadow-lg shadow-teal-500/20
            "
          >
            Daftar Akun Baru!
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-400 cursor-pointer hover:underline"
          >
            Masuk di sini!
          </span>
        </p>
      </div>
    </div>
  );
}
