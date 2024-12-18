import React, { useEffect, useState } from "react";
import styles from "./paymentPlans.module.css"; // Import the CSS module

type paymentPlansItem = [string, string];
type ApiResponse = {
  paymentPlans: paymentPlansItem[];
  LocationUrl: string;
};

export default function PaymentPlans() {
  const [paymentPlans, setPaymentPlans] = useState<paymentPlansItem[]>([]);
  const [locationUrl, setLocationUrl] = useState<string>("");

  useEffect(() => {
    const fetchPaymentPlansData = async () => {
      try {
        const response = await fetch("/api/PaymentSectionData");
        if (!response.ok) {
          throw new Error("Failed to fetch paymentPlans data");
        }
        const data: ApiResponse = await response.json();
        setPaymentPlans(data.paymentPlans);
        setLocationUrl(data.LocationUrl);
      } catch (error) {
        console.error("Error fetching paymentPlans data:", error);
      }
    };

    fetchPaymentPlansData();
  }, []);

  return (
    <div
      className={styles.sectionContainer} // Apply the class from the CSS module
      style={{
        backgroundImage: `url(${locationUrl})`,
      }}
    >
      <div className={styles.container}>
        <div className={styles.textcenter}>
          <h2 className={styles.heading}>Payment Plans</h2>
        </div>

        <div className={styles.paymentPlansList}>
          <ul className={styles.flexWrapper}>
            {paymentPlans.map((item, index) => (
              <li
                key={index}
                className={styles.paymentPlanItem} // Apply the class for each item
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
