import { Pencil, Trash2 } from "lucide-react";
import { formatRupiah } from "../../utils/formatRupiah";

function ProductCard({ item, navigate, isAdmin, setEditProduct, handleDelete }) {
  return (
    <div
      onClick={() => navigate(`/products/${item.id}`)}
      className="
        group
        cursor-pointer
        text-center
        border
        border-transparent
        transition-all
        duration-300
        active:border-[#8B2C3A]
        p-4
      ">
      <div className="overflow-hidden mb-6">
        <img
          src={item.image ? `http://localhost:3000/uploads/${item.image}` : "/no-image.png"}
          alt={item.nama}
          className="
            w-full
            h-[320px]
            object-contain
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      <h4 className="text-sm tracking-[1px] uppercase text-gray-800">{item.nama}</h4>

      <p className="text-sm mt-2 text-[#8B2C3A]">{formatRupiah(item.harga)}</p>

      {isAdmin && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditProduct(item);
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              border
              border-[#8B2C3A]
              text-[#8B2C3A]
              py-2
              text-[11px]
              tracking-[1px]
              uppercase
              hover:bg-[#8B2C3A]
              hover:text-white
              transition-all
            ">
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              border
              border-red-500
              text-red-500
              py-2
              text-[11px]
              tracking-[1px]
              uppercase
              hover:bg-red-500
              hover:text-white
              transition-all
            ">
            <Trash2 size={14} />
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
