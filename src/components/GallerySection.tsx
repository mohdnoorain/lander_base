import React from "react";
import Slider from "./Slider";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  return (
    <div className={styles.gallerySection}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={`${styles.heading} ${styles.headingMd}`}>
            Image Gallery
          </h2>
        </div>
        <div className={styles.sliderWrapper}>
          <Slider />
        </div>
      </div>
    </div>
  );
}
