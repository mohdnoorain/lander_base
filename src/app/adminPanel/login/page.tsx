"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginApi = async (payload: { [x: string]: number | string }) => {
  try {
    const response = await fetch("/api/admin/auth/logIn", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch feature data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const LoginPage = () => {
  const router = useRouter(); // Proper hook usage

  const checkCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const data = await LoginApi({ username, password });

    if (data) {
      console.log("Login successful");
      sessionStorage.setItem("token", data.token);
      router.replace("/adminPanel/dashboard");
    } else {
      console.log("Login failed");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token") || "";
    const tokenTime = new Date(token);
    if (token && tokenTime.getTime() + 3600000 > Date.now()) {
      router.replace("/adminPanel/dashboard");
    } else {
      sessionStorage.removeItem("token");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>
          Welcome to <span className={styles.brand}>Admin</span>
        </h2>
        <form className={styles.form} onSubmit={checkCredentials}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="email@domain.com"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className={styles.input}
              required
            />
          </div>
          <a href="#" className={styles.forgotPassword}>
            Forgot password?
          </a>
          <button type="submit" className={styles.submitButton}>
            Log in
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginPage;
