function FilterBadge({
  activeFilters,
  removeFilter,
  clearAllFilters,
}) {
  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="px-8 md:px-16 mt-4 flex flex-wrap gap-2 items-center text-sm">
      <span className="text-gray-500">Filter:</span>

      {activeFilters.map((item) => (
        <div
          key={item}
          className="
            flex
            items-center
            gap-2
            bg-gray-100
            px-3
            py-1
            rounded-full
          "
        >
          <span>{item}</span>

          <button onClick={() => removeFilter(item)}>
            ✕
          </button>
        </div>
      ))}

      {activeFilters.length >= 3 && (
        <button
          onClick={clearAllFilters}
          className="ml-2 text-[#8B2C3A] hover:underline"
        >
          Bersihkan
        </button>
      )}
    </div>
  );
}

export default FilterBadge;