import { MapPin, Phone, Clock } from "lucide-react";

function Contact() {
  const branches = [
    {
      name: "Pasar Baranangsiang",
      day: "Senin & Jumat",
      link: "https://maps.app.goo.gl/xy2U1pBKPBFkPDRf7",
    },

    {
      name: "Pasar Citalem",
      day: "Selasa",
      link: "https://maps.app.goo.gl/P1es6nEsAkQJBTCKA",
    },

    {
      name: "Pasar Cijambu",
      day: "Rabu",
      link: "https://maps.app.goo.gl/4dzq7NeiATDeJKTp6",
    },

    {
      name: "Pasar Pasirsaji",
      day: "Kamis",
      link: "https://maps.app.goo.gl/pvfg7E7yBdCFcZEw5",
    },

    {
      name: "Pasar Cimega",
      day: "Sabtu",
      link: "https://maps.app.goo.gl/2ibct1GgQUWXkBuj9",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <section
        className="
          pt-32
          pb-20
          px-8
          md:px-16
          text-center
          border-b
        ">
        <p
          className="
            text-[#8B2C3A]
            tracking-[4px]
            text-sm
            uppercase
            mb-4
          ">
          Subur Putra
        </p>

        <h1
          className="
            text-4xl
            md:text-6xl
            tracking-[6px]
            font-light
            text-gray-900
          ">
          CONTACT
        </h1>

        <p
          className="
            mt-6
            text-gray-500
            max-w-xl
            mx-auto
            leading-relaxed
          ">
          Temukan lokasi toko kami untuk informasi produk maupun pemesanan.
        </p>
      </section>

      {/* CONTACT INFO */}
      <section
        className="
          px-8
          md:px-16
          py-20
          grid
          md:grid-cols-2
          gap-12
          items-start
        ">
        {/* LEFT */}
        <div>
          <p
            className="
              text-[#8B2C3A]
              tracking-[3px]
              text-sm
              uppercase
              mb-4
            ">
            Alamat Utama
          </p>

          <h2
            className="
              text-3xl
              font-light
              mb-8
              text-gray-900
            ">
            Subur Putra
          </h2>

          {/* ADDRESS */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin size={20} className="text-[#8B2C3A] mt-1" />

              <div>
                <p className="text-gray-800 leading-relaxed">Terminal/Pasar Cijenuk, Kec. Cipongkor, Kabupaten Bandung Barat, Jawa Barat 40564</p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex gap-4">
              {/* <Phone size={20} className="text-[#8B2C3A] mt-1" />

              <div>
                <p className="text-gray-800">+62 8xx xxxx xxxx</p>
              </div> */}
            </div>

            {/* TIME */}
            <div className="flex gap-4">
              <Clock size={20} className="text-[#8B2C3A] mt-1" />

              <div>
                <p className="text-gray-800">Setiap Hari Buka</p>

                <p className="text-gray-500 text-sm mt-1">07.00 - 15.00</p>

                <p className="text-yellow-400 text-bold mt-3 italic">*Khusus Jumat buka sampai jam 10.00</p>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="https://maps.app.goo.gl/Z7a9oquGQbmj7enL7"
              target="_blank"
              className="
                border
                border-[#8B2C3A]
                px-8
                py-4
                text-sm
                tracking-[2px]
                uppercase
                text-[#8B2C3A]
                hover:bg-[#8B2C3A]
                hover:text-white
                transition-all
              ">
              Google Maps
            </a>

            <a
              href="https://wa.me/628000000000"
              target="_blank"
              className="
                bg-[#8B2C3A]
                px-8
                py-4
                text-sm
                tracking-[2px]
                uppercase
                text-white
                hover:opacity-90
                transition-all
              ">
              WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            border
            p-8
            md:p-12
          ">
          <p
            className="
              text-[#8B2C3A]
              tracking-[3px]
              text-sm
              uppercase
              mb-8
            ">
            Cabang Toko
          </p>

          <div className="grid gap-5">
            {branches.map((branch, index) => (
              <a
                key={index}
                href={branch.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
      border-b
      pb-4
      flex
      items-center
      justify-between
      hover:bg-[#faf7f5]
      transition-all
      duration-300
      px-2
      py-2
      cursor-pointer
hover:scale-[1.01]
    ">
                <div>
                  <p
                    className="
          text-lg
          font-light
          text-gray-800
        ">
                    {branch.name}
                  </p>
                </div>

                <span
                  className="
        text-xs
        tracking-[2px]
        text-[#8B2C3A]
      ">
                  {branch.day}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section
        className="
          px-8
          md:px-16
          pb-20
        ">
        <div
          className="
            overflow-hidden
            border
            h-[450px]
          ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d268.0103957053839!2d107.37710985371615!3d-6.960466287560969!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68f736f661a529%3A0xcf939341eb345724!2sToko%20Mas%20Subur%20Putra!5e1!3m2!1sid!2sid!4v1778472405770!5m2!1sid!2sid"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;
