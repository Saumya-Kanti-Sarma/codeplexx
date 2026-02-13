"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useState, useRef } from "react";
import { useUserStore } from "../../store/zestStore/Store";
import axios from "axios";
import { useRouter } from "next/navigation";

type SearchItem = {
  title?: string;
  name?: string;
};

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayDropdown, setdisplayDropdown] = useState("none");
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { name, profile } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setdisplayDropdown("flex");
    const value = e.target.value;
    if (value.length == 0) setLoading(false);
    setSearchQuery(value);
    if (searchQuery.length >= 0) {

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const getData = async () => {
          const data = await axios.get(`/api/search/quick?query=${value}`);
          setSearchData(data.data.data);
          console.log(data.data.data);
          setLoading(false);

        }
        getData();

      }, 800);
    }
  };

  const handleSubmit = () => {
    setdisplayDropdown("none");
    if (searchQuery.length > 0) {
      router.push(`/user/search/${searchQuery}`)
    }
  }
  return (
    <nav className={styles.nav}>
      <h1 className={styles.h1Logo}>
        <Link href={"/user/home"}>
          Code <br /> Plexx
        </Link>
      </h1>
      <div className={styles.searchArea}>
        <input
          type="text"
          placeholder="Search here"
          className={styles.searchInp}
          value={searchQuery}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          <img src="/icons/search.svg" alt="Search" />
        </button>
        <div className={styles.searchvals} style={{ display: displayDropdown }}>
          {loading ? <p>Loading...</p> : <>
            {searchData && searchData.map((item, index) => (
              <Link href={`/user/search/${item.title || item.name || ""}`} className={styles.searchLinks} key={index} onClick={() => setdisplayDropdown("none")}>{item.title || item.name}</Link>
            ))}
          </>}
        </div>
      </div>
      <button className={styles.profileBtn}>
        <Link href={name ? `/user/profile/${name}` : "/"}>
          <img src={profile || "/icons/pfp.svg"} alt="Profile" />
          {name || "Sign-up"}
        </Link>
      </button>
    </nav>
  );
};

export default Navbar;