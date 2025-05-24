"use client"
import Btn from "@/components/Btn/Btn";
import styles from "./page.module.css";
import AllPosts from "@/components/AllPosts/AllPosts";
import { useState } from "react";
export default function Home() {
  const [filter, setFilter] = useState("");
  const [clickIndex, setClickIndex] = useState(0);

  function handleFilter(item: string, index: number) {
    setFilter(item.toLowerCase())
    setClickIndex(index);
  }
  return (
    <>
      <div className={styles.filterArea}>
        {["All", "React", "Node.js", "MongoDB", "Supabase", "Next.js", "DSA", "Stories", "Projects"].map((item, index) => (
          <Btn
            key={index}
            text={`${item}`}
            onClick={() => { handleFilter(item, index) }}
            bgColor={clickIndex == index ? "--primary-green" : "--light-green"}
          />
        ))}
      </div>
      <div className={styles.content}>
        <AllPosts url={`/api/blogs/getAll?from=0&to=12&filter=${filter || "all"}`} />
      </div>

    </>
  );
}
