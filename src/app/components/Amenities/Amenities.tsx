"use client";
import React, { useEffect, useState } from "react";
import styles from "./Amenities.module.css";
import { IoMdCheckmark } from "react-icons/io";


type AmenitiesType = string[];

export default function Amenities() {
  const [Amenities, setAmenities] = useState<AmenitiesType>([]);

  useEffect(() => {
    const Gallery = async () => {
      try {
        const response = await fetch("/api/AmenitiesData");
        if (!response.ok) {
          throw new Error("Failed to fetch feature data");
        }
        const data: AmenitiesType = await response.json();
        setAmenities(data);
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
          <h2 className={styles.heading}>Amenities</h2>
        </div>
        <div className={styles.amenitiesList}>
          <ul className={styles.flexWrapper}>
            {Amenities.map((item) => (
              <li className={styles.amenityItem} key={item}>
                <IoMdCheckmark className={styles.icon} />
                <span className={styles.span}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
