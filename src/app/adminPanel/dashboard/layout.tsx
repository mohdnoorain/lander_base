"use client";
import React, { useState, useEffect } from "react";
import styles from "./layout.module.css";
import { Button } from "@mui/material";
import {
  BrowseGalleryRounded,
  Checklist,
  Download,
  Image,
  Menu,
  MenuBookRounded,
  NewspaperTwoTone,
  PaymentOutlined,
  PaymentRounded,
  PlaceRounded,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    href: "/adminPanel/dashboard/mainsection",
    label: "Main Section",
    icon: <MenuBookRounded />,
  },
  {
    href: "/adminPanel/dashboard/feature",
    label: "Feature Section",
    icon: <PaymentRounded />,
  },
  {
    href: "/adminPanel/dashboard/gallerysection",
    label: "Gallery Section",
    icon: <Image />,
  },
  {
    href: "/adminPanel/dashboard/amenities",
    label: "Amenities",
    icon: <Checklist />,
  },
  {
    href: "/adminPanel/dashboard/nearbysection",
    label: "NearBy Section",
    icon: <PlaceRounded />,
  },
  {
    href: "/adminPanel/dashboard/paymentsection",
    label: "Payment Section",
    icon: <PaymentOutlined />,
  },
  {
    href: "/adminPanel/dashboard/enquirypropertysection",
    label: "Enquiry Section",
    icon: <Download />,
  },
  {
    href: "/adminPanel/dashboard/similiarprojectsection",
    label: "Similar Section",
    icon: <NewspaperTwoTone />,
  },
];

export default function DashboardLayout({ children }: any) {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const currentPath = usePathname();

  useEffect(() => {
    setSelectedPath(currentPath);
  }, [currentPath]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerContainer}>
        <Menu className={styles.menu} />
        <h2 className={styles.headerName}>Admin Dashboard</h2>
      </div>

      <hr className={styles.divider} />

      <div className={styles.mainContainer}>
        <div className={styles.dashboardButtonContainer}>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`${styles.linkButton} ${
                selectedPath === item.href ? styles.active : ""
              }`}
              onClick={() => setSelectedPath(item.href)}
            >
              <Button className={styles.ButtonMain}>
                {item.icon}
                {item.label}
              </Button>
            </a>
          ))}
        </div>

        <hr className={styles.divider} />

        <div className={styles.contentArea}>{children}</div>
      </div>
    </div>
  );
}
