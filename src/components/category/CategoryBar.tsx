"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";

export interface CategoryBarProps {
  categories?: string[];          // optional custom category list
  show?: boolean;                 // show or hide the bar
  position?: "sticky" | "fixed";  // control position behavior
  topOffset?: string;             // distance from top (e.g., "0", "4rem")
  basePath?: string;              // base route (default: "/shop")
  className?: string;             // optional styling overrides
}

const defaultCategories = [
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

export const CategoryBar = ({
  categories = defaultCategories,
  show = true,
  position = "sticky",
  topOffset = "0",
  basePath = "/shop",
  className = "",
}: CategoryBarProps) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const parts = pathname.split("/");
    const lastSegment = parts[parts.length - 1] || "all";
    const formattedCategory = lastSegment.replace(/-/g, " ").toUpperCase();

    if (categories.includes(formattedCategory)) {
      setActiveCategory(formattedCategory);
    } else {
      setActiveCategory("ALL");
    }
  }, [pathname, categories]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    const path = category === "ALL" ? basePath : `${basePath}/${slug}`;
    router.push(path);
  };

  return (
    <div
      className={`
        ${position} 
        top-[${topOffset}] 
        z-50 
        w-full 
        bg-background 
        border-b border-border 
        overflow-hidden 
        transition-all duration-500 ease-in-out 
        ${show ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-full"} 
        ${className}
      `}
    >
      <div className="flex gap-2 py-3 px-3 overflow-x-auto scrollbar-hide transition-all duration-500 ease-in-out md:justify-center w-screen">
        {categories.map((category) => (
          <div key={category} className="relative flex-shrink-0 whitespace-nowrap">
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
    </div>
  );
};

export default CategoryBar;