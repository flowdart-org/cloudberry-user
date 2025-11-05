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

  const activeTab = useMemo(() => {
    const lastSegment = pathname?.split("/").pop() || "";
    const validTab = tabs.some((tab) => tab.id === lastSegment);
    return validTab ? lastSegment : "profile";
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/account") {
      router.replace("/account/profile");
    }
  }, [pathname, router]);

  const handleTabChange = (tabId: string) => {
    router.push(`/account/${tabId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-6">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
            My Account
          </h1>
          <p className="text-muted-foreground">
            Manage your profile, orders, and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row md:gap-3">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1 bg-card border border-border rounded-lg p-2 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="lg:hidden mb-6">
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md text-[10px] whitespace-nowrap transition-all duration-200 flex-shrink-0 border",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md border-primary"
                      : "bg-card text-foreground hover:bg-accent border-border"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
