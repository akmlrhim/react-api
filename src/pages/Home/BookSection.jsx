import { useEffect, useState } from "react";
import BookCoverDefault from "../../assets/books.webp";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link } from "react-router-dom";

export default function BookSection() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <Loading message="Memuat data buku." />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">List Buku</h1>
      </div>

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
                    to={`/book_detail/${book.id}`}
                    className="flex-1"
                  >
                    <button className="w-full px-3 py-2 bg-green-600 text-white text-sm hover:bg-green-500 rounded-md">
                      Detail
                    </button>
                  </Link>
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
    </div>
  );
}
