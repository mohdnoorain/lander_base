"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css"; // Import CSS Module
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

type ApiResponse = string[];

const EnquirySection = () => {
  const [data, setData] = useState<ApiResponse>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState("");
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/EnquirePropertySectionData");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result: ApiResponse = await res.json();
        setData(result);
      } catch (error) {
        showToast("Error fetching data", "error");
      }
    };
    fetchData();
  }, []);

  // Handle Toast
  const showToast = (
    message: string,
    severity: "success" | "error" | "warning"
  ) => {
    setToast({ open: true, message, severity });
  };

  // Handle Add New Item
  const handleAdd = async () => {
    if (newItem.trim() === "") {
      showToast("Item cannot be empty!", "warning");
      return;
    }

    const updatedData = [...data, newItem];
    await updateData(updatedData);
    setNewItem("");
  };

  // Handle Edit Item
  const handleEdit = async (index: number) => {
    if (newItem.trim() === "") {
      showToast("Item cannot be empty!", "warning");
      return;
    }

    const updatedData = [...data];
    updatedData[index] = newItem;
    await updateData(updatedData);
    setEditIndex(null);
    setNewItem("");
  };

  // Handle Delete Item
  const handleDelete = async (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    await updateData(updatedData);
  };

  // Update Data in Backend
  const updateData = async (updatedData: ApiResponse) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/EnquirePropertySectionData", {
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
      <Typography className={styles.title} variant="h4" gutterBottom>
        Enquiry Documents
      </Typography>

      {/* List of Items */}
      <List className={styles.list}>
        {data.map((item, index) => (
          <ListItem key={index} className={styles.listItem}>
            {editIndex === index ? (
              <TextField
                className={styles.textField}
                fullWidth
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            ) : (
              <Typography>{item}</Typography>
            )}
            <Box>
              {editIndex === index ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleEdit(index)}
                  sx={{ mr: 1 }}
                >
                  Save
                </Button>
              ) : (
                <IconButton
                  color="primary"
                  onClick={() => {
                    setEditIndex(index);
                    setNewItem(item);
                  }}
                >
                  <Edit />
                </IconButton>
              )}
              <IconButton color="error" onClick={() => handleDelete(index)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Add New Item */}
      <Box className={styles.inputBox}>
        <TextField
          className={styles.textField}
          label="New Item"
          fullWidth
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          onClick={handleAdd}
          startIcon={<Add />}
        >
          Add
        </Button>
      </Box>

      {/* Toast (Snackbar) */}
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

export default EnquirySection;
