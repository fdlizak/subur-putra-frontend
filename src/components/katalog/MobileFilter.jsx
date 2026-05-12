function MobileFilter({
  openDropdown,
  setOpenDropdown,
  openSection,
  toggleSection,

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

  clearAllFilters,
}) {
  return (
    <>
      {/* MOBILE TOOLBAR */}
      <div
        className="
          md:hidden
          sticky
          top-16
          z-20
          bg-white
          border-t
          border-b
          flex
          text-sm
        ">
        <button
          onClick={() => setOpenDropdown(openDropdown === "mobileFilter" ? null : "mobileFilter")}
          className="
            flex-1
            py-3
            border-r
          ">
          FILTER
        </button>

        <button
          onClick={() => setOpenDropdown(openDropdown === "mobileSort" ? null : "mobileSort")}
          className="
            flex-1
            py-3
          ">
          URUTKAN:
          <span className="text-[#8B2C3A]"> {sortBy}</span>
        </button>
      </div>

      {/* MOBILE FILTER */}
      {openDropdown === "mobileFilter" && (
        <div
          className="
            fixed
            inset-0
            bg-white
            z-[60]
            p-5
            overflow-y-auto
            transition-all
            duration-300
          ">
          <div
            className="
              flex
              justify-between
              items-center
              mb-6
            ">
            <h2
              className="
                text-sm
                tracking-[2px]
                text-[#C89B3C]
                font-medium
              ">
              FILTER
            </h2>

            <button onClick={() => setOpenDropdown(null)}>✕</button>
          </div>

          {/* KADAR */}
          <div className="border-b">
            <div
              onClick={() => toggleSection("kadar")}
              className="
                flex
                justify-between
                items-center
                py-4
                cursor-pointer
              ">
              <span
                className="
                  text-xs
                  tracking-[2px]
                  text-gray-600
                ">
                Kadar
              </span>

              <span
                className={`
                  transition-transform
                  duration-200
                  ${openSection === "kadar" ? "rotate-180" : ""}
                `}>
                ▾
              </span>
            </div>

            {openSection === "kadar" && (
              <div className="pb-3">
                {["TUA", "MUDA"].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      justify-between
                      py-2
                    ">
                    <span
                      className="
                        text-sm
                        text-gray-700
                      ">
                      {item}
                    </span>

                    <input type="checkbox" checked={selectedKadar.includes(item)} onChange={() => toggleKadar(item)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KATEGORI */}
          <div className="border-b">
            <div
              onClick={() => toggleSection("kategori")}
              className="
                flex
                justify-between
                items-center
                py-4
                cursor-pointer
              ">
              <span
                className="
                  text-xs
                  tracking-[2px]
                  text-gray-600
                ">
                Kategori
              </span>

              <span
                className={`
                  transition-transform
                  duration-200
                  ${openSection === "kategori" ? "rotate-180" : ""}
                `}>
                ▾
              </span>
            </div>

            {openSection === "kategori" && (
              <div className="pb-3">
                {["Gelang", "Anting", "Cincin", "Kalung"].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      justify-between
                      py-2
                    ">
                    <span
                      className="
                        text-sm
                        text-gray-700
                      ">
                      {item}
                    </span>

                    <input type="checkbox" checked={selectedKategori.includes(item)} onChange={() => toggleKategori(item)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BERAT */}
          <div className="border-b">
            <div
              onClick={() => toggleSection("berat")}
              className="
                flex
                justify-between
                items-center
                py-4
                cursor-pointer
              ">
              <span
                className="
                  text-xs
                  tracking-[2px]
                  text-gray-600
                ">
                Berat
              </span>

              <span
                className={`
                  transition-transform
                  duration-200
                  ${openSection === "berat" ? "rotate-180" : ""}
                `}>
                ▾
              </span>
            </div>

            {openSection === "berat" && (
              <div className="pb-3">
                {["1 GRAM", "2 GRAM", "3 GRAM", "4 GRAM", "5 GRAM"].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      justify-between
                      py-2
                    ">
                    <span
                      className="
                        text-sm
                        text-gray-700
                      ">
                      {item}
                    </span>

                    <input type="checkbox" checked={selectedBerat.includes(item)} onChange={() => toggleBerat(item)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HARGA */}
          <div className="border-b">
            <div
              onClick={() => toggleSection("harga")}
              className="
                flex
                justify-between
                items-center
                py-4
                cursor-pointer
              ">
              <span
                className="
                  text-xs
                  tracking-[2px]
                  text-gray-600
                ">
                Harga
              </span>

              <span
                className={`
                  transition-transform
                  duration-200
                  ${openSection === "harga" ? "rotate-180" : ""}
                `}>
                ▾
              </span>
            </div>

            {openSection === "harga" && (
              <div className="pb-3">
                {["< 1 JT", "1 - 2 JT", "2 - 3 JT", "3 - 5 JT", "> 5 JT"].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      justify-between
                      py-2
                    ">
                    <span
                      className="
                        text-sm
                        text-gray-700
                      ">
                      {item}
                    </span>

                    <input type="checkbox" checked={selectedHarga.includes(item)} onChange={() => toggleHarga(item)} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTION */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={clearAllFilters}
              className="
                w-1/2
                border
                py-3
              ">
              Reset
            </button>

            <button
              type="button"
              onClick={() => setOpenDropdown(null)}
              className="
                w-1/2
                bg-[#8B2C3A]
                text-white
                py-3
              ">
              Terapkan
            </button>
          </div>
        </div>
      )}

      {/* MOBILE SORT */}
      {openDropdown === "mobileSort" && (
        <div
          className="
            fixed
            inset-0
            bg-white
            z-[60]
            p-5
            overflow-y-auto
          ">
          <div
            className="
              flex
              justify-between
              items-center
              mb-6
            ">
            <h2
              className="
                text-sm
                tracking-[2px]
                text-[#C89B3C]
                font-medium
              ">
              URUTKAN
            </h2>

            <button onClick={() => setOpenDropdown(null)}>✕</button>
          </div>

          {["TERBARU", "HARGA TERTINGGI", "HARGA TERENDAH"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setSortBy(item);
                setOpenDropdown(null);
              }}
              className={`
                w-full
                text-left
                py-4
                border-b
                text-sm
                tracking-[1px]
                ${sortBy === item ? "text-[#8B2C3A] font-medium" : "text-gray-700"}
              `}>
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default MobileFilter;
