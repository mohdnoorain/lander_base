import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import styles from "./AmenitiesCard.module.css";
type AmenitiesType = string[];
const AmenitiesCard: React.FC = () => {
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
    <>
      <ul className={styles.flexWrapper}>
        {Amenities.map((item) => (
          <li className={styles.amenityItem} key={item}>
            <IoMdCheckmark className={styles.icon} />
            <span className={styles.span}>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AmenitiesCard;
