import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import axios from "axios";
import baseUrl from "../constant/BaseUrl";
import loadingGif from "../assets/loading.svg";

export default function Home() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchLawyers() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/pub/lawyers`);
      setLawyers(data.data);
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Terjadi kesalahan",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#F87171",
          color: "black",
          border: "2px solid black",
          borderRadius: "8px",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLawyers();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <img src={loadingGif} className="w-32 opacity-80" alt="loading" />
        </div>
      ) : (
        <>
          {/* HERO / ABOUT */}
          <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-indigo-600 font-semibold uppercase tracking-widest">
                Tentang Kami
              </p>

              <h1 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Platform Hukum Digital
                <span className="block text-indigo-700">
                  Modern & Terpercaya
                </span>
              </h1>

              <p className="text-slate-600 text-lg mt-6 leading-relaxed">
                MyLaw menghubungkan klien dengan advokat profesional secara
                real-time melalui teknologi digital untuk memberikan akses hukum
                yang mudah, cepat, dan terpercaya.
              </p>

              <button className="mt-8 px-8 py-3 bg-indigo-900 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition">
                Konsultasi Sekarang
              </button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                className="rounded-3xl shadow-2xl"
                alt="company"
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-indigo-200 rounded-3xl"></div>
            </div>
          </section>

          {/* VISI MISI */}
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div className="grid md:grid-cols-2 gap-10">
              {/* VISI */}
              <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
                <h2 className="text-3xl font-bold text-indigo-900 mb-4">
                  Visi
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Mewujudkan sistem hukum yang adil, transparan, dan mudah
                  diakses oleh seluruh masyarakat melalui teknologi digital
                  modern.
                </p>
              </div>

              {/* MISI */}
              <div className="bg-indigo-900 text-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
                <h2 className="text-3xl font-bold mb-4">Misi</h2>
                <ul className="space-y-3 text-indigo-100">
                  <li>✓ Menghubungkan klien dengan advokat terpercaya</li>
                  <li>✓ Memberikan layanan hukum cepat & efisien</li>
                  <li>✓ Memanfaatkan teknologi untuk akses hukum nasional</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FOUNDERS */}
          <section className="max-w-7xl mx-auto py-20 px-6 text-center">
            <h2 className="text-4xl font-bold text-slate-900">Para Pendiri</h2>

            <p className="text-slate-500 mt-4 mb-14">
              Profesional hukum yang membangun Hukumku
            </p>

            <div className="flex flex-wrap justify-center gap-10">
              {lawyers.slice(0, 2).map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 w-72"
                >
                  <div className="relative flex justify-center">
                    <img
                      src={`${lawyer.photoUrl}-/format/auto/`}
                      alt={lawyer.fullName}
                      className="w-36 h-36 object-cover rounded-full border-4 border-indigo-100 group-hover:border-indigo-400 transition"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-6 text-slate-800">
                    {lawyer.fullName}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {lawyer.officeAddress}
                  </p>

                  <div className="mt-3 text-amber-400 font-semibold text-lg">
                    {lawyer.rating}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
