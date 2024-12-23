"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";

type GalleryType = string[];

const Slider: React.FC = () => {
  const [images, setImages] = useState<GalleryType>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const deltaX = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum distance for a valid swipe

    if (deltaX > threshold) {
     
      goToNext();
    } else if (deltaX < -threshold) {
      
      goToPrevious();
    }

    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Manage automatic sliding
  useEffect(() => {
    if (images.length > 0) {
      autoSlideInterval.current = setInterval(() => {
        goToNext();
      }, 5000); // Slide every 5 seconds
    }

    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    };
  }, [images, transitioning]);

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 800); // Match the transition duration
    return () => clearTimeout(timer);
  }, [transitioning]);

  return (
    <div
      className={styles.sliderContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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

        <div className={styles.dotContainer}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.dot} ${
                index === currentIndex ? styles.dotActive : ""
              }`}
            />
          ))}
        </div>
      </>
    </div>
  );
};

export default Slider;
