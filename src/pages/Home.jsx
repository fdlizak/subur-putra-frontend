import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getHeroImages, getHeroContent, BASE_URL } from "../services/api";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

function Home() {
  const [heroImages, setHeroImages] = useState([]);
  const [heroContent, setHeroContent] = useState({});

  useEffect(() => {
    getHeroImages().then((data) => {
      setHeroImages(data);
    });
  }, []);

  useEffect(() => {
    getHeroContent().then((data) => {
      setHeroContent(data);
    });
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
                  <img src={`${BASE_URL}/uploads/${img.image_url}`} alt="Jewelry" className="w-full h-full object-cover" />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/35" />

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <div className="max-w-4xl text-center">
                      {/* SUBTITLE */}
                      <p
                        className="
        text-[#f3e9df]
        tracking-[8px]
        uppercase
        text-xs
        md:text-sm
        mb-6
        font-light
      ">
                        {heroContent.subtitle}
                      </p>

                      {/* TITLE */}
                      <h1
                        className="
        text-white
        text-4xl
        md:text-7xl
        leading-[1.1]
        font-semibold
        mb-8
        drop-shadow-lg
      ">
                        {heroContent.title}
                      </h1>

                      {/* DESCRIPTION */}
                      <p
                        className="
        text-[#f5f5f5]
        text-sm
        md:text-xl
        leading-[1.9]
        max-w-3xl
        mx-auto
        mb-10
        font-light
      ">
                        {heroContent.description}
                      </p>

                      {/* BUTTON */}
                      <button
                        className="
        border
        border-white/80
        text-white
        px-10
        py-4
        tracking-[4px]
        uppercase
        text-sm
        backdrop-blur-sm
        hover:bg-white
        hover:text-[#6b2d35]
        transition-all
        duration-500
      ">
                        {heroContent.button_text}
                      </button>
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
