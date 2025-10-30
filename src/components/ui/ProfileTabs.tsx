"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Package, MapPin, User, RefreshCw } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ProfileTabs({ activeTab }: { activeTab: string }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector(`[data-state="active"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  const tabs = [
    { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { value: "orders", label: "Orders", icon: Package },
    { value: "address", label: "Addresses", icon: MapPin },
    { value: "profile", label: "Profile", icon: User },
    { value: "refund", label: "Refunds", icon: RefreshCw },
  ];

  return (
    <TabsList
      ref={listRef}
      className="flex gap-1 border-b border-neutral-200 bg-white overflow-x-auto scroll-smooth scrollbar-hide"
    >
      {tabs.map(({ value, label, icon: Icon }) => (
        <TabsTrigger
          key={value}
          value={value}
          className="flex gap-2 px-4 py-3 text-sm font-medium text-neutral-600 border-b-2 border-transparent data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 whitespace-nowrap transition-all"
        >
          <Icon className="h-4 w-4" />
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
