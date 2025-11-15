"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isLoading, fetchUser } = useAuthStore()

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

   
    if (isLoading) {
        return <div className="w-screen h-screen bg-amber-200 flex items-center justify-center">Loading....</div>
    }

    return children;
}
