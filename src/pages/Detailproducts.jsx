import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, BASE_URL } from "../services/api";
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);

      setActiveImg(data.images[0]);
    });
  }, [id]);
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const images = product.images || [];

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-2 gap-8">
      {/* LEFT: IMAGE */}
      <div>
        {/* IMAGE BESAR */}
        <div className="border border-gray-200 p-5 bg-white">
          <img src={`${BASE_URL}/uploads/${activeImg}`} alt={product.nama} className="w-full h-[500px] object-contain" />
        </div>

        {/* THUMBNAIL */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, i) => (
            <img key={i} src={`${BASE_URL}/uploads/${img}`} onClick={() => setActiveImg(img)} className={`cursor-pointer border p-2 ${activeImg === img ? "border-[#8B2C3A]" : "border-gray-200"}`} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col pt-4 pb-6 tracking-wide">
          <p className="text-sm text-gray-500 uppercase">{product.kadar} GOLD</p>

          <h2 className="text-2xl font-semibold leading-tight mt-2">{product.nama}</h2>

          <p className="text-2xl text-yellow-600 font-bold mt-2">{formatRupiah(product.harga)}</p>
        </div>
        <div className="border-gray-200 pb-6">
          <p className=" text-sm opacity-70"></p>
        </div>

        {/* SPESIFIKASI */}
        <div className="border-b pb-4 mt-4">
          <h3 className="text-sm tracking-wide font-semibold text-gray-700">SPESIFIKASI</h3>

          <div className="flex justify-between mt-4 text-gray-600 text-sm">
            <p>
              Kode Barang: <span className="font-semibold">{product.kode}</span>
            </p>
            <p>
              Berat Emas: <span className="font-semibold">{product.berat} Gram</span>
            </p>
          </div>
        </div>

        {/* WARNA (SECTION 2) */}
        <div className="pt-4">
          <p className="text-gray-600 text-sm">
            Warna Material: <span className="uppercase">{product.warna}</span>
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
            </div>
          </div>
        </div>
        <div className="border-gray-200 pb-6">
          <p className=" text-sm opacity-70"></p>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          {/* BUTTON 1 */}
          <button
            onClick={() => navigate("/resultcode", { state: product })}
            className="inline-flex items-center justify-center uppercase 
    bg-[#8B2C3A] border border-[#8B2C3A] text-white 
    shadow hover:shadow-md h-10 px-8 py-4 tracking-wider text-sm transition">
            Lihat di Etalase
          </button>

          {/* BUTTON 2 */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center uppercase 
    text-[#8B2C3A] border border-[#8B2C3A] bg-transparent 
    shadow-sm hover:bg-[#8B2C3A] hover:text-white 
    h-10 px-8 py-4 tracking-wider text-sm transition">
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
