"use client";

import styles from "./page.module.css";
import { truncateTxt } from "@/hooks/Truncate";
import Link from "next/link";

interface BlogProps {
  img: string,
  category: string[],
  title: string,
  author: string,
  date: string,
  link: string,
}
const BlogPost: React.FC<BlogProps> = ({
  img,
  category,
  title,
  author,
  date,
  link,
}) => {
  return (
    <div className={styles.wraper}>
      <section className={styles.imgSection}>
        <img src={img} alt={img} />
      </section>
      <section className={styles.textSection}>
        <div className={styles.category}>{
          <p>
            {category.join(" • ")}
          </p>
        }
        </div>
        <Link href={link}><h1 className={styles.h1}>{truncateTxt(title, 70, "...")}</h1></Link>
        <p className={styles.author}>{author} | {truncateTxt(date, 16, "")}</p>
      </section>
    </div>
  )
}

export default BlogPost
