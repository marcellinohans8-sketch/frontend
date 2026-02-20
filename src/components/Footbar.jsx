import { Link } from "react-router";
export default function Footer() {
  return (
    <footer className="bg-slate-600 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>

          <p className="text-sm leading-relaxed text-gray-200">
            Hans Lawfirm merupakan firma hukum profesional yang menangani
            berbagai masalah hukum di Indonesia dengan layanan terpercaya dan
            berpengalaman.
          </p>

          <div className="flex gap-3 mt-5">
            <div className="bg-slate-500 w-9 h-9 rounded-full flex items-center justify-center">
              <i className="fa-brands fa-instagram"></i>
            </div>
            <div className="bg-slate-500 w-9 h-9 rounded-full flex items-center justify-center">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <div className="bg-slate-500 w-9 h-9 rounded-full flex items-center justify-center">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

          <ul className="space-y-3 text-sm text-gray-200">
            <li>📞 0822 3267 6203</li>
            <li>✉️ lawfirm.hans@gmail.com</li>
            <li>
              📍 Jl. Panglima Polim VII No.148, RT 06/04, Melawai, Kebayoran
              Baru, Jakarta Selatan
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <Link to="/" className="hover:text-white transition">
                Layanan Konsultasi
              </Link>
            </li>

            <li>
              <Link to="/our-legal" className="hover:text-white transition">
                Our Legal
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Our Location</h3>

          <p className="text-sm text-gray-200 mb-4">Hans Lawfirm Office</p>

          <div className="w-full h-40 rounded-lg overflow-hidden shadow">
            <iframe
              title="office-location"
              src="https://www.google.com/maps?q=Jl.%20Panglima%20Polim%20VII%20No.148%20Jakarta&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-500 text-center text-sm py-5 text-gray-200">
        © {new Date().getFullYear()} Hans Lawfirm. All Rights Reserved.
      </div>
    </footer>
  );
}
