import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo and Description */}
        <div className={styles.logoSection}>
          <img
            src="https://unitedestates.com/wp-content/uploads/2022/12/Untitled-design-6-1.png"
            alt="United Estates Logo"
            className={styles.logo}
          />
          <p className={styles.logoDescription}>
            Real Estate Brokerage & Property Management Solution
          </p>
          <p className={styles.logoDescription}>
            We specialize in Real Estate Consultancy and Services in Dubai,
            including Buying/Selling, Leasing/Rental, and Property Management.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3 className={styles.quickLinksTitle}>Quick Links</h3>
          <ul className={styles.quickLinksList}>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/our-agents">Our Agents</Link>
            </li>
            <li>
              <Link href="/buy">Buy</Link>
            </li>
            <li>
              <Link href="/sell">Sell</Link>
            </li>
            <li>
              <Link href="/rent">Rent</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/client-reviews">Client Reviews</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>Contact Us</h3>
          <p className={styles.contactInfo}>
            Office No 204, Al Masaood Tower 2, Airport Road, Deira, Dubai.
          </p>
          <div className={styles.contactInfo}>
            <p>
              <strong>For Sales Enquiries:</strong> +971 42500089
            </p>
            <p>
              <strong>For Leasing Enquiries:</strong> +971 42500089
            </p>
            <p>
              <strong>For Maintenance Enquiries:</strong> +971 529911010
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@unitedestates.com"
                className={styles.contactEmail}
              >
                info@unitedestates.com
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className={styles.socialMedia}>
          <h3 className={styles.socialTitle}>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaYoutube />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>
          © 2024. All Rights Reserved. /{" "}
          <Link href="/privacy-terms" className={styles.contactEmail}>
            Privacy & Terms
          </Link>
          .
        </p>
        <p>Designed by Digital Marketing</p>
      </div>
    </footer>
  );
};

export default Footer;
