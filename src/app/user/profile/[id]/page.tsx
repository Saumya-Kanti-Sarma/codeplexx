"use client";
import Profile from "@/components/Profile/Profile";
import styles from "./page.module.css";
import Btn from "@/components/Btn/Btn";
import React, { useState } from "react";
import CreatePost from "@/components/CreatePost/CreatePost";

export default function page() {
  const [postDisplay, setPostDisplay] = useState(true);

  return (
    <>
      <main className={styles.main}>
        <Profile onclick={() => (null)} display="" />
        <div className={styles.btnArea}>
          <Btn text="All posts" bgColor={`${postDisplay == true ? "--primary-green" : "--light-green"}`} onClick={() => { setPostDisplay(true) }} />
          <Btn text="Create" bgColor={`${postDisplay == true ? "--light-green" : "--primary-green"}`} onClick={() => { setPostDisplay(false) }} />
        </div>
        <div className={styles.contentArea}>
          <section style={{ display: `${postDisplay == true ? "flex" : "none"}` }} >
            yo
          </section>
          <section style={{ display: `${postDisplay == true ? "none" : "flex"}` }} className={styles.create}>
            <CreatePost />
          </section>
        </div>
      </main>
    </>
  );
}
