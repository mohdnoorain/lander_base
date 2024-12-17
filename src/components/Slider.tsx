"use client";
import { useState, useEffect } from "react";
import styles from "./Slider.module.css";

type GalleryType = string[];

const Slider = () => {
  const [images, setImages] = useState<GalleryType>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/GallerSectionData");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        const data: GalleryType = await response.json();
        
        setImages(data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };
    fetchGallery();
  }, []);

  const goToNext = () => {
    if (transitioning || images.length === 0) return;
    setTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    if (transitioning || images.length === 0) return;
    setTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index: number) => {
    if (transitioning || images.length === 0) return;
    setTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 800); // Match the transition duration
    return () => clearTimeout(timer);
  }, [transitioning]);

  return (
    <div className={styles.sliderContainer}>
      {images.length > 0 ? (
        <>
          <div className={styles.imageWrapper}>
            <div
              className={styles.imageSlider}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.slide} ${
                    currentIndex === index ? styles.slideActive : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={styles.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
          >
            &lt;
          </button>
          <button
            onClick={goToNext}
            className={`${styles.navButton} ${styles.navButtonRight}`}
          >
            &gt;
          </button>

          <div className={styles.dotContainer}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading images...</p> // Fallback for empty or loading state
      )}
    </div>
  );
};

export default Slider;
