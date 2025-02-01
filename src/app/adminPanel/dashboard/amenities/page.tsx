"use client";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import styles from "./page.module.css"; // Import the CSS module

const AmenitiesPage = () => {
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch amenities data from the backend API
  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/AmenitiesData");
      if (response.ok) {
        const data: string[] = await response.json();
        setAmenities(data);
      } else {
        console.error("Error fetching amenities data");
      }
    };
    fetchAmenities();
  }, []);

  const updateAmenities = async (payload: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/AmenitiesData", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const data = await response.json();
      console.log("Update response:", data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Handle adding a new amenity
  const handleAddAmenity = async () => {
    if (newAmenity.trim() === "") return;

    const updatedAmenities = [...amenities, newAmenity];
    setAmenities(updatedAmenities);
    setNewAmenity("");
    updateAmenities(updatedAmenities);
  };

  // Handle editing an existing amenity
  const handleEditAmenity = (index: number) => {
    setNewAmenity(amenities[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  // Handle saving the edited amenity
  const handleSaveEdit = async () => {
    if (newAmenity.trim() === "" || editIndex === null) return;

    const updatedAmenities = [...amenities];
    updatedAmenities[editIndex] = newAmenity;
    updateAmenities(updatedAmenities);
    setAmenities(updatedAmenities);
    setNewAmenity("");
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom className={styles.title}>
        Amenities List
      </Typography>

      <div className={styles.list}>
        {amenities.map((amenity, index) => (
          <ListItem key={index} divider className={styles.listItem}>
            <ListItemText primary={amenity} />
            <IconButton onClick={() => handleEditAmenity(index)}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </div>

      <TextField
        label="New Amenity"
        value={newAmenity}
        onChange={(e) => setNewAmenity(e.target.value)}
        variant="outlined"
        fullWidth
        className={styles.inputField}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={isEditing ? handleSaveEdit : handleAddAmenity}
        startIcon={isEditing ? null : <AddIcon />}
        className={styles.button}
      >
        {isEditing ? "Save" : "Add"}
      </Button>
    </div>
  );
};

export default AmenitiesPage;
