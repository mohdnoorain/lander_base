"use client";

import { useEffect, useState } from "react";
import styles from "./Features.module.css";

type FeatureType = [string, string, string][];

function FeatureSection() {
  const [Feature, setFeatures] = useState<FeatureType | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("/api/FeatureData");
        if (!response.ok) {
          throw new Error("Failed to fetch feature data");
        }
        const data: FeatureType = await response.json();
        setFeatures(data);
      } catch (error) {
        console.error("Error fetching feature data:", error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <>
      <div className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoContents}>
            <p className={styles.infoLines}>
              The Dawn of A New Era. A magnum-opus unto itself – Binghatti
              corner is born from a sheer sense of symmetry and refinement,
              formed by sleek contours and illustrious iconicity. The design of
              the dual massed hyper-tower depicts an unmatched architectural
              prowess and ingenuity that are integral to Binghatti’s rooted
              design philosophy. Meet us virtually today.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.textCenter}>
            <h2 className={styles.heading}>Features</h2>
          </div>
          <div className={styles.featuresGrid}>
            {Feature?.map(([img, price, locat], index) => (
              <div className={styles.featureCard} key={index}>
                <div className={styles.cardContent}>
                  <img src={img} alt="Feature" className={styles.image} />
                  <h3 className={styles.title}>{price}</h3>
                  <p className={styles.description}>{locat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureSection;
