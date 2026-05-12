import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="text-center mt-10 text-gray-500">Data tidak ditemukan</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md px-10 py-14 text-center">
        <h2 className="text-sm tracking-widest text-gray-500 uppercase">Tunjukkan Kode Ini ke Staff</h2>

        {/* 🔥 KODE SUPER GEDE */}
        <h1 className="text-[80px] md:text-[120px] font-bold mt-8 text-[#8B2C3A] tracking-widest leading-none">{state.kode}</h1>

        <button
          onClick={() => navigate("/")}
          className="mt-10 px-6 py-3 border border-[#8B2C3A] text-[#8B2C3A] 
          hover:bg-[#8B2C3A] hover:text-white transition rounded-lg">
          Kembali ke Katalog
        </button>
      </div>
    </div>
  );
}

export default Result;
