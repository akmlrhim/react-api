import { useEffect, useState } from "react";
import BookCoverDefault from "../../assets/books.webp";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function BookPage() {
  const [books, setBooks] = useState([]);
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

  // fetch data buku
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch("http://127.0.0.1:9000/api/books");
        const json = await res.json();

        if (json.status !== "success") {
          throw new Error(json.message || "Gagal memuat data.");
        }

        setBooks(json.data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, []);

  const handleDelete = async () => {
    if (!deleteBookId) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:9000/api/books/${deleteBookId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== deleteBookId)
        );
        setSuccessMessage(data.message || "Buku berhasil dihapus!");
      } else {
        alert(data.message || "Gagal menghapus buku.");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setShowModal(false);
      setDeleteBookId(null);
    }
  };

  if (loading) return <Loading message="Memuat data buku." />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buku</h1>
        <Link to="/books/create">
          <button className="px-4 py-2 bg-blue-800 text-white hover:bg-blue-700 rounded-lg shadow-md">
            Tambah Buku
          </button>
        </Link>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700">
          {successMessage}
        </div>
      )}

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-56 w-full bg-gray-100 flex items-center justify-center">
                <img
                  src={BookCoverDefault}
                  alt={book.title}
                  className="object-cover h-full w-full"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Penulis:</span>{" "}
                  {book.author?.name || "Tidak diketahui"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Tahun:</span>{" "}
                  {book.published_year}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Penerbit:</span>{" "}
                  {book.published}
                </p>

                <div className="mt-auto flex gap-2">
                  <Link
                    to={`/books/${book.id}`}
                    className="flex-1"
                  >
                    <button className="w-full px-3 py-2 bg-green-600 text-white text-sm hover:bg-green-500 rounded-md">
                      Detail
                    </button>
                  </Link>

                  <Link
                    to={`/books/edit/${book.id}`}
                    className="flex-1"
                  >
                    <button className="w-full px-3 py-2 bg-yellow-600 text-white text-sm hover:bg-yellow-500 rounded-md">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      setDeleteBookId(book.id);
                      setShowModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm hover:bg-red-500 rounded-md"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Belum ada data buku
          </h3>
          <p className="text-gray-500">
            Data buku akan muncul di sini setelah ditambahkan
          </p>
        </div>
      )}

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-6">Apakah Anda yakin ingin menghapus buku ini?</p>
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
