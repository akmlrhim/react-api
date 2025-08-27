import { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) <Loading message={`Memuat data penulis..`} />;

  if (error) <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Kelola Authors</h1>
        </div>
        <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
          <button className="px-3 py-2 bg-blue-800 text-white hover:bg-blue-700 rounded-md">
            Tambah Penulis
          </button>
        </div>
      </div>

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
                    <button className="px-3 py-1 bg-yellow-700 text-white hover:bg-yellow-600 rounded-md">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-700 text-white hover:bg-red-600 rounded-md">
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
    </div>
  );
}
