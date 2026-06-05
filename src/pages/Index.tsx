import Header from "@/components/monument/Header";
import HeroSection from "@/components/monument/HeroSection";
import WhyUs from "@/components/monument/WhyUs";
import Catalog from "@/components/monument/Catalog";
import CatalogCTA from "@/components/monument/CatalogCTA";
import Technology from "@/components/monument/Technology";
import Gallery from "@/components/monument/Gallery";
import Extras from "@/components/monument/Extras";
import Contacts from "@/components/monument/Contacts";
import Footer from "@/components/monument/Footer";
import ScrollToTop from "@/components/monument/ScrollToTop";

export default function Index() {
  return (
    <div style={{ background: "#ffffff" }}>
      <ScrollToTop />
      <Header />
      <HeroSection />
      <WhyUs />
      <Catalog />
      <CatalogCTA />
      <Technology />
      <Gallery />
      <Extras />
      <Contacts />
      <Footer />
    </div>
  );
}