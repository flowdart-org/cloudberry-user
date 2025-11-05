"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CATEGORY_SERVICES } from "@/api/category/category.service";
import { Category } from "@/types/category.types";
import { Button } from "../ui/button";

interface CategoryBarProps {
  showCategories: boolean;
}

const CategoryBar = ({ showCategories }: CategoryBarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Fetch categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Update active category from URL
  useEffect(() => {
    if (!pathname) return;

    const parts = pathname.split("/");
    const lastSegment = parts[parts.length - 1] || "all";
    const formattedCategory = lastSegment.replace(/-/g, " ").toUpperCase();

    const categoryExists = categories.some(
      (cat) => cat.name.toUpperCase() === formattedCategory
    );

    if (categoryExists || formattedCategory === "ALL") {
      setActiveCategory(formattedCategory);
    } else {
      setActiveCategory("ALL");
    }
  }, [pathname, categories]);

  const handleCategorySelect = (categoryName: string) => {
    setActiveCategory(categoryName);
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
    const path = categoryName === "ALL" ? "/shop" : `/shop/${slug}`;
    router.push(path);
  };

  const fetchCategories = async () => {
    try {
      const response = await CATEGORY_SERVICES.getCategories();
      setCategories(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  return (
    <div
      className={`sticky top-0 z-50 w-full bg-background border-b border-border overflow-hidden transition-all duration-500 ease-in-out ${
        showCategories
          ? "max-h-20 opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-full"
      }`}
    >
      <div className="flex gap-2 py-2 px-3 overflow-x-auto scrollbar-hide transition-all duration-500 ease-in-out md:justify-center w-screen">
        <Button
          variant={activeCategory === "ALL" ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategorySelect("ALL")}
          className="z-10 relative flex-shrink-0 whitespace-nowrap"
        >
          ALL
        </Button>
        {categories
          .filter((category) => category.status === "active")
          .map((category) => (
            <div key={category.name} className="relative flex-shrink-0 whitespace-nowrap">
              <Button
                variant={activeCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategorySelect(category.name)}
                className="z-10 relative"
              >
                {category.name}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryBar;
