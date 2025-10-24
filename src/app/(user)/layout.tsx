"use client"

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isLoading, isAuthenticated, fetchUser, user } = useAuthStore()

    useEffect(() => {
            fetchUser()
    }, [fetchUser])



    if (isLoading) {
        return <div className="w-screen h-screen bg-amber-200 flex items-center justify-center">Loading....</div>
    }

    return <div>{children}</div>;
}
