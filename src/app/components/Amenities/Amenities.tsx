import styles from "./Amenities.module.css";
import { IoMdCheckmark } from "react-icons/io";

type AmenitiesType = string[];

const fetchAmenitiesData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/AmenitiesData");
    if (!response.ok) {
      throw new Error("Failed to fetch hero section data");
    }

    const data: AmenitiesType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Amenities data:", error);
  }
};

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

const AmenitiesCard: React.FC = async () => {
  const Amenities: AmenitiesType | undefined = await fetchAmenitiesData();
  if (!Amenities) {
    return null;
  }

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
