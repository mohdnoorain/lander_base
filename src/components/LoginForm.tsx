"use client";

import React, { useState, useRef } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300); // Matches animation duration
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.overlay} ${
        isClosing ? styles.fadeOut : styles.fadeIn
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${
          isClosing ? styles.slideDown : styles.slideUp
        }`}
      >
        {/* Close Button */}
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>

        {/* Form Content */}
        <h2 className={styles.title}>Log In</h2>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter username" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" />
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In →
          </button>
        </form>
      </div>
    </div>
  );
}
