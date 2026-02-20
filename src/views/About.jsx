import { useEffect, useState } from "react";

export default function About() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("http://localhost:3000/pub/lawyers");
        const data = await res.json();
        setLawyers(data.data ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 tracking-wide">
          About HANS Law Firm
        </h1>

        <p className="max-w-3xl mx-auto text-gray-200 leading-relaxed text-sm md:text-base">
          HANS Law Firm merupakan firma hukum profesional yang berkomitmen
          memberikan layanan hukum berkualitas tinggi dengan pendekatan
          strategis, efektif, dan terpercaya. Kami membantu individu maupun
          perusahaan menghadapi tantangan hukum secara tepat dan profesional.
        </p>

        <p className="mt-6 text-sm text-gray-300">
          +62 21 567 145 • info@hanslawfirm.co.id
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Menjadi firma hukum terpercaya yang memberikan solusi hukum
            inovatif, profesional, dan berintegritas tinggi bagi klien di
            tingkat nasional maupun internasional.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>Memberikan layanan hukum berkualitas tinggi.</li>
            <li>Mengutamakan integritas dan profesionalisme.</li>
            <li>Menyediakan solusi hukum strategis bagi klien.</li>
            <li>Membangun hubungan jangka panjang berbasis kepercayaan.</li>
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto pb-24 px-6">
        <h2 className="text-center text-3xl font-semibold mb-14">
          Meet Our Lawyers
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {lawyers
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 2)
            .map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  {/* IMAGE */}
                  <div className="h-full">
                    <img
                      src={lawyer.photoUrl}
                      alt={lawyer.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400x500?text=Lawyer")
                      }
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold">{lawyer.fullName}</h3>

                    <p className="text-gray-500 text-sm mt-1">
                      {lawyer.officeAddress}
                    </p>

                    <div className="mt-3 text-yellow-500 text-sm">
                      ⭐ {lawyer.rating}
                    </div>

                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                      Advokat profesional dengan pengalaman luas dalam litigasi,
                      hukum bisnis, dan konsultasi hukum strategis untuk klien
                      individu maupun korporasi.
                    </p>

                    <div className="border-t mt-5 pt-4">
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✔ Konsultan Hukum Profesional</li>
                        <li>✔ Spesialis Hukum Bisnis</li>
                        <li>✔ Anggota PERADI</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
