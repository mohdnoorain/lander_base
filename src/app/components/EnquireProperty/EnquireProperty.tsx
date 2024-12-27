"use client";
import React, { useEffect, useState } from "react";
import styles from "./EnquireProperty.module.css"; // Import the CSS module

type EnquirePropertyType = string[];

const EnquireProperty: React.FC = () => {
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
          {EnquirePropertSection.map((item, index) => (
            <div className={styles.enquireItem}>
              <a key={index}  className={styles.Items}>
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnquireProperty;
