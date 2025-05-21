"use client";
import React, { useState } from 'react';
import { useUserStore } from '../../../store/zestStore/Store';
import styles from './page.module.css';

interface profileProps {
  display: string,
  onclick?: () => void
}
const Profile: React.FC<profileProps> = ({ display, onclick }) => {
  const { name, profile, about } = useUserStore();
  const [wordLimit, setWordLimit] = useState(100);
  const handleWordLimit = () => {
    setWordLimit((prev) => prev == 100 ? 1000 : 100)
    console.log(wordLimit);
  };
  const displayText = about.slice(0, wordLimit);
  return (
    <div className={styles.pfpWraper}>
      <section className={styles.imgWraper}>
        <img src={profile || "/icons/pfp.svg"} alt={profile} className={styles.pfpImg} />
      </section>
      <section className={styles.txtWraper}>
        <div className={styles.headingAndlogo}>
          <h1>{name || "Loading..."}</h1>
          <button className={styles.editBtn} style={{ display: display }} onClick={onclick}>
            <img src="/icons/edit.svg" alt="" />
          </button>
        </div>
        <p>
          {about && (
            <>
              {`${displayText}`}
              <button className={styles.readMore} onClick={handleWordLimit}>
                {wordLimit == 100 ? "...read more" : "..read less"}
              </button>
            </>
          )}
        </p>
      </section>
    </div>
  )
}

export default Profile
