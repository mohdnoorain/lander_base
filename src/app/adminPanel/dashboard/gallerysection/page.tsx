"use client";
import styles from "./page.module.css"; // Correct path to CSS module
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
type GalleryType = string[];

const GallerySection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/GallerSectionData");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data: string[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewImageUrl(images[index]);
  };

  const updateGallerySection = async (payload: GalleryType) => {
    // console.log(payload);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/GallerSectionData", {
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

  const handleSave = async () => {
    if (editingIndex === null || !newImageUrl.trim()) return;

    const updatedImages = [...images];
    updatedImages[editingIndex] = newImageUrl;
    updateGallerySection(updatedImages);
    setEditingIndex(null);
  };

  const handleAddNewImage = async () => {
    if (!newImageUrl.trim()) return;

    const updatedImages = [...images, newImageUrl];
    setImages(updatedImages);
    setNewImageUrl("");
    updateGallerySection(updatedImages);
  };

  return (
    <Box className={styles.container} p={4}>
      <Grid container spacing={3}>
        {images.map((url, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <img
                  src={url}
                  alt={`Image ${index}`}
                  className={styles.image}
                />
              </CardContent>
              <CardActions className={styles.cardActions}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {editingIndex !== null && (
        <Box mt={4}>
          <Typography variant="h6">Edit Image URL</Typography>
          <TextField
            fullWidth
            label="Image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
      <Box mt={4}>
        <Typography variant="h6">Add New Image</Typography>
        <TextField
          fullWidth
          label="New Image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddNewImage}>
          Add Image
        </Button>
      </Box>
    </Box>
  );
};

export default GallerySection;
