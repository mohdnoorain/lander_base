"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import MainSection from "./section/mainSection/MainSection";
import FeatureSection from "./section/FeatureSection/FeatureSection";
import GallerySection from "./section/GallerySection/GallerySection";
import NearBySection from "./section/NearBySection/NearBySection";
import InfoSection from "./section/InfoSection/InfoSection";

const Gallery = async () => {
  try {
    const response = await fetch("/api/AmenitiesData");
    if (!response.ok) {
      throw new Error("Failed to fetch feature data");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching feature data:", error);
  }
};
const DefaultPage: React.FC = () => {
  useEffect(() => {
    Gallery();
  }, []);

  return (
    <div className={styles.page}>
      <MainSection />
      <FeatureSection />
      <GallerySection/>
      <NearBySection/>
      <InfoSection/>
    </div>
  );
};

export default DefaultPage;
