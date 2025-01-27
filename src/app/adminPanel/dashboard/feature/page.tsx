"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { TextField, Button, Grid, Card, CardContent } from "@mui/material";

type CardData = [string, string, string];

const HomePage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCard, setNewCard] = useState<CardData>(["", "", ""]);

  useEffect(() => {
    fetchCards();
  }, []);

  // Fetch card data from the API
  const fetchCards = async () => {
    try {
      const response = await fetch("/api/FeatureData");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: CardData[] = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Update the API with the modified cards
  const updateFeatureSection = async (payload: CardData[]) => {
    try {
      const response = await fetch("/api/FeatureData", {
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

  // Save the edited card
  const handleSave = (index: number) => {
    updateFeatureSection(cards);
    setEditingIndex(null);
  };

  // Add a new card
  const handleAddCard = () => {
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setNewCard(["", "", ""]);
    updateFeatureSection(updatedCards);
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.card}>
              <CardContent>
                {editingIndex === index ? (
                  <div className={styles.form}>
                    <TextField
                      label="Image URL"
                      className={styles.textField}
                      value={card[0]}
                      onChange={(e) =>
                        setCards((prev) => {
                          const updated = [...prev];
                          updated[index][0] = e.target.value;
                          return updated;
                        })
                      }
                    />
                    <TextField
                      label="Value"
                      className={styles.textField}
                      value={card[1]}
                      onChange={(e) =>
                        setCards((prev) => {
                          const updated = [...prev];
                          updated[index][1] = e.target.value;
                          return updated;
                        })
                      }
                    />
                    <TextField
                      label="Description"
                      className={styles.textField}
                      value={card[2]}
                      onChange={(e) =>
                        setCards((prev) => {
                          const updated = [...prev];
                          updated[index][2] = e.target.value;
                          return updated;
                        })
                      }
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <img src={card[0]} alt={card[2]} />
                    <h3>{card[1]}</h3>
                    <p>{card[2]}</p>
                    <div className={styles.buttonContainer}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingIndex(index)}
                      >
                        Edit
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card>
            <CardContent className={styles.form}>
              <TextField
                label="Image URL"
                className={styles.textField}
                value={newCard[0]}
                onChange={(e) =>
                  setNewCard((prev) => [e.target.value, prev[1], prev[2]])
                }
              />
              <TextField
                label="Value"
                className={styles.textField}
                value={newCard[1]}
                onChange={(e) =>
                  setNewCard((prev) => [prev[0], e.target.value, prev[2]])
                }
              />
              <TextField
                label="Description"
                className={styles.textField}
                value={newCard[2]}
                onChange={(e) =>
                  setNewCard((prev) => [prev[0], prev[1], e.target.value])
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCard}
                className={styles.addCardButton}
              >
                Add Card
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
