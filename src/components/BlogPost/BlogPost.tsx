"use client";

import styles from "./page.module.css";
import { truncateTxt } from "@/hooks/truncate/Truncate";
import Link from "next/link";
import Markdown from "react-markdown";

interface BlogProps {
  img?: string,
  title: string,
  date: string,
  link: string,
  about: string,
}
const BlogPost: React.FC<BlogProps> = ({
  img,
  title,
  date,
  link,
  about
}) => {
  return (
    <Link href={link} className={styles.link}>
      <div className={styles.wraper}>
        <section className={styles.imgSection}>
          <img src={img || "/def/def-img.jpeg"} alt={img} />
        </section>
        <section className={styles.textSection}>
          <div className={styles.titleAndDescp}>
            <h1 className={styles.h1}>{truncateTxt(title, 150, "...")}</h1>
            <br />
            <section className={styles.about}>
              <Markdown>
                {`${truncateTxt(about, window.innerWidth < 600 ? 300 : 200, "...")}`}
              </Markdown>
            </section>
          </div>
          <p className={styles.author}>{truncateTxt(date, 16, "")}</p>
        </section>
      </div>
    </Link>
  )
}

export default BlogPost
