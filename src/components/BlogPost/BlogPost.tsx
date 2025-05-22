"use client";

import styles from "./page.module.css";
import { truncateTxt } from "@/hooks/Truncate";
import Link from "next/link";
import Markdown from "react-markdown";

interface BlogProps {
  img?: string,
  category?: [],
  title: string,
  date: string,
  link: string,
  about: string,
}
const BlogPost: React.FC<BlogProps> = ({
  img,
  category,
  title,
  date,
  link,
  about,
}) => {
  return (
    <div className={styles.wraper}>
      <section className={styles.imgSection}>
        <img src={img || "/def/def-img.jpeg"} alt={img} />
      </section>
      <section className={styles.textSection}>
        <div className={styles.category}>{
          <p>
            {category?.join(" • ")}
          </p>
        }
        </div>
        <Link href={link}><h1 className={styles.h1}>{truncateTxt(title, 70, "...")}</h1></Link>
        <Markdown>
          {`${truncateTxt(about, 100, "...")}`}
        </Markdown>
        <p className={styles.author}>{truncateTxt(date, 16, "")}</p>
      </section>
    </div>
  )
}

export default BlogPost
