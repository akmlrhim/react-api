import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import BookCoverDefault from "../../assets/books.webp";

export default function DetailBookSection() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`http://127.0.0.1:9000/api/books/${id}`);
        const data = await res.json();

        if (res.ok && data.data) {
          setBook(data.data);
        } else {
          throw new Error(data.message || "Buku tidak ditemukan");
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat memuat data");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) return <Loading message="Memuat detail buku..." />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Detail Buku</h1>
        <div className="flex gap-2">
          <Link to="/">
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Kembali
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={BookCoverDefault}
            alt={book.title}
            className="object-cover h-64 w-full"
          />
        </div>

        <div className="md:w-2/3 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {book.title}
          </h2>

          <div className="bg-gray-50 bg-opacity-70 rounded-lg p-4 shadow-inner">
            <h3 className="font-medium text-gray-700 mb-2">Detail Buku</h3>
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700 w-1/3">
                    Tahun Terbit
                  </td>
                  <td className="py-2 text-gray-800">{book.published_year}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700">Penerbit</td>
                  <td className="py-2 text-gray-800">{book.published}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700">
                    Jumlah Halaman
                  </td>
                  <td className="py-2 text-gray-800">{book.pages}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700">ISBN</td>
                  <td className="py-2 text-gray-800">{book.isbn}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 p-4 bg-white rounded-md shadow-inner">
              <h4 className="font-medium text-gray-700 mb-1">Deskripsi</h4>
              <p className="text-gray-800">{book.description || "-"}</p>
            </div>
          </div>

          <div className="bg-gray-50 bg-opacity-70 rounded-lg p-4 shadow-inner mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Detail Penulis</h3>
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700 w-1/3">Nama</td>
                  <td className="py-2 text-gray-800">
                    {book.author?.name || "-"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700">Gender</td>
                  <td className="py-2 text-gray-800">
                    {book.author?.gender === "L" ? "Laki-laki" : "Perempuan"}
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 font-medium text-gray-700">Email</td>
                  <td className="py-2 text-gray-800">
                    {book.author?.email || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
