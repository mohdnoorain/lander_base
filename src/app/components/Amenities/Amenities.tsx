"use client";
import React, { useEffect, useState } from "react";
import styles from "./Amenities.module.css";
import AmenitiesCard from "./AmenitiesCard";

const Amenities: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Amenities</h2>
        </div>
        <div className={styles.amenitiesList}>
          <AmenitiesCard />
        </div>
      </div>
    </div>
  );
};

export default Amenities;
