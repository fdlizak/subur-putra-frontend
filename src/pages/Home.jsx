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
<img
  src={`${BASE_URL}/uploads/${img.image_url}`}
  alt="Jewelry"
  className="w-full h-full object-cover object-center"
/>
                  {/* OVERLAY */}
                  {/* <div className="absolute inset-0 bg-black/35" /> */}

{/* CONTENT */}
<div className="absolute inset-0 z-10">

  <div
    className="
      absolute
      top-[51%]
      left-1/2
      -translate-x-1/2
      -translate-y-1/2
      w-full
      flex
      flex-col
      items-center
    ">

    {/* SUBTITLE */}
    <p
      className="
        text-[#7a3b45]
        uppercase
        tracking-[12px]
        text-[11px]
        mb-5
      ">
      {heroContent.subtitle}
    </p>

    {/* TITLE */}
    <h1
      style={{
        fontFamily: "Cormorant Garamond, serif",
        fontWeight: 300,
      }}
      className="
        text-[#6e2f39]
        text-[72px]
        leading-[0.95]
        text-center
        max-w-[900px]
      ">
      {heroContent.title}
    </h1>

    {/* DESCRIPTION */}
    <p
      className="
        mt-10
        text-[#5e5e5e]
        text-[15px]
        leading-[2]
        text-center
        max-w-[700px]
      ">
      {heroContent.description}
    </p>

    {/* BUTTON */}
    <button
      className="
        mt-10
        border
        border-[#7a3b45]
        text-[#7a3b45]
        px-14
        py-4
        tracking-[4px]
        text-[12px]
        uppercase
        hover:bg-[#7a3b45]
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
