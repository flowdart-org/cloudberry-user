'use client'
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col w-screen">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <CategoryGrid />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
