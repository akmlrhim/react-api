import { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { Link, Links, useLocation, useNavigate } from "react-router-dom";

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showModal, setShowModal] = useState(false); // modal state
  const [deleteBookId, setDeleteBookId] = useState(null); // id buku yg akan dihapus

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const res = await fetch("http://127.0.0.1:9000/api/authors");
        const json = await res.json();

        if (json.status !== "success") {
          throw new Error(json.message || "Gagal memuat data");
        }

        setAuthors(json.data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }

    fetchAuthors();
  }, []);

  const handleDelete = async () => {
    if (!deleteBookId) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:9000/api/authors/${deleteBookId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((book) => book.id !== deleteBookId)
        );
        setSuccessMessage(data.message || "Penulis berhasil dihapus!");
      } else {
        alert(data.message || "Gagal menghapus penulis.");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setShowModal(false);
      setDeleteBookId(null);
    }
  };

  if (loading) <Loading message={`Memuat data penulis..`} />;

  if (error) <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Kelola Authors</h1>
        </div>
        <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
          <Link to={"/authors/create"}>
            <button className="px-3 py-2 bg-blue-800 text-white hover:bg-blue-700 rounded-md">
              Tambah Penulis
            </button>
          </Link>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700">
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Usia
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author, index) => (
                <tr
                  key={author.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex font-medium">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{author.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {author.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {author.gender == "L" ? "Laki-Laki" : "Perempuan"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {author.age} tahun
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-2">
                    <Link
                      to={`/authors/edit/${author.id}`}
                      className="flex-1"
                    >
                      <button className="px-3 py-1 bg-yellow-700 text-white hover:bg-yellow-600 rounded-md">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteBookId(author.id);
                        setShowModal(true);
                      }}
                      className="px-3 py-1 bg-red-700 text-white hover:bg-red-600 rounded-md"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {authors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada data penulis
            </h3>
            <p className="text-gray-500">
              Data penulis akan muncul di sini setelah ditambahkan
            </p>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-6">
              Apakah Anda yakin ingin menghapus penulis ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
