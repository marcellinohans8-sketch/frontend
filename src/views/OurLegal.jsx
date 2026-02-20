import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BaseUrl from "../constant/BaseUrl";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import { isAdmin } from "../helpers/auth";
export default function OurLegal() {
  const admin = isAdmin();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    rating: null,
    minPrice: "",
    maxPrice: "",
  });
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  function toggleRating(rate) {
    setSelectedRating((prev) => (prev === rate ? null : rate));
  }

  async function fetchLawyers() {
    try {
      setLoading(true);

      const { data } = await axios.get(`${BaseUrl}/pub/lawyers`);
      console.log(data.data);
      setLawyers(data.data);
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Gagal mengambil data",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#ff5f6d,#ffc371)",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }
  async function handleAiSearch() {
    try {
      if (!aiQuestion) return;

      setAiLoading(true);

      const { data } = await axios.post(
        `${BaseUrl}/ai/recommend`,
        { question: aiQuestion },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      setAiResult(data.result);
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "AI gagal memproses",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#ff5f6d,#ffc371)",
        },
      }).showToast();
    } finally {
      setAiLoading(false);
    }
  }

  useEffect(() => {
    fetchLawyers();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: scrollPosition.current,
      behavior: "instant",
    });
  }, [appliedFilters]);

  const filteredLawyers = lawyers.filter((l) => {
    const isOnline = l.User?.Profile?.availableOnline;
    const rating = Math.floor(l.rating || 0);
    const price = l.User?.Profile?.consultationFee || 0;

    if (onlineOnly && !isOnline) return false;

    if (appliedFilters.rating !== null && rating !== appliedFilters.rating)
      return false;

    if (appliedFilters.minPrice && price < appliedFilters.minPrice)
      return false;

    if (appliedFilters.maxPrice && price > appliedFilters.maxPrice)
      return false;

    return true;
  });

  const rupiah = (num) => {
    if (!num) return "Belum tersedia";
    return "Rp " + Number(num).toLocaleString("id-ID");
  };
  const scrollPosition = useRef(0);
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-6">
        <div className="col-span-3">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filter</h2>
              <button
                onClick={() => {
                  setOnlineOnly(false);
                  setSelectedRating(null);
                  setMinPrice("");
                  setMaxPrice("");
                  setAppliedFilters({
                    rating: null,
                    minPrice: "",
                    maxPrice: "",
                  });
                }}
                className="text-green-600 text-sm hover:underline"
              >
                Hapus semua
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-medium">Online</span>

              <button
                onClick={() => setOnlineOnly(!onlineOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition
          ${onlineOnly ? "bg-green-500" : "bg-gray-300"}
        `}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
            ${onlineOnly ? "translate-x-5" : ""}
          `}
                />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Rating</h3>

              {[5, 4, 3, 2, 1].map((rate) => (
                <label
                  key={rate}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRating === rate}
                    onChange={() => toggleRating(rate)}
                    className="accent-green-600"
                  />

                  <span>{"⭐".repeat(rate)}</span>
                </label>
              ))}
            </div>

            <hr className="my-6" />

            <div>
              <h3 className="font-semibold mb-3">Range Harga</h3>

              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Harga Minimum"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <input
                  type="number"
                  placeholder="Harga Maksimum"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <button
              onClick={() => {
                scrollPosition.current = window.scrollY;

                setAppliedFilters({
                  rating: selectedRating,
                  minPrice,
                  maxPrice,
                });
              }}
              className="w-full mt-6 bg-[#0f2d3a] text-white py-3 rounded-lg font-semibold hover:bg-[#133a4a]"
            >
              Tampilkan Mitra
            </button>
          </div>
        </div>

        <div className="col-span-9 space-y-5">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold text-lg mb-3">
              🤖 Cari Lawyer dengan AI
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Contoh: Saya butuh lawyer perceraian biaya murah"
                className="flex-1 border rounded-lg px-3 py-2"
              />

              <button
                onClick={handleAiSearch}
                className="bg-green-600 text-white px-5 rounded-lg"
              >
                {aiLoading ? "Loading..." : "Cari"}
              </button>
            </div>

            {aiResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line">
                {aiResult}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              Menampilkan {filteredLawyers.length} Mitra
            </h1>

            {admin && (
              <button
                onClick={() => navigate("/add")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                + Add Lawyer
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredLawyers.map((lawyer) => {
              console.log("LAWYER DATA:", lawyer);

              const fullName = lawyer.fullName || "Nama belum tersedia";

              const category =
                lawyer.Category?.name || "Kategori belum tersedia";

              const address = lawyer.officeAddress || "-";

              const fee = lawyer.User?.Profile?.consultationFee;

              const isOnline = lawyer.User?.Profile?.availableOnline;

              let imageSrc = "https://placehold.co/80x80";

              if (lawyer.photoUrl) {
                imageSrc = lawyer.photoUrl.startsWith("http")
                  ? lawyer.photoUrl
                  : `${BaseUrl}/${lawyer.photoUrl}`;
              }

              return (
                <div
                  key={lawyer.id}
                  className="bg-white rounded-xl shadow p-6 flex justify-between items-center hover:shadow-lg transition"
                >
                  {/* LEFT */}
                  <div className="flex gap-5">
                    <img
                      src={imageSrc}
                      alt={fullName}
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80";
                      }}
                    />

                    <div>
                      <h3 className="font-semibold text-lg">{fullName}</h3>

                      <p className="text-gray-500 text-sm">{category}</p>

                      <p className="text-sm text-gray-500">{address}</p>

                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-yellow-500">
                          ⭐ {lawyer.rating ?? "-"}
                        </span>

                        {isOnline ? (
                          <span className="text-green-600 font-semibold">
                            ● Online
                          </span>
                        ) : (
                          <span className="text-gray-400">● Offline</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Mulai Dari</p>

                    <p className="text-green-600 font-bold text-lg mb-3">
                      {rupiah(fee)}
                    </p>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => navigate(`/detail/${lawyer.id}`)}
                        className="bg-[#0f2d3a] text-white px-5 py-2 rounded-lg"
                      >
                        Chat Sekarang
                      </button>

                      {admin && (
                        <>
                          <button
                            onClick={() => navigate(`/edit/${lawyer.id}`)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => navigate(`/delete/${lawyer.id}`)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
