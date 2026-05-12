export const filterProducts = (products, selectedKategori, selectedKadar, selectedBerat, selectedHarga, minPrice, maxPrice, sortBy) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .filter((item) => {
      if (selectedKategori.length > 0 && !selectedKategori.includes(item.kategori)) {
        return false;
      }

      if (selectedKadar.length > 0) {
        const kadarNumber = parseFloat(item.kadar);

        const isTua = kadarNumber >= 10;
        const isMuda = kadarNumber < 10;

        const match = (selectedKadar.includes("TUA") && isTua) || (selectedKadar.includes("MUDA") && isMuda);

        if (!match) return false;
      }

      if (selectedBerat.length > 0) {
        const match = selectedBerat.some((b) => {
          const selectedNumber = parseFloat(b);
          const beratNumber = parseFloat(item.berat);

          return Math.abs(selectedNumber - beratNumber) < 0.1;
        });

        if (!match) return false;
      }

      const matchHarga = (harga, range) => {
        switch (range) {
          case "< 1 JT":
            return harga < 1000000;

          case "1 - 2 JT":
            return harga >= 1000000 && harga <= 2000000;

          case "2 - 3 JT":
            return harga >= 2000000 && harga <= 3000000;

          case "3 - 5 JT":
            return harga >= 3000000 && harga <= 5000000;

          case "> 5 JT":
            return harga > 5000000;

          default:
            return true;
        }
      };

      if (minPrice && item.harga < parseInt(minPrice)) {
        return false;
      }

      if (maxPrice && item.harga > parseInt(maxPrice)) {
        return false;
      }

      if (selectedHarga.length > 0) {
        const match = selectedHarga.some((range) => matchHarga(item.harga, range));

        if (!match) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "HARGA TERTINGGI") {
        return b.harga - a.harga;
      }

      if (sortBy === "HARGA TERENDAH") {
        return a.harga - b.harga;
      }

      if (sortBy === "TERBARU") {
        return b.id - a.id;
      }

      return 0;
    });
};
