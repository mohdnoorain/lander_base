import React from "react";
import styles from "./FeatureSectionCard.module.css";

type FeatureSectionCardProps = {
  title: string;
  description: string;
  image: string;
};

const FeatureSectionCard: React.FC<FeatureSectionCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className={styles.bestBox}>
      <div className={styles.bestBoxInner}>
        <img src={image} alt={title} className={styles.image} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
   
  );
};

export default FeatureSectionCard;
