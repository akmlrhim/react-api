import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateBookForm } from "../../utils/validateBook";

export default function CreateBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author_id: "",
    description: "",
    published_year: "",
    published: "",
    pages: "",
    isbn: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:9000/api/authors");
        const data = await res.json();

        if (res.ok && Array.isArray(data.data)) {
          setAuthors(data.data);
        } else {
          setErrors({ api: data.message || "Gagal memuat authors" });
        }
      } catch (err) {
        setErrors({ api: "Terjadi kesalahan saat memuat authors", err });
      } finally {
        setLoadingAuthors(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateBookForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    const payload = {
      ...formData,
      author_id: Number(formData.author_id),
      published_year: formData.published_year,
      pages: formData.pages,
    };

    try {
      const response = await fetch("http://127.0.0.1:9000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/books", {
          state: { success: "Buku berhasil ditambahkan!" },
        });
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ api: result.message || "Gagal menambahkan buku" });
        }
      }
    } catch (err) {
      setErrors({ api: "Terjadi kesalahan: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tambah Buku Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi informasi buku yang ingin ditambahkan
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {errors.api && (
            <div className="mx-6 mt-6 rounded-md bg-red-50 border border-red-200 p-4">
              <span className="text-red-700 text-sm">
                {errors.api.charAt(0).toUpperCase() + errors.api.slice(1)}
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Buku
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul buku"
                className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                {loadingAuthors ? (
                  <div className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md bg-gray-50">
                    <span className="text-gray-500 text-sm">Loading...</span>
                  </div>
                ) : (
                  <select
                    name="author_id"
                    value={formData.author_id}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.author_id
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  >
                    <option value="">-- Pilih Author --</option>
                    {authors.map((a) => (
                      <option
                        key={a.id}
                        value={a.id}
                      >
                        {a.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.author_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.author_id}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun Terbit
                </label>
                <input
                  type="number"
                  name="published_year"
                  value={formData.published_year}
                  onChange={handleChange}
                  placeholder="2024"
                  className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.published_year
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.published_year && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.published_year}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Halaman
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  placeholder="300"
                  className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.pages
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.pages && (
                  <p className="mt-1 text-sm text-red-600">{errors.pages}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="978-602-xxxxx-x-x"
                  className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.isbn
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.isbn && (
                  <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penerbit
              </label>
              <input
                type="text"
                name="published"
                value={formData.published}
                onChange={handleChange}
                placeholder="Nama penerbit"
                className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.published
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.published && (
                <p className="mt-1 text-sm text-red-600">{errors.published}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tuliskan deskripsi singkat tentang buku ini..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="pt-4 flex gap-2">
              <Link
                to={"/books"}
                className="flex-1"
              >
                <button className="w-full py-3 bg-gray-600 text-white font-medium rounded-md transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-600">
                  Kembali
                </button>
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                {loading ? "Menyimpan..." : "Simpan Buku"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
