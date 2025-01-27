"use client";
import * as React from "react";
import styles from "./layout.module.css";
import { Button, CardContent } from "@mui/material";
import {
  CardGiftcardSharp,
  Menu,
  MenuBookRounded,
  PaymentRounded,
} from "@mui/icons-material";

export default function DashboardLayout({ children }: any) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.headerContainer}>
        <Menu className={styles.menu} />
        <h2 className={styles.headerName}>Admin Dashboard</h2>
      </div>

      <hr className={styles.divider} />

      <div className={styles.mainContainer}>
        <div className={styles.dashboardButtonContainer}>
          <a
            href="/adminPanel/dashboard/mainsection"
            className={styles.linkButton}
          >
            <Button className={styles.ButtonMain}>
              <MenuBookRounded />
              Main Section
            </Button>
          </a>

          <a href="/adminPanel/dashboard/feature" className={styles.linkButton}>
            <Button className={styles.ButtonMain}>
              <PaymentRounded />
              Feature Section
            </Button>
          </a>
        </div>

        <hr className={styles.divider} />

        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
}
