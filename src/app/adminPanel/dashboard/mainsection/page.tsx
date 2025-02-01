"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import styles from "./page.module.css"; // Import the CSS Module

interface MainSectionType {
  imgUrl: string;
  AddressTitle: string;
  AddressInfo1: string;
  AddressInfo2: string;
}

const AdminPage = () => {
  const [data, setData] = useState<MainSectionType | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<MainSectionType>({
    imgUrl: "",
    AddressTitle: "",
    AddressInfo1: "",
    AddressInfo2: "",
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/MainSectionData"); // Replace with your API endpoint
      const result: MainSectionType = await res.json();
      setData(result);
      setFormData(result);
    };
    fetchData();
  }, []);

  const updateMainSection = async (payload: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/MainSectionData", {
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
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Call the API to submit updated data
    //
    const res = await updateMainSection(formData);
    console.log(res);
  };

  return (
    <Container maxWidth="md">
      <Box className={styles.container}>
        <h1 className={styles.header}>Main Section </h1>
        {data ? (
          <div className={styles.content}>
            <div className={styles.imgContainer}>
              <img
                src={data.imgUrl}
                alt="Admin Image"
                className={styles.image}
              />
            </div>
            <div className={styles.formContainer}>
              {editMode ? (
                <>
                  <TextField
                    label="Image URL"
                    fullWidth
                    defaultValue={formData.imgUrl}
                    name="imgUrl"
                    onChange={handleChange}
                    margin="normal"
                    className={styles.inputField}
                  />
                  <TextField
                    label="Address title"
                    fullWidth
                    defaultValue={formData.AddressTitle}
                    name="AddressTitle"
                    onChange={handleChange}
                    margin="normal"
                    className={styles.inputField}
                  />
                  <TextField
                    label="Address 1"
                    fullWidth
                    defaultValue={formData.AddressInfo1}
                    name="AddressInfo1"
                    onChange={handleChange}
                    margin="normal"
                    className={styles.inputField}
                  />
                  <TextField
                    label="Address 2"
                    fullWidth
                    defaultValue={formData.AddressInfo2}
                    name="AddressInfo2"
                    onChange={handleChange}
                    margin="normal"
                    className={styles.inputField}
                  />
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
                  <div className={styles.Addcontainer}>
                    <h3>Address Title : {data.AddressTitle}</h3>
                    <h3>Address Info 1 : {data.AddressInfo1}</h3>
                    <h3>Address Info 2: {data.AddressInfo2}</h3>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setEditMode(true)}
                      className={styles.editButton}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Container>
  );
};

export default AdminPage;
