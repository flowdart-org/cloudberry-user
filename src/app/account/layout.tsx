"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, MapPin, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "refunds", label: "Refund Requests", icon: RefreshCw },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract the active tab from URL
  const activeTab = useMemo(() => {
    const lastSegment = pathname?.split("/").pop() || "";
    const validTab = tabs.some((tab) => tab.id === lastSegment);
    return validTab ? lastSegment : "profile";
  }, [pathname]);

  // Redirect `/account` → `/account/profile`
  useEffect(() => {
    if (pathname === "/account") {
      router.replace("/account/profile");
    }
  }, [pathname, router]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    router.push(`/account/${tabId}`);
  };

  return (
    <div className="min-h-screen bg-background">
        <Header />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8 md:mb-12">
          My Account
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2",
                    activeTab === tab.id
                      ? "border-primary bg-secondary text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto gap-2 pb-4 -mx-4 px-4 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm whitespace-nowrap transition-colors flex-shrink-0",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-accent"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
