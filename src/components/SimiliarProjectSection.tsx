"use client";
import React, { useEffect, useState } from "react";
import styles from "./SimilarProjects.module.css";

type SimilarProject = [string[], string[], string[]];

export default function SimiliarProjectSection() {
  const [similarProject, setSimilarProject] = useState<SimilarProject | null>(
    null
  );

  useEffect(() => {
    const fetchSimilarProjects = async () => {
      const response = await fetch("/api/SimiliarProjectSectionData");
      const data: SimilarProject = await response.json();
      setSimilarProject(data);
    };
    fetchSimilarProjects();
  }, []);

  if (!similarProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.textCenter}>
          <h2 className={styles.heading}>Similar Projects</h2>
        </div>

        <div className={styles.projectsGrid}>
          {similarProject[0].map((imgUrl, index) => (
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
                    <a href="#">{similarProject[1][index]}</a>
                  </h3>
                  <p className={styles.projectDescription}>
                    {similarProject[2][index]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
