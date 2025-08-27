import { Route, Routes } from "react-router-dom";
import AuthorPage from "./pages/Author/AuthorPage";
import BookPage from "./pages/Book/BookPage";
import AppLayout from "./layouts/AppLayout";
import CreateBook from "./pages/Book/CreateBook";
import UpdateBook from "./pages/Book/UpdateBook";
import BookDetail from "./pages/Book/BookDetail";
import CreateAuthor from "./pages/Author/CreateAuthor";
import UpdateAuthor from "./pages/Author/UpdateAuthor";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route
          path="authors"
          element={<AuthorPage />}
        />

        <Route
          path="authors/create"
          element={<CreateAuthor />}
        />

        <Route
          path="authors/edit/:id"
          element={<UpdateAuthor />}
        />

        <Route
          path="books"
          element={<BookPage />}
        />
        <Route
          path="books/create"
          element={<CreateBook />}
        />

        <Route
          path="books/edit/:id"
          element={<UpdateBook />}
        />

        <Route
          path="books/:id"
          element={<BookDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
