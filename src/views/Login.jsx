import { useState } from "react";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";
import axios from "axios";
import baseUrl from "../constant/BaseUrl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();

      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      localStorage.setItem("access_token", response.data.access_token);
      Toastify({
        text: "Succeed Login",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
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
          Masuk ke Akun Anda
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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
            Masuk
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-400 cursor-pointer hover:underline"
          >
            Daftar di sini
          </span>
        </p>
      </div>
    </div>
  );
}
