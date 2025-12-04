'use client'
import Header from "@/components/common/Header";
import HeroBanner from "@/components/common/HeroBanner";
import CategoryGrid from "@/components/category/CategoryGrid";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/common/Footer";
import { useEffect, useState } from "react";
import { LANDING_PAGE_SERVICES } from "@/api/landingPage/landingPage.service";
import { LandingPageResponseDto } from "@/api/landingPage/landingPage.dto";


const Index = () => {
  const [landingPage, setLandingPage] = useState<LandingPageResponseDto | null>(null)

  useEffect(() => {
    const fetchLandingPage = async () => {
      const response = await LANDING_PAGE_SERVICES.getLandingPage()
      console.log(response.data)
      setLandingPage(response.data as LandingPageResponseDto)
    }
    fetchLandingPage()
  }, [])


  if(landingPage) return (
    <div className="flex flex-col max-w-screen w-full">
      <Header categories />
      <main className="flex-1">
        <HeroBanner heroContent={landingPage?.hero} />
        <CategoryGrid  categories={landingPage.topCategories}/>
        <ProductGrid products={landingPage.topProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
