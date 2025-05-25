"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { useUserStore } from "../../../store/zestStore/Store";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { name, profile } = useUserStore();

  return (
    <nav className={styles.nav}>
      <h1 className={styles.h1Logo}>
        <Link href={"/user/home"}>
          Code <br /> Plexx
        </Link>
      </h1>
      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="Search here"
          className={styles.searchInp}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>
          <img src="/icons/search.svg" alt="Search" />
        </button>
      </div>
      <button className={styles.profileBtn}>
        <Link href={name ? `/user/profile/${name}` : "/"}>
          <img src={profile || "/icons/pfp.svg"} alt="Profile" />
          {name || "Sign-up"}
        </Link>
      </button>
    </nav>
  );
};

export default Navbar;