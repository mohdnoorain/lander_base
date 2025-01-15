"use client";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import FeatureSection from "../app/components/FeatureSection/FeatureSection";
import GallerySection from "../app/section/GallerySection/GallerySection";
import Amenities from "../app/components/Amenities/Amenities";
import NearSection from "../app/components/NearBy/NearBy";
import PaymentSection from "../app/components/PaymentPlans/PaymentPlans";
import EnquirePropertySection from "../app/components/EnquireProperty/EnquireProperty";
import SimiliarProjectSection from "../app/components/SimiliarProject/SimiliarProject";

function SectionFirst() {
  return (
    <>
      <NavBar />
      {/* <HeroSection /> */}
      {/* features */}
      {/* <FeatureSection /> */}
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
