"use client";

import { useState } from "react";
import { Home, Store, ShoppingCart, User, X, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from "@radix-ui/react-dialog";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Shop", url: "/shop", icon: Store },
  { title: "Cart", url: "/cart", icon: ShoppingCart },
  { title: "Profile", url: "/account/profile", icon: User },
];

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppSidebar({ open, onOpenChange }: AppSidebarProps) {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {/* Sidebar Sheet */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b p-4 flex flex-row items-center justify-between">
            <SheetTitle>Menu</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <div className="p-4">
            <nav className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-md",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}

              {/* Logout Button */}
              {isAuthenticated && <div
                onClick={() => setShowLogoutModal(true)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-md text-foreground hover:bg-muted cursor-pointer"
                )}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logout Confirmation Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        {/* Overlay */}
        <DialogOverlay className="fixed inset-0 bg-black/30 z-[900]" />

        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] max-w-sm  p-6 rounded-md bg-white shadow-lg">
          <DialogTitle className="text-lg font-semibold mb-2">
            Confirm Logout
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-700 mb-6">
            Are you sure you want to logout? You will need to login again to
            access your account.
          </DialogDescription>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                logout();
                setShowLogoutModal(false);
                onOpenChange(false); 
              }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
