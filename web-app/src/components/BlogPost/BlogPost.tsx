"use client";

import styles from "./page.module.css";
import { truncateTxt } from "@/hooks/truncate/Truncate";
import Link from "next/link";

interface BlogProps {
  img?: string;
  title: string;
  date: string;
  link: string;
  about?: string;
  category?: string;
  author?: string;
}

const BlogPost: React.FC<BlogProps> = ({
  img,
  title,
  date,
  link,
  category,
  author,
}) => {
  return (
    <Link href={link} className={styles.link}>
      <div className={styles.wraper}>
        <section className={styles.imgSection}>
          <img src={img || "/def/def-img.jpeg"} alt={img} />
        </section>
        <section className={styles.textSection}>
          {category && <span className={styles.category}>{category}</span>}
          <h1 className={styles.title}>
            {truncateTxt(title, 100, "...")}
          </h1>
          {(author || date) && (
            <p className={styles.meta}>
              {author && date
                ? `${author} - ${truncateTxt(date, 16, "")}`
                : author || truncateTxt(date, 16, "")}
            </p>
          )}
        </section>
      </div>
    </Link>
  );
}

export default BlogPost
