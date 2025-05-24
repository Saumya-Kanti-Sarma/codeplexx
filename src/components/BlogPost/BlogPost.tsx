"use client";

import styles from "./page.module.css";
import { truncateTxt } from "@/hooks/Truncate";
import Link from "next/link";
import Markdown from "react-markdown";

interface BlogProps {
  img?: string,
  category?: string[],
  title: string,
  date: string,
  link: string,
  about: string,
  key: number,
}
const BlogPost: React.FC<BlogProps> = ({
  img,
  category,
  title,
  date,
  link,
  about,
  key
}) => {
  return (
    <Link href={link} className={styles.link} key={key}>
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
          <h1 className={styles.h1}>{truncateTxt(title, 70, "...")}</h1>
          <section className={styles.about}>
            <Markdown>
              {`${truncateTxt(about, window.innerWidth < 600 ? 100 : 200, "...")}`}
            </Markdown>
          </section>
          <p className={styles.author}>{truncateTxt(date, 16, "")}</p>
        </section>
      </div>
    </Link>
  )
}

export default BlogPost
