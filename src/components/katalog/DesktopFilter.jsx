import { Plus } from "lucide-react";

function DesktopFilter({
  dropdownRef,
  openDropdown,
  setOpenDropdown,
  selectedKadar,
  selectedKategori,
  selectedBerat,
  selectedHarga,
  toggleKadar,
  toggleKategori,
  toggleBerat,
  toggleHarga,
  sortBy,
  setSortBy,
  isAdmin,
  navigate,
}) {
  return (
    <div
      className="
        hidden
        md:block
        sticky
        top-16
        z-20
        backdrop-blur
        bg-white/90
        border-t-2
        border-[#8B2C3A]
        shadow-sm
      "
    >
      <div
        ref={dropdownRef}
        className="
          px-8
          md:px-16
          py-5
          flex
          justify-between
          items-center
          text-[13px]
          tracking-wide
          text-gray-700
        "
      >
        {/* LEFT */}
        <div className="flex gap-6">

          {/* KADAR */}
          <div className="relative">
            <span
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "kadar"
                    ? null
                    : "kadar"
                )
              }
              className="
                cursor-pointer
                hover:text-[#8B2C3A]
              "
            >
              KADAR ▾
            </span>

            {openDropdown === "kadar" && (
              <div
                className="
                  absolute
                  top-full
                  mt-3
                  bg-white
                  border
                  shadow-lg
                  p-4
                  w-48
                "
              >
                {["TUA", "MUDA"].map((item) => (
                  <label
                    key={item}
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >
                    {item}

                    <input
                      type="checkbox"
                      checked={selectedKadar.includes(item)}
                      onChange={() => toggleKadar(item)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* KATEGORI */}
          <div className="relative">
            <span
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "kategori"
                    ? null
                    : "kategori"
                )
              }
              className="
                cursor-pointer
                hover:text-[#8B2C3A]
              "
            >
              KATEGORI ▾
            </span>

            {openDropdown === "kategori" && (
              <div
                className="
                  absolute
                  top-full
                  mt-3
                  bg-white
                  border
                  shadow-lg
                  p-4
                  w-48
                "
              >
                {[
                  "gelang",
                  "anting",
                  "cincin",
                  "kalung",
                  "liontin",
                ].map((item) => (
                  <label
                    key={item}
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >
                    {item}

                    <input
                      type="checkbox"
                      checked={selectedKategori.includes(item)}
                      onChange={() =>
                        toggleKategori(item)
                      }
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* BERAT */}
          <div className="relative">
            <span
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "berat"
                    ? null
                    : "berat"
                )
              }
              className="
                cursor-pointer
                hover:text-[#8B2C3A]
              "
            >
              BERAT ▾
            </span>

            {openDropdown === "berat" && (
              <div
                className="
                  absolute
                  top-full
                  mt-3
                  bg-white
                  border
                  shadow-lg
                  p-4
                  w-48
                "
              >
                {[
                  "1 GRAM",
                  "2 GRAM",
                  "3 GRAM",
                  "4 GRAM",
                  "5 GRAM",
                ].map((item) => (
                  <label
                    key={item}
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >
                    {item}

                    <input
                      type="checkbox"
                      checked={selectedBerat.includes(item)}
                      onChange={() =>
                        toggleBerat(item)
                      }
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* HARGA */}
          <div className="relative">
            <span
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "harga"
                    ? null
                    : "harga"
                )
              }
              className="
                cursor-pointer
                hover:text-[#8B2C3A]
              "
            >
              HARGA ▾
            </span>

            {openDropdown === "harga" && (
              <div
                className="
                  absolute
                  top-full
                  mt-3
                  bg-white
                  border
                  shadow-lg
                  p-4
                  w-64
                "
              >
                {[
                  "< 1 JT",
                  "1 - 2 JT",
                  "2 - 3 JT",
                  "3 - 5 JT",
                  "> 5 JT",
                ].map((item) => (
                  <label
                    key={item}
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >
                    {item}

                    <input
                      type="checkbox"
                      checked={selectedHarga.includes(item)}
                      onChange={() =>
                        toggleHarga(item)
                      }
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SORT */}
        <div className="flex items-center gap-4">

          <span
            onClick={() =>
              setOpenDropdown(
                openDropdown === "sort"
                  ? null
                  : "sort"
              )
            }
            className="
              cursor-pointer
              hover:text-[#8B2C3A]
            "
          >
            URUTKAN: {sortBy} ▾
          </span>

          {openDropdown === "sort" && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-3
                bg-white
                border
                shadow-lg
                p-4
                w-56
              "
            >
              {[
                "TERBARU",
                "HARGA TERTINGGI",
                "HARGA TERENDAH",
              ].map((item) => (
                <label
                  key={item}
                  className="
                    flex
                    justify-between
                    mb-2
                  "
                >
                  {item}

                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === item}
                    onChange={() =>
                      setSortBy(item)
                    }
                  />
                </label>
              ))}
            </div>
          )}

          {isAdmin && (
            <button
              onClick={() =>
                navigate("/addproducts")
              }
              className="
                flex
                items-center
                gap-2
                border
                border-[#8B2C3A]
                px-4
                py-2
                text-[11px]
                tracking-[2px]
                uppercase
                text-[#8B2C3A]
                hover:bg-[#8B2C3A]
                hover:text-white
                transition-all
              "
            >
              <Plus size={14} />
              Tambah Barang
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesktopFilter;