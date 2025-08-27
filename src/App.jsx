import { Link, Route, Routes } from "react-router-dom";
import AuthorPage from "./pages/Author/AuthorPage";
import BookPage from "./pages/Book/BookPage";
import AppLayout from "./layouts/AppLayout";
import CreateBook from "./pages/Book/CreateBook";

function App() {
  return (
    <Routes>
      {/* Parent route pakai AppLayout */}
      <Route
        path="/"
        element={<AppLayout />}
      >
        {/* nested routes */}
        <Route
          path="authors"
          element={<AuthorPage />}
        />
        <Route
          path="books"
          element={<BookPage />}
        />
        <Route
          path="books/create"
          element={<CreateBook />}
        />
      </Route>
    </Routes>
  );
}

export default App;
