"use client"
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CATEGORY_SERVICES } from "@/api/category/category.service";
import { Category } from "@/types/category.types";
import Link from "next/link";

const CategoryGrid = () => {
  const swiperRef = useRef<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CATEGORY_SERVICES.getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-1 bg-background w-full">
        <div className="w-full px-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-1 bg-background w-full">
      <div className="w-full relative px-0">
        <Swiper
          className="!px-0 w-full"
          modules={[Navigation, Autoplay]}
          spaceBetween={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={1000}
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
              <Link href={`/shop/${category.name}`}>
                <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-elegant)]">
                  <img
                    src={category.thumbnail}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    style={{ background: 'var(--gradient-overlay)' }}
                  />

                  {/* Badge */}
                  {/* {category.badge && (
                    <div className={`absolute top-4 right-4 ${category.badgeColor || 'bg-accent'} text-accent-foreground px-3 py-1 text-xs font-bold tracking-wider`}>
                      {category.badge}
                    </div>
                  )} */}

                  {/* Category name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-sm md:text-base text-center tracking-wide transition-all duration-300 group-hover:underline underline-offset-4">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground rounded-full p-2 shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          aria-label="Previous category"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground rounded-full p-2 shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          aria-label="Next category"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default CategoryGrid;
