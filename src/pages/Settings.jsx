import { useEffect, useState } from "react";
import { Trash2, Plus, ImagePlus } from "lucide-react";
import { LogOut } from "lucide-react";
import { BASE_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

import { getAdminPin, setAdminPin } from "../utils/adminAuth";

function Settings() {
  const [heroContent, setHeroContent] = useState({
    subtitle: "",
    title: "",
    description: "",
    button_text: "",
  });

  const [heroImages, setHeroImages] = useState([]);

  const [heroFile, setHeroFile] = useState(null);

  const [oldPin, setOldPin] = useState("");

  const [newPin, setNewPin] = useState("");

  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/hero/content`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setHeroContent(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/hero/images`)
      .then((res) => res.json())
      .then((data) => {
        setHeroImages(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSaveHeroContent = async () => {
    try {
      const response = await fetch(`${BASE_URL}/hero/content`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          admin_token: sessionStorage.getItem("adminToken"),
        },

        body: JSON.stringify(heroContent),
      });

      const data = await response.json();

      console.log(data);

      alert("Hero content berhasil disimpan");
    } catch (err) {
      console.log(err);
    }
  };

  const handleHeroUpload = async () => {
    if (!heroFile) return;

    const formData = new FormData();

    formData.append("image", heroFile);

    try {
      const response = await fetch(`${BASE_URL}/hero/images`, {
        method: "POST",

        headers: {
          admin_token: sessionStorage.getItem("adminToken"),
        },

        body: formData,
      });

      const data = await response.json();

      console.log(data);

      // refresh
      fetch(`${BASE_URL}/hero/images`)
        .then((res) => res.json())
        .then((data) => setHeroImages(data));

      setHeroFile(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteHero = async (id) => {
    try {
      await fetch(`${BASE_URL}/hero/images/${id}`, {
        method: "DELETE",

        headers: {
          admin_token: sessionStorage.getItem("adminToken"),
        },
      });

      setHeroImages((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");

    navigate("/");
  };

  const handleChangePin = () => {
    const currentPin = getAdminPin();

    // pin lama salah
    if (oldPin !== currentPin) {
      alert("PIN lama salah");

      return;
    }

    // pin baru sama
    if (newPin === currentPin) {
      alert("PIN baru tidak boleh sama");

      return;
    }

    // minimal 6 digit
    if (newPin.length < 6) {
      alert("PIN minimal 6 digit");

      return;
    }

    // konfirmasi salah
    if (newPin !== confirmPin) {
      alert("Konfirmasi PIN tidak sama");

      return;
    }

    setAdminPin(newPin);

    alert("PIN berhasil diubah");

    setOldPin("");
    setNewPin("");
    setConfirmPin("");
  };

  return (
    <div className="bg-[#faf8f6] min-h-screen py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1
            className="
          text-2xl
          md:text-3xl
          tracking-[4px]
          text-[#8B2C3A]
        ">
            PENGATURAN
          </h1>
        </div>

        {/* ACCOUNT */}

        <div
          className="
    bg-white
    border
    border-gray-200
    p-6
    md:p-8
    shadow-sm
    mb-8
    mt-8

  ">
          <div
            className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-5
    ">
            <div>
              <h2
                className="
          text-lg
          tracking-[2px]
          text-[#8B2C3A]
        ">
                ADMIN ACCOUNT
              </h2>

              <p
                className="
          text-sm
          text-gray-500
          mt-1
        ">
                Login sebagai admin
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="
        flex
        items-center
        justify-center
        gap-2
        border
        border-red-500
        text-red-500
        px-6
        h-12
        text-sm
        tracking-[2px]
        hover:bg-red-500
        hover:text-white
        transition-all
      ">
              <LogOut size={16} />
              LOGOUT
            </button>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div
          className="
        bg-white
        border
        border-gray-200
        p-6
        md:p-8
        shadow-sm
      ">
          <div className="mb-8">
            <h2
              className="
            text-lg
            tracking-[2px]
            text-[#8B2C3A]
          ">
              CONTENT BERANDA
            </h2>

            <p className="text-sm text-gray-500 mt-1">Ubah text yang tampil di banner beranda</p>
          </div>

          <div className="space-y-5">
            {/* SUBTITLE */}
            <div>
              <label
                className="
              text-xs
              uppercase
              tracking-[2px]
              text-gray-500
              block
              mb-2
            ">
                Subtitle
              </label>

              <input
                type="text"
                value={heroContent.subtitle}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    subtitle: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                h-12
                px-4
                outline-none
                focus:border-[#8B2C3A]
              "
              />
            </div>

            {/* TITLE */}
            <div>
              <label
                className="
              text-xs
              uppercase
              tracking-[2px]
              text-gray-500
              block
              mb-2
            ">
                Title
              </label>

              <textarea
                rows={3}
                value={heroContent.title}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    title: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                resize-none
                outline-none
                focus:border-[#8B2C3A]
              "
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                className="
              text-xs
              uppercase
              tracking-[2px]
              text-gray-500
              block
              mb-2
            ">
                Description
              </label>

              <textarea
                rows={4}
                value={heroContent.description}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    description: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                p-4
                resize-none
                outline-none
                focus:border-[#8B2C3A]
              "
              />
            </div>

            {/* BUTTON */}
            <div>
              <label
                className="
              text-xs
              uppercase
              tracking-[2px]
              text-gray-500
              block
              mb-2
            ">
                Button Text
              </label>

              <input
                type="text"
                value={heroContent.button_text}
                onChange={(e) =>
                  setHeroContent({
                    ...heroContent,
                    button_text: e.target.value,
                  })
                }
                className="
                w-full
                border
                border-gray-300
                h-12
                px-4
                outline-none
                focus:border-[#8B2C3A]
              "
              />
            </div>

            <button
              onClick={handleSaveHeroContent}
              className="
              bg-[#8B2C3A]
              text-white
              h-12
              px-8
              text-sm
              tracking-[2px]
              hover:bg-[#732330]
              transition-all
            ">
              SIMPAN
            </button>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          className="
        bg-white
        border
        border-gray-200
        p-6
        md:p-8
        shadow-sm
        mt-8
      ">
          <div
            className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          mb-8
        ">
            <div>
              <h2
                className="
              text-lg
              tracking-[2px]
              text-[#8B2C3A]
            ">
                BANNER IMAGE
              </h2>

              <p className="text-sm text-gray-500 mt-1">masukan image banner di sini</p>
            </div>

            {/* UPLOAD */}
            <div
              className="
            flex
            flex-col
            md:flex-row
            gap-3
          ">
              <div
                className="
  flex
  flex-col
  md:flex-row
  gap-3
  items-start
">
                {/* INPUT HIDDEN */}
                <input type="file" id="hero-upload" className="hidden" onChange={(e) => setHeroFile(e.target.files[0])} />

                {/* BUTTON PILIH IMAGE */}
                <label
                  htmlFor="hero-upload"
                  className="
      flex
      items-center
      gap-2
      border
      border-[#8B2C3A]
      text-[#8B2C3A]
      px-5
      h-12
      cursor-pointer
      hover:bg-[#8B2C3A]
      hover:text-white
      transition-all
      text-sm
      tracking-[2px]
    ">
                  <ImagePlus size={16} />
                  Pilih Image
                </label>

                {/* FILE NAME */}
                {heroFile && (
                  <div
                    className="
      flex
      items-center
      gap-3
    ">
                    <p
                      className="
        text-sm
        text-gray-500
      ">
                      {heroFile.name}
                    </p>

                    {/* BUTTON UPLOAD */}
                    <button
                      onClick={handleHeroUpload}
                      className="
          flex
          items-center
          justify-center
          gap-2
          bg-[#8B2C3A]
          text-white
          px-6
          h-12
          tracking-[2px]
          text-sm
          hover:bg-[#732330]
          transition-all
        ">
                      <Plus size={16} />
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LIST IMAGE */}
          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
        ">
            {heroImages.map((item) => (
              <div
                key={item.id}
                className="
                border
                border-gray-200
                p-3
                relative
                bg-white
                shadow-sm
              ">
                <img
                  src={`${BASE_URL}/uploads/${item.image_url}`}
                  alt=""
                  className="
                  w-full
                  h-64
                  object-cover
                "
                />

                <button
                  onClick={() => handleDeleteHero(item.id)}
                  className="
                  absolute
                  top-5
                  right-5
                  bg-white/90
                  text-red-500
                  p-2
                  hover:bg-red-500
                  hover:text-white
                  transition-all
                ">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CHANGE PIN */}

        <div
          className="
    bg-white
    border
    border-gray-200
    p-6
    md:p-8
    shadow-sm
    mb-8
  ">
          <div className="mb-8">
            <h2
              className="
        text-lg
        tracking-[2px]
        text-[#8B2C3A]
      ">
              GANTI PIN ADMIN
            </h2>

            <p
              className="
        text-sm
        text-gray-500
        mt-1
      ">
              Ubah PIN akses admin
            </p>
          </div>

          <div className="space-y-5">
            {/* PIN LAMA */}

            <div>
              <label
                className="
          text-xs
          uppercase
          tracking-[2px]
          text-gray-500
          block
          mb-2
        ">
                PIN Lama
              </label>

              <input
                type="password"
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value)}
                className="
          w-full
          border
          border-gray-300
          h-12
          px-4
          outline-none
          focus:border-[#8B2C3A]
        "
              />
            </div>

            {/* PIN BARU */}

            <div>
              <label
                className="
          text-xs
          uppercase
          tracking-[2px]
          text-gray-500
          block
          mb-2
        ">
                PIN Baru
              </label>

              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="
          w-full
          border
          border-gray-300
          h-12
          px-4
          outline-none
          focus:border-[#8B2C3A]
        "
              />
            </div>

            {/* KONFIRMASI */}

            <div>
              <label
                className="
          text-xs
          uppercase
          tracking-[2px]
          text-gray-500
          block
          mb-2
        ">
                Konfirmasi PIN Baru
              </label>

              <input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                className="
          w-full
          border
          border-gray-300
          h-12
          px-4
          outline-none
          focus:border-[#8B2C3A]
        "
              />
            </div>

            <button
              onClick={handleChangePin}
              className="
        bg-[#8B2C3A]
        text-white
        h-12
        px-8
        text-sm
        tracking-[2px]
        hover:bg-[#732330]
        transition-all
      ">
              SIMPAN PIN BARU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
