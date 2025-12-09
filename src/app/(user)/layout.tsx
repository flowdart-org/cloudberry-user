"use client";

import { LANDING_PAGE_SERVICES } from "@/api/landingPage/landingPage.service";
import CloudberryLoader from "@/components/ui/Loader";
import { useAuthStore } from "@/store/useAuthStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isLoading, fetchUser, isAuthenticated } = useAuthStore();
  const { getInitialCategories, loading } = useCategoryStore();

  // Fetch categories once
  useEffect(() => {
    LANDING_PAGE_SERVICES.getLandingPage()
    getInitialCategories();
  }, [getInitialCategories]);

  // Fetch logged-in user once
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Redirect only when status is known & user is NOT authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('worked')
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Prevent UI flicker before auth check completes
  if (isLoading || loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-muted/40 text-lg font-medium">
        <CloudberryLoader />
      </div>
    );
  }

  return <>{children}</>;
}
