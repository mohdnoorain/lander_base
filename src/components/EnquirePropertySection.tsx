"use client";
import React, { useEffect, useState } from "react";
import styles from "./EnquirePropertySection.module.css"; // Import the CSS module

type EnquirePropertyType = string[];

export default function EnquirePropertySection() {
  const [EnquirePropertSection, setEnquirePropertSection] =
    useState<EnquirePropertyType>([]);

  useEffect(() => {
    const Gallery = async () => {
      try {
        const response = await fetch("/api/EnquirePropertySectionData");
        if (!response.ok) {
          throw new Error("Failed to fetch feature data");
        }
        const data: EnquirePropertyType = await response.json();
        setEnquirePropertSection(data);
      } catch (error) {
        console.error("Error fetching feature data:", error);
      }
    };
    Gallery();
  }, []);

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Enquire More About Property</h2>
        </div>

        <div className={styles.flexWrapper}>
          <div className={styles.flexWrapper}>
            {EnquirePropertSection.map((item, index) => (
              <a
                key={index}
                className={styles.enquireItem} 
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
