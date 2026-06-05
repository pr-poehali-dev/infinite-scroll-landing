import Header from "@/components/monument/Header";
import HeroSection from "@/components/monument/HeroSection";
import WhyUs from "@/components/monument/WhyUs";
import Catalog from "@/components/monument/Catalog";
import CatalogCTA from "@/components/monument/CatalogCTA";

export default function Index() {
  return (
    <div style={{ background: "#ffffff" }}>
      <Header />
      <HeroSection />
      <WhyUs />
      <Catalog />
      <CatalogCTA />
    </div>
  );
}