"use client";
import styles from './page.module.css';
import data from "../../../data.js";
import { truncateTxt } from '@/hooks/Truncate';
interface pfpProps {

}
const Profile: React.FC<pfpProps> = ({ }) => {
  return (
    <div className={styles.pfpWraper}>
      <section className={styles.imgWraper}>
        <img src={data[0].pfp} alt={data[0].pfp} className={styles.pfpImg} />
      </section>
      <section className={styles.txtWraper}>
        <h1>{data[0].user.name}</h1>
        <p>{truncateTxt(data[0].user.about, 200, "..")}</p>
      </section>
    </div>
  )
}

export default Profile
