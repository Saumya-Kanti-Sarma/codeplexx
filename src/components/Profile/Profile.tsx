"use client";
import styles from './page.module.css';
interface pfpProps {
  img: string,
  name: string,
  about: string
}
const Profile: React.FC<pfpProps> = ({
  img = "/icons/pfp.svg",
  name = "",
  about = ""
}) => {
  return (
    <div className={styles.pfpWraper}>
      <section className={styles.imgWraper}>
        <img src={img} alt={img} className={styles.pfpImg} />
      </section>
      <section className={styles.txtWraper}>
        <h1>{name}</h1>
        <p>{about}</p>
      </section>
    </div>
  )
}

export default Profile
