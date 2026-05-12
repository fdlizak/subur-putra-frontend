import { useState } from "react";
import axios from "axios";
import { Upload, X } from "lucide-react";

function Admin() {
  const [form, setForm] = useState({
    nama: "",
    kode: "",
    harga: "",
    berat: "",
    kategori: "",
    kadar: "",
    warna: "",
  });

  const [images, setImages] = useState([]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "harga") {
      setForm({
        ...form,
        harga: formatRupiah(value),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // handle image
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // gabungkan image lama + baru
    const updatedImages = [...images, ...files];

    // max 3
    if (updatedImages.length > 3) {
      alert("Maksimal 3 gambar");
      return;
    }

    setImages(updatedImages);
  };
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);

    setImages(updated);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // append text
      Object.keys(form).forEach((key) => {
        if (key === "harga") {
          formData.append(key, form[key].replace(/[^0-9]/g, ""));
        } else {
          formData.append(key, form[key]);
        }
      });

      // append image
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await axios.post("http://localhost:3000/products", formData);

      alert("Produk berhasil ditambahkan 🚀");

      // reset
      setForm({
        nama: "",
        kode: "",
        harga: "",
        berat: "",
        kategori: "",
        kadar: "",
        warna: "",
      });

      setImages([]);
    } catch (err) {
      console.log(err);
      alert("Gagal upload");
    }
  };
  const formatRupiah = (value) => {
    const number = value.replace(/\D/g, "");

    if (!number) return "";

    return "Rp " + new Intl.NumberFormat("id-ID").format(number);
  };
  const handleBeratChange = (e) => {
    let value = e.target.value;

    // kalau cuma angka tanpa titik
    if (/^\d+$/.test(value)) {
      value = value + ".";
    }

    setForm({
      ...form,
      berat: value,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] px-5 py-10">
      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="text-2xl tracking-[4px] text-[#8B2C3A]">TAMBAH BARANG</h1>

        <p className="text-gray-500 mt-2 text-sm">Tambahkan koleksi produk emas terbaru</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 shadow-sm" autoComplete="off">
        <div className="grid md:grid-cols-2 gap-5">
          {/* KATEGORI */}
          <div>
            <label className="text-sm text-gray-600">Kategori</label>

            <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full border p-3 mt-2 outline-none bg-white" required>
              <option value="">Pilih Kategori</option>

              <option value="Cincin">Cincin</option>
              <option value="Gelang">Gelang</option>
              <option value="Kalung">Kalung</option>
              <option value="Liontin">Liontin</option>
              <option value="Anting">Anting</option>
              <option value="Giwang">Giwang</option>
            </select>
          </div>

          {/* NAMA */}
          <div>
            <label className="text-sm text-gray-600">Nama Barang</label>

            <input type="text" name="nama" value={form.nama} onChange={handleChange} className="w-full border p-3 mt-2 outline-none" required />
          </div>

          {/* BERAT */}
          <div>
            <label className="text-sm text-gray-600">Berat</label>

            <input type="text" inputMode="decimal" name="berat" value={form.berat} onChange={handleBeratChange} autoComplete="off" placeholder="0.00" className="w-full border p-3 mt-2 outline-none" />
          </div>

          {/* HARGA */}
          <div>
            <label className="text-sm text-gray-600">Harga</label>

            <input type="text" name="harga" value={form.harga} onChange={handleChange} autoComplete="off" placeholder="Rp" className="w-full border p-3 mt-2 outline-none" />
          </div>

          {/* KODE */}
          <div>
            <label className="text-sm text-gray-600">Kode</label>

            <input type="text" name="kode" value={form.kode} onChange={handleChange} className="w-full border p-3 mt-2 outline-none" required />
          </div>

          {/* KADAR */}
          <div>
            <label className="text-sm text-gray-600">Kadar / Karat</label>

            <input type="text" name="kadar" value={form.kadar} onChange={handleChange} className="w-full border p-3 mt-2 outline-none" required />
          </div>

          {/* WARNA */}
          <div>
            <label className="text-sm text-gray-600">Warna</label>

            <select name="warna" value={form.warna} onChange={handleChange} className="w-full border p-3 mt-2 outline-none bg-white" required>
              <option value="">Pilih Warna</option>

              <option value="Yellow Gold">Yellow Gold</option>

              <option value="Rose Gold">Rose Gold</option>

              <option value="Silver">Silver</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-600">Upload Gambar</label>

            {/* PREVIEW */}
            <div className="flex gap-3 mt-3 flex-wrap">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="
          relative
          w-24
          h-24
          border
          bg-gray-50
          overflow-hidden
        ">
                  <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="
            absolute
            top-1
            right-1
            bg-white
            border
            w-6
            h-6
            flex
            items-center
            justify-center
          ">
                    <X size={14} />
                  </button>
                </div>
              ))}

              {/* UPLOAD BUTTON */}
              {images.length < 3 && (
                <label
                  className="
          w-24
          h-24
          border
          border-dashed
          flex
          flex-col
          items-center
          justify-center
          cursor-pointer
          text-gray-400
          hover:border-[#8B2C3A]
          hover:text-[#8B2C3A]
          transition-all
        ">
                  <Upload size={20} />

                  <span className="text-[10px] mt-2 tracking-[1px]">UPLOAD</span>

                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-3">Maksimal 3 gambar</p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            mt-8
            bg-[#8B2C3A]
            text-white
            px-8
            py-3
            tracking-[2px]
            text-sm
          ">
          TAMBAH
        </button>
      </form>
    </div>
  );
}

export default Admin;
