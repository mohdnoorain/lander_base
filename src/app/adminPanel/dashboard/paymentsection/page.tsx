"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "./page.module.css";

type ApiResponse = {
  LocationUrl: string;
  paymentPlans: string[];
};

const PaymentSection = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<ApiResponse>({
    LocationUrl: "",
    paymentPlans: [],
  });

  // Toast State
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Show Toast
  const showToast = (message: string, severity: "success" | "error") => {
    setToast({ open: true, message, severity });
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/PaymentSectionData");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: ApiResponse = await res.json();
        setData(result);
        setFormData(result);
      } catch (error) {
        showToast("Error fetching data", "error");
      }
    };
    fetchData();
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedPlans = [...formData.paymentPlans];
      updatedPlans[index] = e.target.value;
      setFormData({ ...formData, paymentPlans: updatedPlans });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Add New Payment Plan
  const addNewPlan = () => {
    if (formData.paymentPlans.some((plan) => !plan.trim())) {
      showToast(
        "Please fill in existing plans before adding a new one!",
        "error"
      );
      return;
    }
    setFormData({ ...formData, paymentPlans: [...formData.paymentPlans, ""] });
  };

  // Submit Updated Data
  const handleSubmit = async () => {
    if (!formData.LocationUrl.trim()) {
      showToast("Location URL cannot be empty!", "error");
      return;
    }

    if (formData.paymentPlans.some((plan) => !plan.trim())) {
      showToast("Payment plans cannot be empty!", "error");
      return;
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/PaymentSectionData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update data");

      showToast("Updated successfully!", "success");
      setEditMode(false);
      setData(formData);
    } catch (error) {
      showToast("Error updating data", "error");
    }
  };

  return (
    <Container className={styles.container} style={{ textAlign: "left" }}>
      <Typography variant="h4" className={styles.heading}>
        Payment Plans
      </Typography>

      {/* Location Image */}
      {data?.LocationUrl && (
        <Box className={styles.imageContainer} style={{ marginBottom: "20px" }}>
          <img
            src={data.LocationUrl}
            alt="Location"
            style={{ width: "80%", borderRadius: "8px" }}
          />
        </Box>
      )}

      {data ? (
        <Box
          className={styles.listContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {editMode ? (
            <>
              {/* Edit Location URL */}
              <TextField
                label="Location Image URL"
                fullWidth
                name="LocationUrl"
                value={formData.LocationUrl}
                onChange={handleChange}
                margin="normal"
                className={styles.inputField}
                style={{ width: "80%" }}
              />

              {/* Edit Payment Plans */}
              {formData.paymentPlans.map((plan, index) => (
                <Box
                  key={index}
                  className={styles.inputRow}
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <TextField
                    label={`Plan ${index + 1}`}
                    value={plan}
                    onChange={(e) => handleChange(e, index)}
                    className={styles.inputField}
                    style={{ width: "300px" }}
                  />
                </Box>
              ))}

              {/* Add New Payment Plan */}
              <Button
                variant="outlined"
                color="primary"
                onClick={addNewPlan}
                className={styles.addButton}
                style={{ marginTop: "10px" }}
              >
                Add Payment Plan
              </Button>

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={styles.submitButton}
                style={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
              {data.paymentPlans.map((plan, index) => (
                <Typography
                  key={index}
                  className={styles.text}
                  style={{ marginBottom: "5px" }}
                >
                  ✅ {plan}
                </Typography>
              ))}

              {/* Edit Button */}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(true)}
                className={styles.editButton}
                style={{ marginTop: "10px" }}
              >
                Edit
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}

      {/* Snackbar (Toast) */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity as "success" | "error"}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentSection;
