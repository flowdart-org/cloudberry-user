'use client'
import Header from "@/components/common/Header";
import HeroBanner from "@/components/common/HeroBanner";
import CategoryGrid from "@/components/category/CategoryGrid";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/common/Footer";

const Index = () => {
  return (
    <div className="flex flex-col w-screen">
      <Header categories />
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
