import { NavLink, useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();

    Toastify({
      text: "Berhasil logout",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: {
        background: "#1e3a5f",
        color: "#d4af37",
        fontWeight: "600",
      },
    }).showToast();

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#1e3a5f] px-10 py-5 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-3xl text-[#d4af37]">⚖</span>
        <span className="text-3xl font-bold tracking-widest text-[#d4af37]">
          LAW FIRM
        </span>
      </div>

      <div className="flex items-center gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-[#d4af37] pb-1"
              : "text-white hover:text-[#d4af37] transition duration-300"
          }
        >
          BERANDA
        </NavLink>

        <NavLink
          to="/consultation"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-[#d4af37] pb-1"
              : "text-white hover:text-[#d4af37] transition duration-300"
          }
        >
          LAYANAN KONSULTASI
        </NavLink>

        <NavLink
          to="/our-legal"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-[#d4af37] pb-1"
              : "text-white hover:text-[#d4af37] transition duration-300"
          }
        >
          OUR LEGAL
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b-2 border-[#d4af37] pb-1"
              : "text-white hover:text-[#d4af37] transition duration-300"
          }
        >
          ABOUT
        </NavLink>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleLogout}
          className="text-red-400 font-semibold hover:text-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
