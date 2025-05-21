"use client";
import Profile from "@/components/Profile/Profile";
import styles from "./page.module.css";
import { useUserStore } from "../../../../../store/zestStore/Store";
import Btn from "@/components/Btn/Btn";
import { useState } from "react";
import Input from "@/components/Input/Input";

export default function page() {
  const { id } = useUserStore();
  const [postDisplay, setPostDisplay] = useState(true);
  const handlePostDisplay = () => (setPostDisplay((prev) => prev == true ? false : true));
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
            <Input
              h3="Title" inpName="title" inpPlaceholder="Enter title" inpValue={""} inpOnChange={() => { }}
            />
            <Input
              h3="select image" inpType="file" inpValue={""} inpOnChange={() => { }}
            />
            <div className={styles.description}>
              <h3>Enter Description</h3>
              <textarea name="description" id="description" placeholder="Enter description here"></textarea>
            </div>
            <Input
              h3="Enter tags" inpName="tags" inpPlaceholder="Eg: React,Node.js, frotned, python" inpValue={""} inpOnChange={() => { }}
            />
            <Btn text="Post" />
          </section>
        </div>
      </main>
    </>
  );
}
