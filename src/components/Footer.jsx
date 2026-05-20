function Footer() {
  return (
    <footer className="bg-[#faf7f3] border-t border-[#e7ddd2] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2
              className="text-[#7d3b45] text-3xl mb-4"
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}>
              Subur Putra
            </h2>

            <p className="text-[#666] leading-7 text-sm">Koleksi perhiasan premium dengan desain elegan dan modern untuk melengkapi setiap momen istimewa Anda.</p>
          </div>

          {/* MENU */}
          <div>
            <h3 className="text-[#7d3b45] tracking-[3px] text-sm mb-5">MENU</h3>

            <ul className="space-y-3 text-[#666] text-sm">
              <li>Beranda</li>
              <li>Produk</li>
              <li>Kontak</li>
            </ul>
          </div>

          {/* KATEGORI */}
          <div>
            <h3 className="text-[#7d3b45] tracking-[3px] text-sm mb-5">KATEGORI</h3>

            <ul className="space-y-3 text-[#666] text-sm">
              <li>Cincin</li>
              <li>Kalung</li>
              <li>Gelang</li>
              <li>Anting</li>
            </ul>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="text-[#7d3b45] tracking-[3px] text-sm mb-5">KONTAK</h3>

            <ul className="space-y-3 text-[#666] text-sm">
              <li>Bandung, Indonesia</li>
              <li>+62 812 3456 7890</li>
              <li>suburputra@email.com</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#e7ddd2] mt-12 pt-6 text-center text-[#888] text-sm">© 2026 Subur Putra. All Rights Reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
