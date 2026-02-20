import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Toastify from "toastify-js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BaseUrl from "../constant/BaseUrl";
import { fetchAsync } from "../features/lawyers/lawyerSlice";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { lawyer, loading, error } = useSelector((state) => state.lawyerSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync(id));
  }, [dispatch, id]);

  const rupiah = (num) => "Rp " + Number(num || 0).toLocaleString("id-ID");
  async function handlePayment() {
    try {
      if (!selectedPackage) return;

      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Silakan login terlebih dahulu");
        navigate("/login");
        return;
      }

      if (selectedPackage.price <= 0) {
        alert("Biaya konsultasi belum tersedia");
        return;
      }

      if (!window.snap) {
        alert("Payment gateway belum siap");
        return;
      }

      const { data } = await axios.post(
        `${BaseUrl}/payments/create-transaction`,
        {
          lawyerId: Number(id),
          duration: selectedPackage.duration,
          price: selectedPackage.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.snap.pay(data.token, {
        onSuccess: function () {
          alert("Pembayaran berhasil");
          navigate("/success");
        },
        onPending: function () {
          alert("Menunggu pembayaran");
        },
        onError: function () {
          alert("Pembayaran gagal");
        },
        onClose: function () {
          alert("Popup pembayaran ditutup");
        },
      });
    } catch (error) {
      console.log("ERROR PAYMENT:", error.response?.data);

      Toastify({
        text: error.response?.data?.message || "Gagal memulai pembayaran",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,#ff5f6d,#ffc371)",
        },
      }).showToast();
    }
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading detail...</p>
      </div>
    );
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }
  if (!lawyer?.id) {
    return <p className="p-10">Data tidak ditemukan</p>;
  }

  if (error) {
    return <p className="p-10 text-red-500">{error}</p>;
  }

  const profile = lawyer.User?.Profile;

  const packages = [
    {
      label: "30 Menit",
      duration: 30,
      price: profile?.consultationFee || 0,
    },
    {
      label: "60 Menit",
      duration: 60,
      price: (profile?.consultationFee || 0) * 2,
    },
    {
      label: "120 Menit",
      duration: 120,
      price: (profile?.consultationFee || 0) * 4,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 px-6">
        <div className="col-span-8 bg-white rounded-xl shadow p-8">
          <button onClick={() => navigate(-1)} className="mb-6 text-gray-500">
            ← Kembali
          </button>

          <div className="flex gap-6 items-center">
            <img
              src={lawyer.User?.photoUrl}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-semibold">{lawyer.User?.email}</h1>
              <p className="text-gray-500">Advokat</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Pendidikan</p>
              <p className="font-semibold">{profile?.education}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold">
                {profile?.availableOnline ? "Online" : "Offline"}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Biaya Konsultasi</p>
              <p className="font-semibold text-green-600">
                {rupiah(profile?.consultationFee)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2">Biografi</h2>
            <p className="text-gray-600">{profile?.bio}</p>
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-5">Pilih Paket</h2>

            <div className="space-y-4">
              {packages.map((pkg) => (
                <label
                  key={pkg.duration}
                  className={`border rounded-lg p-4 flex justify-between items-center cursor-pointer transition
            ${
              selectedPackage?.duration === pkg.duration
                ? "border-[#0f2d3a] bg-gray-50"
                : "hover:border-gray-400"
            }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedPackage?.duration === pkg.duration}
                      onChange={() => setSelectedPackage(pkg)}
                      className="w-5 h-5 accent-[#0f2d3a]"
                    />

                    <span>{pkg.label}</span>
                  </div>

                  <span className="font-semibold">{rupiah(pkg.price)}</span>
                </label>
              ))}
            </div>

            <button
              disabled={!selectedPackage}
              onClick={handlePayment}
              className={`w-full mt-6 py-3 rounded-lg text-white transition
    ${
      selectedPackage
        ? "bg-[#0f2d3a] hover:opacity-90"
        : "bg-gray-400 cursor-not-allowed"
    }
  `}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
