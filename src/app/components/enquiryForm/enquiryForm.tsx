"use client";
import React, { useState, useEffect } from "react";
import styles from "./enquiryForm.module.css";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
}

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    fullName: boolean;
    phoneNumber: boolean;
    country: boolean;
  }>({
    fullName: false,
    phoneNumber: false,
    country: false,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/api/CountriesNameData");
        if (response.ok) {
          const data: string[] = await response.json();
          setCountries(data);
        } else {
          console.error("Failed to fetch countries");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "fullName" && value) {
      setErrors((prev) => ({ ...prev, fullName: false }));
    }

    if (name === "phoneNumber" && value) {
      setErrors((prev) => ({ ...prev, phoneNumber: false }));
    }

    if (name === "country" && value) {
      setErrors((prev) => ({ ...prev, country: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, phoneNumber, country } = formData;
    let hasError = false;

    if (!fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: true }));
      hasError = true;
    }

    if (!phoneNumber.trim()) {
      setErrors((prev) => ({ ...prev, phoneNumber: true }));
      hasError = true;
    }

    if (!country) {
      setErrors((prev) => ({ ...prev, country: true }));
      hasError = true;
    }

    if (hasError) return;

    console.log("Form Submitted", formData);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Register Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className={`${styles.inputField} ${
            errors.fullName ? styles.error : ""
          }`}
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && (
          <p className={styles.errorText}>Full Name is required.</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.inputField}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone"
          className={`${styles.inputField} ${
            errors.phoneNumber ? styles.error : ""
          }`}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <p className={styles.errorText}>Phone number is required.</p>
        )}
        <select
          name="country"
          className={`${styles.dropdown} ${errors.country ? styles.error : ""}`}
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className={styles.errorText}>Please select a country.</p>
        )}
        <button type="submit" className={styles.submitButton}>
          Enquire Now
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
