import React, { useEffect, useState } from "react";
import styles from "./NearSection.module.css";

type NearbyItem = [string, string];
type ApiResponse = {
  NearBy: NearbyItem[];
  LocationUrl: string;
};

export default function NearSection() {
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
          <h2 className={`${styles.heading} ${styles.headingMd}`}>
            What's Nearby
          </h2>
        </div>
        <div className={styles.flexWrap}>
          <div className={`${styles.leftSection} ${styles.leftSectionLg}`}>
            {nearBy.map(([time, location], index) => (
              <div key={index} className={styles.nearByItem}>
                <div className={styles.itemWrapper}>
                  <div
                    className={`${styles.timeBox} ${styles.timeBoxLg} ${styles.timeBoxMd}`}
                  >
                    <p
                      className={`${styles.timeText} ${styles.timeTextMd} ${styles.timeTextSm}`}
                    >
                      {time}
                    </p>
                    <span
                      className={`${styles.minutesText} ${styles.minutesTextMd}`}
                    >
                      minutes
                    </span>
                  </div>

                  <div
                    className={`${styles.locationBox} ${styles.locationBoxMd}`}
                  >
                    <p
                      className={`${styles.locationText} ${styles.locationTextMd}`}
                    >
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.rightSection} ${styles.rightSectionLg}`}>
            <div className={`${styles.mapWrapper} ${styles.mapWrapperLg}`}>
              <iframe
                src={locationUrl}
                width="100%"
                height="500"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
