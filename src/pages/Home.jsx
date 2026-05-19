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
      <section className="relative h-screen overflow-hidden">
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
                  {/* <div className="absolute inset-0 bg-black/35" /> */}

             {/* CONTENT */}
<div className="absolute inset-0">

  <div
    className="
      absolute
      top-[47%]
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-full
      max-w-[760px]
      text-center
      px-6
    ">

    {/* SUBTITLE */}
    <p
      className="
        text-[#7d3b45]
        uppercase
        tracking-[10px]
        text-[11px]
        mb-6
        font-light
      ">
      {heroContent.subtitle}
    </p>

    {/* TITLE */}
    <h1
      className="
        text-[#6f2f39]
        text-[54px]
        leading-[1.08]
        font-light
        tracking-[-1px]
        mb-6
      "
      style={{
        fontFamily: "Cormorant Garamond, serif",
      }}>
      {heroContent.title}
    </h1>

    {/* DESCRIPTION */}
    <p
      className="
        text-[#5d5d5d]
        text-[14px]
        leading-[1.9]
        max-w-[560px]
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
        border-[#7d3b45]
        text-[#7d3b45]
        px-12
        py-[14px]
        tracking-[4px]
        uppercase
        text-[12px]
        hover:bg-[#7d3b45]
        hover:text-white
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
