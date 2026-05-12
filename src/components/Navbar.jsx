import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings } from "lucide-react";
import logo from "../assets/Subur Putra.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdmin = sessionStorage.getItem("adminToken") === "suburputra-admin";

  const isDashboard = location.pathname === "/admin-sp";

  if (isDashboard && !isAdmin) {
    return null;
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 ">
        <div className="px-5 md:px-16 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="Subur Putra" className="h-8 md:h-10 object-contain" />
          </Link>

          {/* DESKTOP MENU */}
          <div
            className={`
    hidden
    md:flex
    items-center
    ${isAdmin ? "gap-6" : "gap-10"}
    text-[13px]
    tracking-[2px]
    text-gray-700
    uppercase
  `}>
            <Link to="/" className="hover:text-[#8B2C3A] transition-colors duration-200">
              Beranda
            </Link>

            <Link to="/products" className="hover:text-[#8B2C3A] transition-colors duration-200">
              Produk
            </Link>

            <Link to="/Contact" className="hover:text-[#8B2C3A] transition-colors duration-200">
              Kontak
            </Link>
            {isAdmin && (
              <Link
                to="/settings-sp"
                className="
      flex
      items-center
      gap-2
      border
      border-[#8B2C3A]
      px-4
      py-2
      text-[#8B2C3A]
      hover:bg-[#8B2C3A]
      hover:text-white
      transition-all
      duration-300
    ">
                <Settings size={14} />
                Pengaturan
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button type="button" onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-sm">
          <div className="flex flex-col px-5 py-4 text-[13px] tracking-[2px] uppercase text-gray-700">
            <Link to="/" onClick={() => setIsOpen(false)} className="py-3 border-b hover:text-[#8B2C3A] transition-colors duration-200">
              Beranda
            </Link>

            <Link to="/products" onClick={() => setIsOpen(false)} className="py-3 border-b hover:text-[#8B2C3A] transition-colors duration-200">
              Produk
            </Link>

            <Link to="/Contact" onClick={() => setIsOpen(false)} className="py-3 hover:text-[#8B2C3A] transition-colors duration-200">
              Kontak
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
