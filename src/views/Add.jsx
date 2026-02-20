import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../constant/BaseUrl";
import { useNavigate } from "react-router";
import Toastify from "toastify-js";

export default function Add() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "consultationFee" || name === "categoryId"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      Toastify({
        text: "Full Name wajib diisi",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#F87171",
        },
      }).showToast();

      return;
    }
    try {
      console.log(form);
      console.log("TOKEN:", localStorage.getItem("access_token"));
      const payload = {
        CategoryId: form.categoryId,
        fullName: form.fullName,
        officeAddress: form.officeAddress,
        photoUrl: form.photoUrl,
        bio: form.bio,
        education: form.education,
        consultationFee: form.consultationFee,
        availableOnline: form.availableOnline,
      };

      await axios.post(`${baseUrl}/lawyers`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Toastify({
        text: "Succeed tambah data",
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
        <h1 className="text-2xl font-semibold mb-6">Add New Lawyer</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="font-semibold mb-3 text-gray-700">
              Account Information
            </h2>

            <input
              name="email"
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input mt-3"
              value={form.password}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Bio"
              className="input"
              value={form.bio}
              onChange={handleChange}
            />

            <input
              name="education"
              placeholder="Education"
              className="input mt-3"
              value={form.education}
              onChange={handleChange}
            />

            <input
              type="number"
              name="consultationFee"
              placeholder="Consultation Fee"
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

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add Lawyer
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
