import Link from "next/link"
import styles from "./page.module.css"

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.h1Logo}>
        <Link href={""}>
          Code <br /> Plexx
        </Link>
      </h1>
      <div className={styles.searchArea}>
        <input type="text" placeholder="Search here" className={styles.searchInp} />
        <button>
          <img src="/icons/search.svg" alt="" />
        </button>
      </div>
      <button className={styles.profileBtn}>
        <Link href={""}>
          <img src="/icons/pfp.svg" alt="" />
          Sign-up
        </Link>
      </button>
    </nav>
  )
}

export default Navbar
