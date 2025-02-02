import styles from "./Features.module.css";
import FeatureSectionCard from "@/app/components/featureSectionCard/FeatureSectionCard";

type FeatureType = [string, string, string][];

const fetchFeatureSectionData = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/FeatureData");
    if (!response.ok) {
      throw new Error("Failed to fetch Feature section data");
    }

    const data: FeatureType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Feature section data:" + process.env.NEXT_PUBLIC_DOMAIN, error);
  }
};

const FeatureSection: React.FC = async () => {
  const features: FeatureType | undefined = await fetchFeatureSectionData();
  if (!features) {
    return null;
  }

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
            {features?.map(([img, price, locat], index) => (
              <FeatureSectionCard
                key={index}
                title={price}
                description={locat}
                image={img}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
