"use client"
import Btn from "@/app/utils/Btn/Btn";
import styles from "./page.module.css";
import AllPosts from "@/components/AllPosts/AllPosts";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [filter, setFilter] = useState("");
  const [clickIndex, setClickIndex] = useState(0);
  const [tags, setTags] = useState<string[] | null>(null);

  function handleFilter(item: string, index: number) {
    setFilter(item.toLowerCase())
    setClickIndex(index);
  }
  useEffect(() => {
    async function getTag() {
      const res = await axios.get("/api/tags");
      if (res.status != 200) {
        return setTags(["All", "React", "Node.js", "MongoDB", "Supabase", "Next.js", "JS", "Stories", "Projects"])
      };
      setTags(["all", ...res.data.message]);

    }; getTag();
  }, [])
  return (
    <>
      <div className={styles.filterArea}>
        {tags ? tags.map((item, index) => (
          <Btn
            key={index}
            text={`${item}`}
            onClick={() => { handleFilter(item, index) }}
            bgColor={clickIndex == index ? "--primary-green" : "--light-green"}
          />
        )) : <>Loading...</>}
      </div>
      <div className={styles.content}>
        <AllPosts url={`/api/blogs/getAll?from=0&to=12&filter=${filter || "all"}`} />
      </div>
      <div className="lastDiv"></div>
    </>
  );
}
