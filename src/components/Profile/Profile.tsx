"use client";
import Btn from '../Btn/Btn';
import styles from './page.module.css';
import Link from 'next/link';

interface profileProps {

  wrappedlink?: string,
  profileImg?: string,
  profileName?: string,
  editBtnDisplay?: string,
  editBtnOnclick?: () => void,
  about?: string,
  truncateBtnOnClick?: () => void,
  truncateBtnTxt?: string,
}
const Profile: React.FC<profileProps> = ({
  wrappedlink = "",
  profileImg,
  profileName,
  editBtnDisplay,
  editBtnOnclick,
  about,
  truncateBtnOnClick,
  truncateBtnTxt,
}) => {

  return (
    <div className={styles.pfpWraper}>
      <section className={styles.imgWraper}>
        <img src={profileImg || "/icons/pfp.svg"} alt={profileImg} className={styles.pfpImg} />
      </section>
      <section className={styles.txtWraper}>
        <div className={styles.headingAndlogo}>
          <h1>{profileName || "Loading..."}</h1>
          <button className={styles.editBtn} style={{ display: editBtnDisplay }} onClick={editBtnOnclick}>
            <img src="/icons/edit.svg" alt="" />
          </button>
        </div>
        <p>
          {about}
          <button className={styles.readMore} onClick={truncateBtnOnClick}>{truncateBtnTxt}</button>
        </p>
        <div className={styles.btnArea}>
          <Btn text="visit" />
        </div>
      </section>
    </div>
  )
}

export default Profile
