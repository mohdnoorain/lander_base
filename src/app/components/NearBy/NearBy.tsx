import React, { useEffect, useState } from "react";
import styles from "./NearBy.module.css";

type NearbyItem = [string, string];
type ApiResponse = {
  NearBy: NearbyItem[];
  LocationUrl: string;
};

const NearBy: React.FC = () => {
  const [nearBy, setNearBy] = useState<NearbyItem[]>([]);
  const [locationUrl, setLocationUrl] = useState<string>("");

  useEffect(() => {
    const fetchNearByData = async () => {
      try {
        const response = await fetch("/api/NearSectionData");
        if (!response.ok) {
          throw new Error("Failed to fetch nearby data");
        }
        const data: ApiResponse = await response.json();
        setNearBy(data.NearBy);
        setLocationUrl(data.LocationUrl);
      } catch (error) {
        console.error("Error fetching nearby data:", error);
      }
    };

    fetchNearByData();
  }, []);

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>What's Nearby</h2>
        </div>
        <div className={styles.flexWrap}>
          <div className={styles.leftSection}>
            {nearBy.map(([time, location], index) => (
              <div key={index} className={styles.nearByItem}>
                <div className={styles.itemWrapper}>
                  <div className={styles.timeBox}>
                    <p className={styles.timeText}>{time}</p>
                    <span className={styles.minutesText}>minutes</span>
                  </div>

                  <p className={styles.locationBox}>{location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.rightSection}>
            <div>
              <iframe
                src={locationUrl || "about:blank"}
                width="100%"
                allowFullScreen
                className={styles.mapWrapper}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearBy;
