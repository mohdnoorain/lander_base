"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

type ProjectData = [string[], string[], string[]]; // [Images, Titles, Descriptions]

const SimilarProjects = () => {
  const [data, setData] = useState<ProjectData>([[], [], []]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/SimiliarProjectSectionData");
      if (!res.ok) throw new Error("Failed to fetch data");
      const result: ProjectData = await res.json();
      setData(result);
    } catch (error) {
      showToast("Error fetching data", "error");
    }
  };

  // Handle Toast
  const showToast = (
    message: string,
    severity: "success" | "error" | "warning"
  ) => {
    setToast({ open: true, message, severity });
  };

  // Handle Add New Project
  const handleAdd = async () => {
    const { image, title, description } = newProject;
    if (!image || !title || !description) {
      showToast("All fields are required!", "warning");
      return;
    }

    const updatedData: ProjectData = [
      [...data[0], image],
      [...data[1], title],
      [...data[2], description],
    ];

    await updateData(updatedData);
    setNewProject({ image: "", title: "", description: "" });
  };

  // Handle Edit Project
  const handleEdit = async (index: number) => {
    const { image, title, description } = newProject;
    if (!image || !title || !description) {
      showToast("All fields are required!", "warning");
      return;
    }

    const updatedData: ProjectData = [...data];
    updatedData[0][index] = image;
    updatedData[1][index] = title;
    updatedData[2][index] = description;

    await updateData(updatedData);
    setEditIndex(null);
    setNewProject({ image: "", title: "", description: "" });
  };

  // Handle Delete Project
  const handleDelete = async (index: number) => {
    const updatedData: ProjectData = [
      data[0].filter((_, i) => i !== index),
      data[1].filter((_, i) => i !== index),
      data[2].filter((_, i) => i !== index),
    ];

    await updateData(updatedData);
  };

  // Update Data in Backend
  const updateData = async (updatedData: ProjectData) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/SimiliarProjectSectionData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update data");

      setData(updatedData);
      showToast("Updated successfully!", "success");
    } catch (error) {
      showToast("Error updating data", "error");
    }
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" className={styles.heading} gutterBottom>
        Similar Projects
      </Typography>

      {/* Project List */}
      <Grid container spacing={3}>
        {data[0].map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                height="180"
                image={img}
                alt={data[1][index]}
              />
              <CardContent>
                {editIndex === index ? (
                  <>
                    <TextField
                      label="Image URL"
                      fullWidth
                      value={newProject.image}
                      onChange={(e) =>
                        setNewProject({ ...newProject, image: e.target.value })
                      }
                      margin="dense"
                    />
                    <TextField
                      label="Title"
                      fullWidth
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                      }
                      margin="dense"
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      margin="dense"
                    />
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleEdit(index)}
                      sx={{ mt: 1 }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{data[1][index]}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data[2][index]}
                    </Typography>
                  </>
                )}
                <Box className={styles.iconContainer}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditIndex(index);
                      setNewProject({
                        image: img,
                        title: data[1][index],
                        description: data[2][index],
                      });
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add New Project */}
      <Box className={styles.inputBox}>
        <TextField
          label="Image URL"
          fullWidth
          value={newProject.image}
          onChange={(e) =>
            setNewProject({ ...newProject, image: e.target.value })
          }
          margin="dense"
        />
        <TextField
          label="Title"
          fullWidth
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          margin="dense"
        />
        <TextField
          label="Description"
          fullWidth
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          startIcon={<Add />}
          sx={{ mt: 1 }}
        >
          Add Project
        </Button>
      </Box>

      {/* Snackbar (Toast) */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SimilarProjects;
