"use client";
import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import SignUpForm from "../signUpForm/SignUpForm";

// import { SignupForm } from "./SignUpForm";

interface HeroSectionType {
  imgUrl: string;
  AddressTitle: string;
  AddressInfo1: string;
  AddressInfo2: string;
}
export default function HeroSection() {
  const [HeroSectionData, setHeroSectionData] = useState<HeroSectionType>({
    imgUrl: "",
    AddressTitle: "",
    AddressInfo1: "",
    AddressInfo2: "",
  });

  useEffect(() => {
    const fetchHeroSectionData = async () => {
      try {
        const response = await fetch("/api/HeroSectionData");
        if (!response.ok) {
          throw new Error("Failed to fetch hero section data");
        }
        const data: HeroSectionType = await response.json();
        setHeroSectionData(data);
      } catch (error) {
        console.error("Error fetching hero section data:", error);
      }
    };

    fetchHeroSectionData();
  }, []);

  return (
    <div
      className={styles.heroSection}
      style={{
        backgroundImage: `url(${HeroSectionData.imgUrl})`,
      }}
    >
      <div className={styles.heroSectionOverlay}></div>
      <div className={styles.container}>
        <div className={`${styles.flexWrapper} ${styles.flexWrapperLg}`}>
          <div className={`${styles.textContainer} ${styles.textContainerLg}`}>
            <h1
              className={`${styles.heading} ${styles.headingMd} ${styles.headingLg}`}
            >
              {HeroSectionData.AddressTitle}
            </h1>
            <p
              className={`${styles.paragraph1} ${styles.paragraph1Md} ${styles.paragraph1Lg}`}
            >
              {HeroSectionData.AddressInfo1}
            </p>
            <p
              className={`${styles.paragraph2} ${styles.paragraph2Md} ${styles.paragraph2Lg}`}
            >
              {HeroSectionData.AddressInfo2}
            </p>
          </div>

          <div
            className={`${styles.signupContainer} ${styles.signupContainerLg}`}
          >
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
