"use client";
import { useEffect, useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import styles from "./page.module.css";

type NearbyItem = [string, string];
type ApiResponse = {
  NearBy: NearbyItem[];
  LocationUrl: string;
};

const NearbySection = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<ApiResponse>({
    NearBy: [],
    LocationUrl: "",
  });

  // Fetch Nearby Data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/NearSectionData");
      const result: ApiResponse = await res.json();
      console.log(result);
      setData(result);
      setFormData(result);
    };
    fetchData();
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    type?: "time" | "location"
  ) => {
    if (type && index !== undefined) {
      const updatedNearby = [...formData.NearBy];
      updatedNearby[index][type === "time" ? 0 : 1] = e.target.value;
      setFormData({ ...formData, NearBy: updatedNearby });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Add New Location
  const addNewLocation = () => {
    setFormData({ ...formData, NearBy: [...formData.NearBy, ["", ""]] });
  };

  // Submit Updated Data
  const handleSubmit = async () => {
    const res = await fetch("/api/NearSectionData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Updated successfully!");
      setEditMode(false);
      setData(formData);
    } else {
      alert("Error updating data");
    }
  };

  return (
    <Container className={styles.container}>
      

      {/* Google Map */}
      <Box className={styles.mapContainer}>
        <iframe
          src={data?.LocationUrl}
          width="100%"
          height="300"
          loading="lazy"
          className={styles.map}
        />
      </Box>

      {data ? (
        <Box className={styles.listContainer}>
          <div>
            {editMode ? (
              <>
                {/* Edit Google Map URL */}
                <TextField
                  label="Google Map URL"
                  fullWidth
                  name="LocationUrl"
                  value={formData.LocationUrl}
                  onChange={handleChange}
                  margin="normal"
                  className={styles.inputField}
                />

                {/* Edit Nearby Locations */}
                {formData.NearBy.map((item, index) => (
                  <Box key={index} className={styles.inputRow}>
                    <TextField
                      label="Minutes"
                      value={item[0]}
                      onChange={(e) => handleChange(e, index, "time")}
                      className={styles.inputField}
                      type="number"
                    />
                    <TextField
                      label="Location"
                      value={item[1]}
                      onChange={(e) => handleChange(e, index, "location")}
                      className={styles.inputField}
                    />
                  </Box>
                ))}

                {/* Add New Location */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addNewLocation}
                  className={styles.addButton}
                >
                  Add Location
                </Button>

                {/* Submit Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={styles.submitButton}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                {data.NearBy.map((item, index) => (
                  <Typography key={index} className={styles.text}>
                    ⏳ {item[0]} min - {item[1]}
                  </Typography>
                ))}

                {/* Edit Button */}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setEditMode(true)}
                  className={styles.editButton}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default NearbySection;
