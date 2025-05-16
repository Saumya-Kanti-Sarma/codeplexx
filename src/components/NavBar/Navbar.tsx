"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className={styles.nav}>
      <h1 className={styles.h1Logo}>
        <Link href={""}>
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
        <Link href={""}>
          <img src="/icons/pfp.svg" alt="Profile" />
          Sign-up
        </Link>
      </button>
    </nav>
  );
};

export default Navbar;