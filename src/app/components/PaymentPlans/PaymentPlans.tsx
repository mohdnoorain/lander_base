import styles from "./PaymentPlans.module.css"; // Import the CSS module

type paymentPlansItem = [string, string];
type ApiResponse = {
  paymentPlans: paymentPlansItem[];
  LocationUrl: string;
};

const fetchPaymentPlansData = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/PaymentSectionData"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch paymentPlans data");
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payments plan data");
  }
};

const PaymentPlans: React.FC = async () => {

  const data: ApiResponse | undefined = await fetchPaymentPlansData();
  if (!data) {
    return null;
  }

  return (
    <div
      className={styles.sectionContainer}
      style={{
        backgroundImage: `url(${data.LocationUrl})`,
      }}
    >
      <div className={styles.container}>
        <div className={styles.textcenter}>
          <h2 className={styles.heading}>Payment Plans</h2>
        </div>

        <div className={styles.paymentPlansList}>
          <ul className={styles.flexWrapper}>
            {data.paymentPlans?.map((item, index) => (
              <li key={index} className={styles.paymentPlanItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlans;
