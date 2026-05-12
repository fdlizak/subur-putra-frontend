import { Trash2, Upload } from "lucide-react";

function EditProductModal({
  editProduct,
  setEditProduct,
  handleUpdate,
  previewImages,
  setPreviewImages,
}) {

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (!editProduct) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-[100]
        flex
        items-center
        justify-center
        p-5
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-xl
          p-6
          overflow-y-auto
          max-h-[90vh]
        "
      >
        <h2
          className="
            text-xl
            tracking-[3px]
            text-[#8B2C3A]
            mb-6
          "
        >
          EDIT PRODUCT
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            value={editProduct.nama}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                nama: e.target.value,
              })
            }
            className="w-full border p-3"
            placeholder="Nama"
          />

          <input
            type="text"
            value={editProduct.kode}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                kode: e.target.value,
              })
            }
            className="w-full border p-3"
            placeholder="Kode"
          />

          <input
            type="text"
            value={formatRupiah(editProduct.harga.toString())}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");

              setEditProduct({
                ...editProduct,
                harga: value,
              });
            }}
            className="w-full border p-3"
            placeholder="Harga"
          />

          <input
            type="text"
            value={editProduct.berat}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9.]/g, "");

              if (value.length === 1 && !value.includes(".")) {
                value = value + ".";
              }

              setEditProduct({
                ...editProduct,
                berat: value,
              });
            }}
            className="w-full border p-3"
            placeholder="Berat"
          />

          <select
            value={editProduct.kategori}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                kategori: e.target.value,
              })
            }
            className="w-full border p-3 bg-white"
          >
            <option value="Cincin">Cincin</option>
            <option value="Gelang">Gelang</option>
            <option value="Kalung">Kalung</option>
            <option value="Liontin">Liontin</option>
            <option value="Anting">Anting</option>
            <option value="Giwang">Giwang</option>
          </select>

          <input
            type="text"
            value={editProduct.kadar}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                kadar: e.target.value,
              })
            }
            className="w-full border p-3"
            placeholder="Kadar"
          />

          <select
            value={editProduct.warna}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                warna: e.target.value,
              })
            }
            className="w-full border p-3 bg-white"
          >
            <option value="Yellow Gold">Yellow Gold</option>
            <option value="Rose Gold">Rose Gold</option>
            <option value="Silver">Silver</option>
          </select>

          {/* PREVIEW */}
          <div className="grid grid-cols-3 gap-3">
            {previewImages.map((img, index) => (
              <div key={index} className="relative">

                <img
                  src={img.preview}
                  alt=""
                  className="
                    w-full
                    h-28
                    object-cover
                    border
                  "
                />

                <button
                  type="button"
                  onClick={() => {

                    const updated = [...previewImages];

                    updated.splice(index, 1);

                    setPreviewImages(updated);

                    setEditProduct({
                      ...editProduct,
                      newImages: updated.map((i) => i.file),
                    });

                  }}
                  className="
                    absolute
                    top-2
                    right-2
                    bg-red-500
                    text-white
                    p-1
                    rounded-full
                  "
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* UPLOAD */}
          {previewImages.length < 3 && (
            <label
              className="
                border-2
                border-dashed
                border-[#8B2C3A]
                p-6
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:bg-[#8B2C3A]/5
                transition-all
              "
            >
              <Upload
                size={32}
                className="text-[#8B2C3A] mb-2"
              />

              <span
                className="
                  text-sm
                  tracking-[2px]
                  text-[#8B2C3A]
                  uppercase
                "
              >
                Tambah Image
              </span>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {

                  const files = Array.from(e.target.files);

                  const remaining =
                    3 - previewImages.length;

                  const selectedFiles =
                    files.slice(0, remaining);

                  const newPreview =
                    selectedFiles.map((file) => ({
                      file,
                      preview:
                        URL.createObjectURL(file),
                    }));

                  const updatedImages = [
                    ...previewImages,
                    ...newPreview,
                  ];

                  setPreviewImages(updatedImages);

                  setEditProduct({
                    ...editProduct,
                    newImages: updatedImages.map(
                      (i) => i.file
                    ),
                  });

                }}
              />
            </label>
          )}

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => setEditProduct(null)}
            className="
              flex-1
              border
              py-3
            "
          >
            Batal
          </button>

          <button
            onClick={handleUpdate}
            className="
              flex-1
              bg-[#8B2C3A]
              text-white
              py-3
            "
          >
            Simpan
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditProductModal;