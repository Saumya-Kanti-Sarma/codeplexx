"use client";
import Profile from "@/components/Profile/Profile";
import styles from "./page.module.css";
import Btn from "@/components/Btn/Btn";
import React, { useEffect, useState } from "react";
import CreatePost from "@/components/CreatePost/CreatePost";
import AllPosts from "@/components/AllPosts/AllPosts";
import { useUserStore } from "../../../../../store/zestStore/Store";
import axios from "axios";
import Loader from "@/components/Loaders/Loader";
import { useParams } from "next/navigation";


const ProfilePage = () => {
  const { id } = useUserStore();
  const { name } = useParams();
  const [postDisplay, setPostDisplay] = useState(true);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    async function getUserID() {
      const req = await axios.get(`/api/user?name=${name}`);
      const res = await req.data.data;
      setUserId(res[0]?.id)
      console.log(res);

    }; getUserID();
  }, [userId])
  return (
    <>
      <div className={styles.main}>

        <div className={styles.profileArea}>
          <Profile
            profileName={`${name}`}
            displayVisitBtn={false}
            editBtnDisplay={id ? true : false}
          />
        </div>
        {id ? <>
          <div className={styles.btnArea}>
            <Btn text="All posts" bgColor={`${postDisplay == true ? "--primary-green" : "--light-green"}`} onClick={() => { setPostDisplay(true) }} />
            <Btn text="Create" bgColor={`${postDisplay == true ? "--light-green" : "--primary-green"}`} onClick={() => { setPostDisplay(false) }} />
          </div>
        </> : <> <br /></>}

        <hr />
        <div className={styles.contentArea} >
          <div style={{ display: `${postDisplay == true ? "" : "none"}` }} className={styles.allPosts} >
            {
              userId && userId.length < 0 ? <>
                <div className={styles.miniLoader}>
                  <Loader />
                </div>
              </> : <AllPosts url={`/api/blogs/getAll?id=${userId}&from=0&to=12`} />
            }
          </div>
          <div style={{ display: id ? "" : "none" }}>
            <div style={{ display: `${postDisplay == true ? "none" : ""}` }} className={styles.create}>
              <CreatePost />
            </div>
          </div>
        </div>

        <div className={styles.lower}> </div>
      </div>
    </>
  );
}

export default ProfilePage;