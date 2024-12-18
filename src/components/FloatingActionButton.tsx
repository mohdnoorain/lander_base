"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaTimes } from "react-icons/fa";
import { RiWechatLine } from "react-icons/ri"; // Import RiWechatLine
import styles from "./FloatingActionButton.module.css"; // Import the CSS module

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.fabContainer}>
      {/* Animated button options */}
      <div
        className={`${styles.fabOptions} ${
          isOpen ? styles.fabShow : styles.fabHide
        }`}
      >
        {isOpen && (
          <>
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.fabButton} ${styles.whatsapp}`}
            >
              <FaWhatsapp className={styles.fabIcon} />
            </a>
            <a
              href="https://m.me/your-messenger-id"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.fabButton} ${styles.messenger}`}
            >
              <FaFacebookMessenger className={styles.fabIcon} />
            </a>
          </>
        )}
      </div>

      {/* Main button with toggle between WeChat and cross icons */}
      <button
        onClick={toggleMenu}
        className={`${styles.fabButton} ${styles.rotateButton}`}
        style={{
          transform: isOpen ? "rotate(360deg)" : "rotate(0deg)", // Rotate when open
        }}
      >
        {isOpen ? <FaTimes size={24} /> : <RiWechatLine size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton;
