export function validateAuthor(formData) {
  const newErrors = {};

  if (!formData.name) {
    newErrors.name = "Name is required";
  }

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    newErrors.email = "Invalid email address";
  }

  if (!formData.gender) {
    newErrors.gender = "Gender is required";
  } else if (!["L", "P"].includes(formData.gender)) {
    newErrors.gender = "Invalid gender";
  }

  if (!formData.age) {
    newErrors.age = "Age is required";
  } else if (isNaN(formData.age) || formData.age <= 0) {
    newErrors.age = "Age must be a positive number";
  }

  return newErrors;
}
