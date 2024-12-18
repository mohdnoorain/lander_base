"use client";
import React, { useState } from "react";
import styles from "./SignUpForm.module.css";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className={styles.inputField}
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.inputField}
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
