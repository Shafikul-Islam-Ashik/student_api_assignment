/**
 * create slug
 */
export const createSlug = (productName) => {
  // Remove special characters and spaces, convert to lowercase
  const cleanedName = productName.replace(/[^\w\s]/gi, "").toLowerCase();

  // Replace spaces with hyphens
  const slug = cleanedName.replace(/\s+/g, "-");

  return slug;
};
