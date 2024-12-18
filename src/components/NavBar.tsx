"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMdCall } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import styles from "./NavBar.module.css";
import LoginForm from "./LoginForm";

const NavBar: React.FC = () => {
  const [isMediumMenuOpen, setMediumMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const toggleMediumMenu = () => setMediumMenuOpen(!isMediumMenuOpen);
  const toggleSignIn = () => setShowSignIn(!showSignIn);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <CgProfile className={styles.profileIcon} onClick={toggleSignIn} />

        <img
          src="http://unitedestates.com/wp-content/uploads/2022/12/Untitled-design-6-1.png"
          alt="Logo"
          className={`${styles.logo}`}
        />

        <div className={styles.compeleteMenu}>
          <div className={styles.desktopMenu}>
            <div className={styles.desktopLinks}>
              {["Buy", "Sell", "Rent", "Off Plan", "Services", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={styles.link}
                  >
                    {item}
                  </Link>
                )
              )}
            </div>

            <div className={styles.contactContainer}>
              <span className={styles.contactDetails}>
                <IoMdCall />
                +971425000
              </span>

              <CgProfile
                className={styles.profileIcon1}
                onClick={toggleSignIn}
              />

              <div>
                <a href="#" className={styles.listPropertyButton}>
                  List Your Property
                </a>
              </div>
            </div>

            {/* Hamburger Icon for Medium screens (1024px to 1285px) */}
            {isMediumMenuOpen ? (
              <button
                onClick={() => setMediumMenuOpen(false)}
                className={styles.humbugerIcon1}
              >
                &times;
              </button>
            ) : (
              <button onClick={toggleMediumMenu} className={styles.memuIcon1}>
                <svg
                  className={styles.menuIconColor}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            )}
          </div>
          {isMediumMenuOpen ? (
            <button
              onClick={() => setMediumMenuOpen(false)}
              className={styles.hamburgerIcon}
            >
              &times;
            </button>
          ) : (
            <button
              onClick={toggleMediumMenu}
              className={styles.hamburgerClose}
            >
              <svg
                className={styles.hamburgerSvg}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Medium Screen Menu Drawer (1024px to 1285px) */}
      {isMediumMenuOpen && (
        <div
          className={`${styles.menuDrawer} ${
            isMediumMenuOpen ? styles.open : ""
          }`}
        >
          {/* Menu Items */}
          <div className={styles.menItemFlex}>
            {["Buy", "Sell", "Rent", "Off Plan", "Services", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={styles.menuItemText}
                  onClick={() => setMediumMenuOpen(false)}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {showSignIn && <LoginForm/>}
    </nav>
  );
};

export default NavBar;
