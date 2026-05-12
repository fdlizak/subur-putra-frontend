const BASE_URL =
  import.meta.env.VITE_API_URL;

export const getProducts =
  async () => {

    const res =
      await fetch(
        `${BASE_URL}/products`
      );

    return res.json();

};

export const getProductById =
  async (id) => {

    const res =
      await fetch(
        `${BASE_URL}/products/${id}`
      );

    return res.json();

};

export const getHeroImages =
  async () => {

    const res =
      await fetch(
        `${BASE_URL}/hero/images`
      );

    return res.json();

};

export const getHeroContent =
  async () => {

    const res =
      await fetch(
        `${BASE_URL}/hero/content`
      );

    return res.json();

};

export { BASE_URL };