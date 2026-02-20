import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../constant/BaseUrl";

const ADMIN_WA = "6281311259851";

export default function Consultation() {
  const [lawyers, setLawyers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    lawyerId: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/pub/lawyers`);
        setLawyers(res.data.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLawyers();
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.lawyerId ||
      !form.title ||
      !form.message
    ) {
      alert("Semua field wajib diisi");
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const selectedLawyer = lawyers.find((l) => l.id == form.lawyerId);

    const text = `
Halo Admin,

Saya ingin konsultasi hukum.

Nama: ${form.name}
Email: ${form.email}
No HP: ${form.phone}
Pengacara: ${selectedLawyer?.fullName}
Judul: ${form.title}

Pesan:
${form.message}
  `;

    const waUrl = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");

    alert("Konsultasi berhasil dikirim!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-900">
              Konsultasi Hukum
            </h1>
            <p className="text-slate-500 mt-2">
              Isi formulir berikut untuk memulai konsultasi dengan advokat
              profesional
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="name"
                placeholder="Nama Lengkap"
                value={form.name}
                onChange={handleChange}
                className="input-style"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="input-style"
              />
            </div>

            <input
              name="phone"
              placeholder="No. HP / WhatsApp"
              value={form.phone}
              onChange={handleChange}
              className="input-style"
            />

            <select
              name="lawyerId"
              value={form.lawyerId}
              onChange={handleChange}
              className="input-style"
            >
              <option value="">Pilih Pengacara</option>
              {lawyers.map((lawyer) => (
                <option key={lawyer.id} value={lawyer.id}>
                  {lawyer.fullName}
                </option>
              ))}
            </select>

            <input
              name="title"
              placeholder="Judul Konsultasi"
              value={form.title}
              onChange={handleChange}
              className="input-style"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Jelaskan permasalahan hukum Anda..."
              value={form.message}
              onChange={handleChange}
              className="input-style resize-none"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-indigo-900 text-white font-semibold text-lg
            shadow-lg hover:shadow-xl hover:scale-[1.02]
            active:scale-[0.98]
            transition duration-300"
            >
              Kirim Konsultasi via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
