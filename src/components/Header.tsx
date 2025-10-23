"use client";

import { useEffect, useState } from "react";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import { AppSidebar } from "./AppSidebar";
import PhoneModal from "./PhoneModal";
import CategoryBar from "./CategoryBar";
import { useAuthStore } from "@/store/authStore";

const Header = () => {
  const { cart } = useStore();
  const {isAuthenticated} = useAuthStore()
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setShowCategories(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <PhoneModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 
        ${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          {/* Left: menu + logo */}
          <div className={`flex items-center gap-3 ${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/"  >
              <h1 className="md:text-xl text-md font-semibold text-foreground">
                Zen Fashion Studio
              </h1>
            </Link>
          </div>

          {/* Right: icons */}
          <div className={`flex items-center gap-2 ${showCategories ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"}`}>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {isAuthenticated ? (
              <>
                <Link href="/profile">
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
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Category Bar */}
      <div
        className={`sticky top-0 z-40 w-full bg-background border-b border-border overflow-hidden transition-all duration-500 ease-in-out ${showCategories
            ? "max-h-20 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-full"
          }`}
      >
        <CategoryBar />
      </div>

    </>
  );
};

export default Header;
