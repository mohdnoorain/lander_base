import styles from "./NearBy.module.css";

type NearbyItem = [string, string];
type ApiResponse = {
  NearBy: NearbyItem[];
  LocationUrl: string;
};

const fetchNearSectionData = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/NearSectionData");
    if (!response.ok) {
      throw new Error("Failed to fetch Near section data");
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Near section data:", error);
  }
};

const NearBy: React.FC = async () => {
  const data: ApiResponse | undefined = await fetchNearSectionData();

  if (!data) {
    return;
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>What's Nearby</h2>
        </div>
        <div className={styles.flexWrap}>
          <div className={styles.leftSection}>
            {data.NearBy.map(([time, location], index) => (
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
                src={data.LocationUrl || "about:blank"}
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
