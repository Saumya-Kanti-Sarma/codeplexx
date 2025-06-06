"use client";
import { useEffect, useState } from 'react';
import Btn from '../../app/utils/Btn/Btn';
import styles from './page.module.css';
import axios from 'axios';
import { truncateTxt } from '@/hooks/truncate/Truncate';
import Link from 'next/link';
import { useUserStore } from '../../../store/zestStore/Store';
import { useRouter } from 'next/navigation';

interface profileProps {
  profileName?: string,
  editBtnDisplay?: boolean,
  truncateBtnTxt?: string,
  displayTruncateBtn?: boolean,
  displayVisitBtn?: boolean,
}

const Profile: React.FC<profileProps> = ({
  profileName = "",
  editBtnDisplay = false,
  displayTruncateBtn = true,
  displayVisitBtn = true,
}) => {
  type UserData = {
    about: string;
    created_at: string;
    email: string;
    name: string;
    img: string;
    id: string;
  }
  const { name, about, profile } = useUserStore();// coming from store
  const [userData, setUserData] = useState<UserData>();
  const [maxAbout, setMaxAbout] = useState(100);
  const [truncateBtnTxt, settruncateBtnTxt] = useState("show more");
  const router = useRouter();
  useEffect(() => {
    async function GetUserData() {
      if (name != profileName) {
        const req = await axios.get(`/api/user?name=${profileName}`);
        if (req.status == 200) {
          //console.log({ userData: req.data.data[0] });
          setUserData(req.data?.data?.[0]);
        };
      } else {
        const data = {
          name: name,
          img: profile,
          about: about,
          created_at: "",
          email: "",
          id: ""
        };
        setUserData(data);
      };
    }; GetUserData();;


  }, [profileName, displayTruncateBtn])

  function handleTruncate() {
    if (maxAbout == 100) {
      setMaxAbout(1000);
      settruncateBtnTxt("show less");
    }
    else {
      setMaxAbout(100);
      settruncateBtnTxt("show more")
    }
  }
  if (userData == undefined) {
    return (
      <div className={styles.skeletonPfpWraper}>
        <section className={styles.imgWraper}>
          <img src={"/icons/pfp.svg"} alt={"default image"} className={styles.pfpImg} />
        </section>
        <section className={styles.skeletonTtxtWraper}>
          <div className={styles.skeletopnWrapper}></div>
          <div className={styles.skeletopnWrapper}></div>
        </section>
      </div>
    )
  }

  function handleEdit() {
    router.push(`/user/profile/${name}/edit`)
  };
  return (
    <>

      <div className={styles.pfpWraper}>
        <section className={styles.imgWraper}>
          <img src={userData?.img || "/icons/pfp.svg"} alt={userData?.img} className={styles.pfpImg} />
        </section>
        <section className={styles.txtWraper}>
          <div className={styles.headingAndlogo}>
            <h1>{userData?.name || "Loading..."}</h1>
            <button className={styles.editBtn} style={{ display: editBtnDisplay == true ? "" : "none" }} onClick={handleEdit}>
              <img src="/icons/edit.svg" alt="" />
            </button>
          </div>
          <p>
            {truncateTxt(`${userData?.about || ""}`, maxAbout, "")}...
            {userData && userData?.about?.length > 50 ?
              <button
                className={styles.readMore}
                onClick={handleTruncate} style={{ display: displayTruncateBtn ? "" : "none" }}>{truncateBtnTxt}
              </button> : <></>
            }
          </p>
          <div className={styles.btnArea} style={{ display: displayVisitBtn ? "" : "none" }}>
            <Link href={`/user/profile/${userData?.name}`} className={styles.visit}><Btn text="visit" /></Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Profile
