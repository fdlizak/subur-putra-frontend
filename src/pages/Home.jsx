import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

function Home() {
  const [heroImages, setHeroImages] = useState([]);
  const [heroContent, setHeroContent] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/hero/images")
      .then((res) => res.json())
      .then((data) => setHeroImages(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/hero/content")
      .then((res) => res.json())
      .then((data) => setHeroContent(data));
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="relative h-[85vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          observer={true}
          observeParents={true}
          navigation={true}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={2000}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          loop={heroImages.length > 1}
          pagination={{
            clickable: true,
          }}
          className="hero-swiper h-full">
          {Array.isArray(heroImages) &&
            heroImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[85vh]">
                  {/* IMAGE */}
                  <img src={`http://localhost:3000/uploads/${img.image_url}`} alt="Jewelry" className="w-full h-full object-cover" />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/35" />

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <div className="text-white max-w-2xl">
                      <p className="tracking-[4px] text-sm mb-4">{heroContent.subtitle}</p>

                      <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-5">{heroContent.title}</h1>

                      <p className="text-sm md:text-base text-gray-200 mb-6">{heroContent.description}</p>

                      <button className="border border-white px-6 py-3 text-sm tracking-[2px] hover:bg-white hover:text-black transition-all duration-300">{heroContent.button_text}</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:block">
          {/* LEFT */}
          <ChevronLeft />

          {/* RIGHT */}
          <ChevronRight />
        </div>
      </section>

      {/* KATEGORI */}
      <section className="px-6 py-8">
        <h2 className="text-sm tracking-[2px] mb-4">KATEGORI</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Cincin", "Kalung", "Gelang", "Anting"].map((item) => (
            <div
              key={item}
              onClick={() => navigate(`/products?kategori=${item}`)}
              className="
      border
      p-4
      text-center
      cursor-pointer
     hover:bg-[#8B2C3A]
      hover:text-white
      transition-all
      duration-300
    ">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* PRODUK */}
      <section className="px-6 py-8">
        {/* <h2 className="text-sm tracking-[2px] mb-4">PRODUK UNGGULAN</h2> */}
        <div className="grid grid-cols-2 gap-4">{/* mapping product nanti */}</div>
      </section>
    </>
  );
}

export default Home;
