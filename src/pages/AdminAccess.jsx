import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminPin } from "../utils/adminAuth";


function AdminAccess() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    // PIN
    if (pin === getAdminPin()) {
      // simpan admin
      sessionStorage.setItem("adminToken", "suburputra-admin");

      // // expire 1 jam
      // localStorage.setItem("adminExpire", Date.now() + 60 * 60 * 1000);

      navigate("/products");
    } else {
      alert("PIN salah");

      setPin("");

      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#faf8f6]
      px-5
    ">
      <form
        onSubmit={handleLogin}
        className="
          bg-white
          p-10
          w-full
          max-w-md
          shadow-sm
        ">
        <h1
          className="
          text-2xl
          tracking-[4px]
          text-[#8B2C3A]
          mb-3
        ">
          ADMIN ACCESS
        </h1>

        <p className="text-sm text-gray-500 mb-8">Masukkan PIN admin</p>

        <input
          ref={inputRef}
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          className="
            w-full
            border
            p-4
            outline-none
          "
        />

        <button
          type="submit"
          className="
            w-full
            mt-5
            bg-[#8B2C3A]
            text-white
            py-4
            tracking-[2px]
            text-sm
          ">
          MASUK
        </button>
      </form>
    </div>
  );
}

export default AdminAccess;
