"use client";
import NavBar from "./NavBar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import GallerySection from "./GallerySection";
import Amenities from "./Amenities";
import NearSection from "./NearSection";
import PaymentSection from "./PaymentSection";
import EnquirePropertySection from "./EnquirePropertySection";
import SimiliarProjectSection from "./SimiliarProjectSection";


function SectionFirst() {
  return (
    <>
      <NavBar />
      <HeroSection />
      {/* features */}
      <FeatureSection />
      {/* gallery Section  */}
      <GallerySection />
      {/* Amenities */}
      <Amenities />
      {/* Near Section */}
      <NearSection />
      {/* payment plan */}
      <PaymentSection />
      {/* Enquire More About Property */}
      <EnquirePropertySection />
      {/* similiar project */}
      <SimiliarProjectSection />
       <Footer />  
    </>
  );
}

export default SectionFirst;
