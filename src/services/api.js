const BASE_URL = "http://localhost:3000";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);

  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  return res.json();
};

export { BASE_URL };
