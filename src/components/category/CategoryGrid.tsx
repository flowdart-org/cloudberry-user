"use client";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

import shirtsImg from "@/assets/category-shirts.jpg";
import jeansImg from "@/assets/category-jeans.jpg";
import trousersImg from "@/assets/category-trousers.jpg";
import perfumesImg from "@/assets/category-perfumes.jpg";
import tshirtsImg from "@/assets/category-tshirts.jpg";
import formalImg from "@/assets/category-formal.jpg";

interface Category {
  id: number;
  title: string;
  image: string | StaticImageData;
  badge?: string;
  badgeColor?: string;
}

const categories: Category[] = [
  { id: 1, title: "DROPPING SOON", image: shirtsImg, badge: "OFFER", badgeColor: "bg-accent" },
  { id: 2, title: "SHIRTS", image: shirtsImg, badge: "NEW" },
  { id: 3, title: "TROUSERS", image: trousersImg },
  { id: 4, title: "JEANS", image: jeansImg },
  { id: 5, title: "SHIRTS @999", image: shirtsImg, badge: "FLAT 30% OFF", badgeColor: "bg-accent" },
  { id: 6, title: "T-SHIRTS", image: tshirtsImg },
  { id: 7, title: "PERFUMES", image: perfumesImg, badge: "FLAT 30% OFF", badgeColor: "bg-accent" },
  { id: 8, title: "ESSENTIALS", image: shirtsImg },
  { id: 9, title: "FORMAL WEAR", image: formalImg },
  { id: 10, title: "PLUS SIZE", image: trousersImg },
];

const CategoryGrid = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-1 bg-background w-full">
      {/* Full-width container */}
      <div className="w-full relative px-0">

        {/* Optional headline */}
        {/* <div className="flex justify-between items-center mb-6 px-4 md:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Shop by Category
          </h2>
          <span className="hidden md:block text-sm text-muted-foreground cursor-pointer hover:underline">
            View all →
          </span>
        </div> */}

        {/* Full-width Swiper */}
        <Swiper
          className="!px-0 w-full"
          modules={[Navigation, Autoplay]}
          spaceBetween={3}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={1500}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 4 },
            640: { slidesPerView: 3, spaceBetween: 6 },
            1024: { slidesPerView: 4, spaceBetween: 8 },
          }}
        >

          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer transition-transform rounded-none">
                <Image
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {category.badge && (
                  <div
                    className={`absolute top-2 left-2 ${category.badgeColor} text-white px-2 py-1 text-xs font-semibold rounded-none`}
                  >
                    {category.badge}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <h3 className="text-white font-bold text-sm md:text-base text-center group-hover:underline underline-offset-4 ">
                    {category.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        {/* <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white transition"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-md hover:bg-black hover:text-white transition"
        >
          <ChevronRight size={20} />
        </button> */}

        {/* Pagination dots */}
        <div className="custom-pagination flex justify-center mt-6 gap-2"></div>
      </div>
    </section>
  );
};

export default CategoryGrid;
