import React from "react";
import styles from "./page.module.css";
import MainSection from "./section/mainSection/MainSection";
import FeatureSection from "./section/FeatureSection/FeatureSection";
import GallerySection from "./section/GallerySection/GallerySection";
import NearBySection from "./section/NearBySection/NearBySection";
import InfoSection from "./section/InfoSection/InfoSection";
import Footer from "./components/Footer/Footer";

const DefaultPage: React.FC = () => {


      return (
            <div className={styles.page}>
                  <MainSection />
                  <FeatureSection />
                  <GallerySection />
                  <NearBySection />
                  <InfoSection />
                  <Footer />
            </div >
      );
};

export default DefaultPage;
