import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Subur Putra.png";

function Footer() {
  const location = useLocation();

  const isAdmin = sessionStorage.getItem("adminToken") === "suburputra-admin";

  const isDashboard = location.pathname === "/admin-sp";

  // HIDE FOOTER DI ADMIN DASHBOARD
  if (isDashboard && !isAdmin) {
    return null;
  }

  return (
    <footer className="bg-[#faf7f3] border-t border-[#e7ddd2] mt-auto">
      <div className="px-5 md:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <img src={logo} alt="Subur Putra" className="h-10 object-contain mb-5" />

            <p className="text-[#666] leading-7 text-sm">Koleksi perhiasan dengan desain elegan dan modern untuk melengkapi setiap momen istimewa Anda.</p>
          </div>

          {/* MENU */}
          <div>
            <h3 className="text-[#7d3b45] tracking-[3px] text-sm mb-5">MENU</h3>

            <ul className="space-y-3 text-[#666] text-sm">
              <li>
                <Link to="/">Beranda</Link>
              </li>

              <li>
                <Link to="/products">Produk</Link>
              </li>

              <li>
                <Link to="/contact">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* KATEGORI */}
          <div>
            <h3 className="text-[#7d3b45] tracking-[3px] text-sm mb-5">KATEGORI</h3>

            <ul className="space-y-3 text-[#666] text-sm">
              {["Cincin", "Kalung", "Gelang", "Anting"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?kategori=${item}`}
                    className="
          hover:text-[#7d3b45]
          transition-colors
          duration-300
        ">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="text-[#7d3b45] tracking-[3px] text-sm mb-5">KONTAK</h3>

            <ul className="space-y-3 text-[#666] text-sm">
              <li>Cijenuk, Bandung Barat</li>
              {/* <li>+62 812 3456 7890</li> */}
              {/* <li>suburputra@email.com</li> */}
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
