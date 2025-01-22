import styles from "./EnquireProperty.module.css";

type EnquirePropertyType = string[];

const fetchEnquirePropertySectionData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/EnquirePropertySectionData"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Feature section data");
    }

    const data: EnquirePropertyType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Feature section data:", error);
  }
};

const EnquireProperty: React.FC = async () => {
  const EnquirePropertSection: EnquirePropertyType | undefined =
    await fetchEnquirePropertySectionData();
  if (!EnquirePropertSection) {
    return null;
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Enquire More About Property</h2>
        </div>

        <div className={styles.flexWrapper}>
          {EnquirePropertSection.map((item, index) => (
            <div key={index} className={styles.enquireItem}>
              <a className={styles.Items}>{item}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnquireProperty;
