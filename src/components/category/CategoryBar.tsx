"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useCategoryStore } from "@/store/useCategoryStore";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
  showCategories: boolean;
  isShop?: boolean;
}

const normalize = (text: string) =>
  text.trim().toLowerCase().replace(/\s+/g, "-");

export default function CategoryBar({ showCategories, isShop = false }: CategoryBarProps) {
  const { categories } = useCategoryStore();
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(pathname.split("/").pop() || '');
  const [readyToScroll, setReadyToScroll] = useState(false);

  /** 🧠 Detect category from URL once route page is fully rendered */
  useEffect(() => {
    if (!pathname) return;

    const slug = pathname.split("/").pop() || "all";
    const exists = categories.some((c) => normalize(c.name) === slug);

    setActive(exists ? slug : "all");

    // Delay scroll until component settles
    setTimeout(() => setReadyToScroll(true), 60);
  }, [pathname, categories]);


  /** 🎯 Scroll to active button AFTER active state fully updated */
  useEffect(() => {
    if (!readyToScroll) return;

    const buttons = containerRef.current?.querySelectorAll("[data-category]");
    const activeBtn = Array.from(buttons || []).find(
      (el) => el.getAttribute("data-category") === active
    );

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active, readyToScroll]);

  /** 🚀 Change route & UI smoothly */
  const handleCategorySelect = (name: string) => {
    const slug = normalize(name);
    setActive(slug); // immediate visual feedback

    router.push(slug === "all" ? "/shop/all" : `/shop/${slug}`);

    // prevent scrolling until route settles again
    setReadyToScroll(false);
  };

  return (
    <div
      className={cn(
        pathname?.startsWith("/shop") && !isShop && "hidden",
        "sticky top-0 z-30 w-full bg-background border-b border-border overflow-hidden transition-all duration-300",
        showCategories ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "flex gap-2 py-2 px-3 overflow-x-auto scrollbar-hide transition-all duration-300",
          isShop ? "" : "w-screen md:justify-center"
        )}
      >
        {/* ALL */}
        <Button
          size="sm"
          data-category="all"
          variant={active === "all" ? "default" : "outline"}
          onClick={() => handleCategorySelect("ALL")}
          className="whitespace-nowrap flex-shrink-0"
        >
          ALL
        </Button>

        {/* Dynamic Categories */}
        {categories
          .filter((c) => c.status === "active")
          .map((category) => {
            const slug = normalize(category.name);
            return (
              <Button
                key={category.id}
                size="sm"
                data-category={slug}
                variant={active === slug ? "default" : "outline"}
                onClick={() => handleCategorySelect(category.name)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {category.name}
              </Button>
            );
          })}
      </div>
    </div>
  );
}
