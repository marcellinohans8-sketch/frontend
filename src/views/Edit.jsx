import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../constant/BaseUrl";
import { useNavigate, useParams } from "react-router";
import Toastify from "toastify-js";

export default function Edit() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("PARAM ID:", id);
  const [form, setForm] = useState({
    fullName: "",
    photoUrl: "",
    officeAddress: "",
    categoryId: "",
    bio: "",
    education: "",
    consultationFee: 0,
    availableOnline: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/pub/categories`);
        setCategories(data.data ?? []);
      } catch (err) {
        console.log(err.response?.data);
        console.log(err);
      }
    };

    const fetchLawyerDetail = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          alert("Silakan login dulu");
          navigate("/login");
          return;
        }

        const { data } = await axios.get(`${baseUrl}/lawyers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const lawyer = data.data;

        setForm({
          fullName: lawyer.User?.fullName || "",
          photoUrl: lawyer.User?.photoUrl || "",
          officeAddress: lawyer.officeAddress || "",
          categoryId: String(lawyer.Category?.id || ""),
          bio: lawyer.User?.Profile?.bio || "",
          education: lawyer.User?.Profile?.education || "",
          consultationFee: lawyer.User?.Profile?.consultationFee || 0,
          availableOnline: lawyer.User?.Profile?.availableOnline || false,
        });
      } catch (err) {
        console.log(err.response?.data);
      }
    };
    fetchCategories();
    fetchLawyerDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "consultationFee"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        CategoryId: Number(form.categoryId),
        fullName: form.fullName,
        officeAddress: form.officeAddress,
        photoUrl: form.photoUrl,
        bio: form.bio,
        education: form.education,
        consultationFee: form.consultationFee,
        availableOnline: form.availableOnline,
      };

      await axios.put(`${baseUrl}/lawyers/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Toastify({
        text: "berhasil update data",
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
      navigate("/our-legal");
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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold mb-6">Edit Lawyer</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="font-semibold mb-3 text-gray-700">
              Lawyer Information
            </h2>

            <input
              name="fullName"
              placeholder="Full Name"
              className="input"
              value={form.fullName}
              onChange={handleChange}
            />

            <input
              name="photoUrl"
              placeholder="Photo URL"
              className="input mt-3"
              value={form.photoUrl}
              onChange={handleChange}
            />

            <input
              name="officeAddress"
              placeholder="Office Address"
              className="input mt-3"
              value={form.officeAddress}
              onChange={handleChange}
            />

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="input mt-3"
            >
              <option value="">-- Pilih Category --</option>

              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="font-semibold mb-3 text-gray-700">
              Professional Profile
            </h2>

            <textarea
              name="bio"
              className="input"
              value={form.bio}
              onChange={handleChange}
            />

            <input
              name="education"
              className="input mt-3"
              value={form.education}
              onChange={handleChange}
            />

            <input
              type="number"
              name="consultationFee"
              className="input mt-3"
              value={form.consultationFee}
              onChange={handleChange}
            />

            <label className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                name="availableOnline"
                checked={form.availableOnline}
                onChange={handleChange}
              />
              Available Online Consultation
            </label>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Update Lawyer
          </button>
        </form>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            outline: none;
          }

          .input:focus {
            border-color: black;
          }
        `}
      </style>
    </div>
  );
}
