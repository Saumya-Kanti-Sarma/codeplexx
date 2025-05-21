"use client";
import Profile from "@/components/Profile/Profile";
import styles from "./page.module.css";
import { useUserStore } from "../../../../../store/zestStore/Store";

export default function page() {
  const { id } = useUserStore();
  return (
    <>
      <main className={styles.main}>
        <Profile />
      </main>
    </>
  );
}
