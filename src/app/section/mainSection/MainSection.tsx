"use client";
import React, { useEffect, useState } from "react";
import styles from "./MainSection.module.css";
import SignUpForm from "@/app/components/enquiryForm/enquiryForm";
import Header from "@/app/components/header/Header";
import EnquiryForm from "@/app/components/enquiryForm/enquiryForm";


interface MainSectionType {
  imgUrl: string;
  AddressTitle: string;
  AddressInfo1: string;
  AddressInfo2: string;
}
const MainSection: React.FC = () => {
  const [MainSectionData, setMainSectionData] = useState<MainSectionType>({
    imgUrl: "",
    AddressTitle: "",
    AddressInfo1: "",
    AddressInfo2: "",
  });

  useEffect(() => {
    const fetchMainSectionData = async () => {
      try {
        const response = await fetch("/api/MainSectionData");
        if (!response.ok) {
          throw new Error("Failed to fetch hero section data");
        }
       
        
        const data: MainSectionType = await response.json();
        setMainSectionData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching hero section data:", error);
      }
    };

    fetchMainSectionData();
  }, []);

  return (
    <>
      {/* Header */}

      <Header />


      <div
        className={styles.MainSection}
        style={{
          backgroundImage: `url(${MainSectionData.imgUrl})`,
        }}
      >
        <div className={styles.MainSectionOverlay}></div>
        <div className={styles.container}>
          <div className={`${styles.flexWrapper} ${styles.flexWrapperLg}`}>
            <div
              className={`${styles.textContainer} ${styles.textContainerLg}`}
            >
              <h1
                className={`${styles.heading} ${styles.headingMd} ${styles.headingLg}`}
              >
                {MainSectionData.AddressTitle}
              </h1>
              <p
                className={`${styles.paragraph1} ${styles.paragraph1Md} ${styles.paragraph1Lg}`}
              >
                {MainSectionData.AddressInfo1}
              </p>
              <p
                className={`${styles.paragraph2} ${styles.paragraph2Md} ${styles.paragraph2Lg}`}
              >
                {MainSectionData.AddressInfo2}
              </p>
            </div>

            <div
              className={`${styles.signupContainer} ${styles.signupContainerLg}`}
            >
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;
