import { useState } from "react";

export default function LawyerFormModal({
  lawyer,
  categories = [],
  onSave,
  onClose,
  title = "Add Lawyer",
}) {
  const [form, setForm] = useState({
    email: lawyer?.email || "",
    password: "",
    fullName: lawyer?.fullName || "",
    photoUrl: lawyer?.photoUrl || "",
    officeAddress: lawyer?.officeAddress || "",
    categoryId: lawyer?.CategoryId || "",
    bio: lawyer?.bio || "",
    education: lawyer?.education || "",
    consultationFee: lawyer?.consultationFee || 0,
    availableOnline: lawyer?.availableOnline || false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim()) return alert("Email wajib diisi");
    if (!lawyer && !form.password) return alert("Password wajib diisi");
    if (!form.fullName.trim()) return alert("Nama pengacara wajib diisi");
    if (!form.categoryId) return alert("Category wajib dipilih");

    onSave(form);
  };

  if (!onClose) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-5">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Account</h3>

            <input
              name="email"
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={handleChange}
            />

            {!lawyer && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input mt-2"
                value={form.password}
                onChange={handleChange}
              />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              Lawyer Information
            </h3>

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
              className="input mt-2"
              value={form.photoUrl}
              onChange={handleChange}
            />

            <input
              name="officeAddress"
              placeholder="Office Address"
              className="input mt-2"
              value={form.officeAddress}
              onChange={handleChange}
            />

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="input mt-2"
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
            <h3 className="font-semibold text-gray-700 mb-2">
              Professional Profile
            </h3>

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
              className="input mt-2"
              value={form.education}
              onChange={handleChange}
            />

            <input
              type="number"
              name="consultationFee"
              placeholder="Consultation Fee"
              className="input mt-2"
              value={form.consultationFee}
              onChange={handleChange}
            />

            <label className="flex items-center gap-2 mt-3 text-sm">
              <input
                type="checkbox"
                name="availableOnline"
                checked={form.availableOnline}
                onChange={handleChange}
              />
              Available Online Consultation
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Save Lawyer
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 10px;
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
