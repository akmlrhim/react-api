export function validateBookForm(formData) {
  const newErrors = {};

  if (!formData.title) {
    newErrors.title = "Title is required";
  }
  if (!formData.author_id) {
    newErrors.author_id = "Author is required";
  }
  if (!formData.description) {
    newErrors.description = "Description is required";
  }
  if (!formData.published_year) {
    newErrors.published_year = "Published year is required";
  } else if (!/^\d{4}$/.test(formData.published_year)) {
    newErrors.published_year = "Published year must be 4 digits";
  }
  if (!formData.pages) {
    newErrors.pages = "Pages is required";
  } else if (isNaN(formData.pages)) {
    newErrors.pages = "Pages must be a number";
  }
  if (!formData.isbn) {
    newErrors.isbn = "ISBN is required";
  }
  if (!formData.published) {
    newErrors.published = "Publisher is required";
  }

  return newErrors;
}
