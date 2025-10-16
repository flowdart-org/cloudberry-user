import shirtsImg from "@/assets/category-shirts.jpg";
import jeansImg from "@/assets/category-jeans.jpg";
import trousersImg from "@/assets/category-trousers.jpg";
import perfumesImg from "@/assets/category-perfumes.jpg";
import tshirtsImg from "@/assets/category-tshirts.jpg";
import formalImg from "@/assets/category-formal.jpg";
import Image, { StaticImageData } from "next/image";

interface Category {
  id: number;
  title: string;
  image: string | StaticImageData;
  badge?: string;
  badgeColor?: string;
}

const categories: Category[] = [
  { id: 1, title: "DROPPING SOON", image: shirtsImg, badge: "NEW", badgeColor: "bg-accent" },
  { id: 2, title: "SHIRTS", image: shirtsImg },
  { id: 3, title: "TROUSERS", image: trousersImg },
  { id: 4, title: "JEANS", image: jeansImg },
  { id: 5, title: "SHIRTS @999", image: shirtsImg, badge: "OFFER", badgeColor: "bg-accent" },
  { id: 6, title: "T-SHIRTS", image: tshirtsImg },
  { id: 7, title: "PERFUMES", image: perfumesImg, badge: "FLAT 30% OFF", badgeColor: "bg-accent" },
  { id: 8, title: "ESSENTIALS", image: shirtsImg },
  { id: 9, title: "FORMAL WEAR", image: formalImg },
  { id: 10, title: "PLUS SIZE", image: trousersImg },
];

const CategoryGrid = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-foreground">
          FEATURED CATEGORY
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer transition-transform"
            >
              <Image
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {category.badge && (
                <div className={`absolute top-4 left-4 ${category.badgeColor} text-white px-3 py-1 text-xs font-bold rounded`}>
                  {category.badge}
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-sm md:text-base">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
