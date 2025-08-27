import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">E-Library</h1>

        <div className="flex gap-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/authors"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Authors
          </Link>

          <Link
            to="/books"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Books
          </Link>
        </div>
      </div>
    </nav>
  );
}
