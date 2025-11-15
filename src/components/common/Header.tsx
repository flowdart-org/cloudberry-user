"use client";

import { useEffect, useState } from "react";
import { Menu, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { AppSidebar } from "./AppSidebar";
import AuthModal from "../auth/AuthModal";
import CategoryBar from "../category/CategoryBar";
import { useAuthStore } from "@/store/useAuthStore";
import { APP_CONFIG } from "@/lib/app.config";
import Image from "next/image";

const Header = ({categories = false}: {categories?: boolean}) => {
  const cartItemCount = useCartStore((state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0)
);

  const { isAuthenticated } = useAuthStore()

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if(categories) setShowCategories(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <AuthModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 
        ${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-8 bg-white">
          {/* Left: menu + logo */}
          <Button
            variant="ghost"
            size="icon"
            className={`${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className={`flex items-center justify-center gap-1 ${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}>
            <Image
              src={APP_CONFIG.LOGO.ICON}
              alt="icon"
              className="w-10 h-10"
            />
            <h1 className="md:text-2xl text-sm text-foreground font-pirulen font-medium">
              {APP_CONFIG.NAME}
            </h1>
          </Link>

          {/* Right: icons */}
          <div className={`flex items-center gap-2 ${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}>
            {/* <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button> */}

            {isAuthenticated ? (
              <>
                <Link href="/account/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="font-pirulen "
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      
        {categories && <CategoryBar showCategories={showCategories} />}

    </>
  );
};

export default Header;
