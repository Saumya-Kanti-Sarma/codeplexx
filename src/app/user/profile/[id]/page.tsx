"use client"
import Profile from "@/components/Profile/Profile";
import styles from "./page.module.css";
import { compareHash, hash } from "@/app/libs/hashPasswords";

export default function page() {

  return (
    <>
      <main className={styles.main}>
        <Profile
          img="/icons/pfp.svg"
          name="Name"
          about="write your about here"
        />
        <p>{hash("Securepassword")}</p>
        <p>{compareHash("Securepassword", "a6bd432dce393e5ec44172788be225bac1b6129de4a3d5dfabd89fd548f6c4ca")}</p>
      </main>
    </>
  );
}
