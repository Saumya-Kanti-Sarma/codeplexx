"use client";
import Profile from "@/components/Profile/Profile";
import styles from "./page.module.css";
import Btn from "@/components/Btn/Btn";
import React, { useState } from "react";
import CreatePost from "@/components/CreatePost/CreatePost";
import AllPosts from "@/components/AllPosts/AllPosts";
import { useUserStore } from "../../../../../store/zestStore/Store";
import Loader from "@/components/Loaders/Loader";

export default function page() {
  const [postDisplay, setPostDisplay] = useState(true);
  const { name, profile, about, id } = useUserStore();
  const [wordLimit, setWordLimit] = useState(100);
  const handleWordLimit = () => {
    setWordLimit((prev) => prev == 100 ? 1000 : 100)
    console.log(wordLimit);
  };
  const displayText = about.slice(0, wordLimit);
  return (
    <>
      <div className={styles.main}>
        {id ? <><div className={styles.profileArea}>
          <Profile
            wrappedlink={""}
            profileImg={profile}
            profileName={name}
            editBtnDisplay={""}
            editBtnOnclick={() => { }}
            about={about}
            truncateBtnOnClick={handleWordLimit}
            truncateBtnTxt={displayText.length < 100 ? "...read more" : "...read less"}
          />
        </div><div className={styles.btnArea}>
            <Btn text="All posts" bgColor={`${postDisplay == true ? "--primary-green" : "--light-green"}`} onClick={() => { setPostDisplay(true) }} />
            <Btn text="Create" bgColor={`${postDisplay == true ? "--light-green" : "--primary-green"}`} onClick={() => { setPostDisplay(false) }} />
          </div></> : <> <div className={styles.loader}>
            <Loader />
          </div></>}
        <hr />
        <div className={styles.contentArea} style={{ display: id ? "" : "none" }}>
          <div style={{ display: `${postDisplay == true ? "" : "none"}` }} className={styles.allPosts} >
            <AllPosts />
          </div>
          <div style={{ display: `${postDisplay == true ? "none" : ""}` }} className={styles.create}>
            <CreatePost />
          </div>
        </div>

        <div className={styles.lower}> </div>
      </div>
    </>
  );
}