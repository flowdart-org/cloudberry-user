"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const categories = [
  "ALL",
  "TROUSERS",
  "SHORTS",
  "JEANS",
  "T-SHIRTS",
  "LUXE",
  "FORMAL WEAR",
  "SHIRTS",
  "JACKETS",
  "SWEATERS",
  "BLAZERS",
  "CASUALS",
];

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const router = useRouter();

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    router.push(`/shop/${slug}`);
  };

  return (
    <div
      className="flex gap-2 py-3 px-3 overflow-x-auto scrollbar-hide transition-all duration-500 ease-in-out md:justify-center w-screen"
    >
      {categories.map((category) => (
        <div
          key={category}
          className={`relative flex-shrink-0 whitespace-nowrap`}
        >
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategorySelect(category)}
            className="z-10 relative"
          >
            {category}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
