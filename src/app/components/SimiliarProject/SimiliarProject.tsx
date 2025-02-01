import styles from "./SimilarProjects.module.css";

type SimilarProjectType = [string[], string[], string[]];

const fetchSimiliarProjectSectionData = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/SimiliarProjectSectionData"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch SimiliarProject Section Data");
    }

    const data: SimilarProjectType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching SimiliarProject Section Data:", error);
  }
};

const SimiliarProject: React.FC = async () => {
  const similarProjectData: SimilarProjectType | undefined =
    await fetchSimiliarProjectSectionData();

  if (!similarProjectData) {
    return null;
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Similar Projects</h2>
        </div>

        <div className={styles.projectsGrid}>
          {similarProjectData[0].map((imgUrl, index) => (
            <div className={styles.projectCard} key={index}>
              <div className={styles.cardInner}>
                <a href="#">
                  <img
                    src={imgUrl}
                    alt={`Project ${index + 1}`}
                    loading="lazy"
                    className={styles.projectImage}
                  />
                </a>
                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>
                    <a href="#">{similarProjectData[1][index]}</a>
                  </h3>
                  <p className={styles.projectDescription}>
                    {similarProjectData[2][index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimiliarProject;
