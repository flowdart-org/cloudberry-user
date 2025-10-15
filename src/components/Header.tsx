"use client"

import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import Link from "next/link";

const Header = () => {
  const cart = useStore((state: any) => state.cart);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/">
            <h1 className="text-lg md:text-xl font-semibold text-foreground">
              Zen Fashion Studio
            </h1>
          </Link>
          
        </div>

        {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
          </nav>
        </div> */}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User strokeWidth={1.5} size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart strokeWidth={1.5} size={24}/>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
