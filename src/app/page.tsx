"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {

  const Gallery = async () => {
    try {
      const response = await fetch("/api/AmenitiesData");
      if (!response.ok) {
        throw new Error("Failed to fetch feature data");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching feature data:", error);
    }
  };

  useEffect(() => {
    Gallery();
  }, []);

  return (
    <div className={styles.page}>
      <h2>Hii there</h2>
    </div>
  );
}
