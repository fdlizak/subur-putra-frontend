import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* ================= API ================= */
import { getProducts } from "../services/api";

/* ================= COMPONENTS ================= */
import ProductCard from "../components/katalog/ProductCard";
import DesktopFilter from "../components/katalog/DesktopFilter";
import MobileFilter from "../components/katalog/MobileFilter";
import FilterBadge from "../components/katalog/FilterBadge";
import EditProductModal from "../components/katalog/EditProductModal";

/* ================= UTILS ================= */
import { filterProducts } from "../utils/filterProducts";

function Katalog() {
  /* ================= STATE ================= */

  const [products, setProducts] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const [openSection, setOpenSection] = useState(null);

  const [sortBy, setSortBy] = useState("TERBARU");

  const [editProduct, setEditProduct] = useState(null);

  const [previewImages, setPreviewImages] = useState([]);

  const [searchParams] = useSearchParams();

  /* ================= FILTER STATE ================= */

  const [selectedKategori, setSelectedKategori] = useState(() => {
    const kategori = searchParams.get("kategori");

    return kategori ? [kategori] : [];
  });

  const [selectedKadar, setSelectedKadar] = useState([]);

  const [selectedBerat, setSelectedBerat] = useState([]);

  const [selectedHarga, setSelectedHarga] = useState([]);

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  /* ================= REF ================= */

  const dropdownRef = useRef();

  /* ================= NAVIGATION ================= */

  const navigate = useNavigate();

  /* ================= AUTH ================= */

  const isAdmin = sessionStorage.getItem("adminToken") === "suburputra-admin";

  /* ================= GET PRODUCTS ================= */

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  /* ================= CLOSE DROPDOWN ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openDropdown === "mobileFilter" || openDropdown === "mobileSort") {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  /* ================= TOGGLE FILTER ================= */

  const toggleKategori = (item) => {
    setSelectedKategori((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const toggleKadar = (item) => {
    setSelectedKadar((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const toggleBerat = (item) => {
    setSelectedBerat((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const toggleHarga = (item) => {
    setSelectedHarga((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  /* ================= TOGGLE MOBILE SECTION ================= */

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = filterProducts(products, selectedKategori, selectedKadar, selectedBerat, selectedHarga, minPrice, maxPrice, sortBy);

  /* ================= ACTIVE FILTER ================= */

  const activeFilters = [...selectedKadar, ...selectedKategori, ...selectedBerat, ...selectedHarga];

  /* ================= REMOVE FILTER ================= */

  const removeFilter = (item) => {
    setSelectedKategori((prev) => prev.filter((i) => i !== item));

    setSelectedKadar((prev) => prev.filter((i) => i !== item));

    setSelectedBerat((prev) => prev.filter((i) => i !== item));

    setSelectedHarga((prev) => prev.filter((i) => i !== item));
  };

  /* ================= CLEAR FILTER ================= */

  const clearAllFilters = () => {
    setSelectedKategori([]);
    setSelectedKadar([]);
    setSelectedBerat([]);
    setSelectedHarga([]);

    setMinPrice("");
    setMaxPrice("");
  };

  /* ================= UPDATE PRODUCT ================= */

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("nama", editProduct.nama);

      formData.append("kode", editProduct.kode);

      formData.append("harga", editProduct.harga.toString().replace(/[^0-9]/g, ""));

      formData.append("berat", editProduct.berat);

      formData.append("kategori", editProduct.kategori);

      formData.append("kadar", editProduct.kadar);

      formData.append("warna", editProduct.warna);

      if (editProduct.newImages) {
        for (let i = 0; i < editProduct.newImages.length; i++) {
          formData.append("images", editProduct.newImages[i]);
        }
      }

      const response = await fetch(`http://localhost:3000/products/${editProduct.id}`, {
        method: "PUT",

        headers: {
          admin_token: sessionStorage.getItem("adminToken"),
        },

        body: formData,
      });

      const data = await response.json();

      console.log(data);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= DELETE PRODUCT ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Hapus produk ini?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= RENDER ================= */

  return (
    <>
      {/* DESKTOP FILTER */}
      <DesktopFilter
        dropdownRef={dropdownRef}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        selectedKadar={selectedKadar}
        selectedKategori={selectedKategori}
        selectedBerat={selectedBerat}
        selectedHarga={selectedHarga}
        toggleKadar={toggleKadar}
        toggleKategori={toggleKategori}
        toggleBerat={toggleBerat}
        toggleHarga={toggleHarga}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isAdmin={isAdmin}
        navigate={navigate}
      />

      {/* MOBILE FILTER */}
      <MobileFilter
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        openSection={openSection}
        toggleSection={toggleSection}
        selectedKadar={selectedKadar}
        selectedKategori={selectedKategori}
        selectedBerat={selectedBerat}
        selectedHarga={selectedHarga}
        toggleKadar={toggleKadar}
        toggleKategori={toggleKategori}
        toggleBerat={toggleBerat}
        toggleHarga={toggleHarga}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearAllFilters={clearAllFilters}
      />

      {/* FILTER BADGE */}
      <FilterBadge activeFilters={activeFilters} removeFilter={removeFilter} clearAllFilters={clearAllFilters} />

      {/* PRODUCT CONTENT */}
      <div className="px-8 md:px-16">
        <p
          className="
            mt-6
            text-sm
            text-gray-600
          ">
          {filteredProducts.length} Produk
        </p>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-x-4
            gap-y-8
            mt-4
          ">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} navigate={navigate} isAdmin={isAdmin} setEditProduct={setEditProduct} handleDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      <EditProductModal editProduct={editProduct} setEditProduct={setEditProduct} handleUpdate={handleUpdate} previewImages={previewImages} setPreviewImages={setPreviewImages} />
    </>
  );
}

export default Katalog;
