"use client";

import styles from "./page.module.css";
import { truncateTxt } from "@/hooks/truncate/Truncate";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  const [truncateLength, setTruncateLength] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setTruncateLength(400);
      } else if (window.innerWidth >= 600) {
        setTruncateLength(300);
      } else if (window.innerWidth >= 400) {
        setTruncateLength(200);
      } else {
        setTruncateLength(100);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Link href={link} className={styles.link}>
      <div className={styles.wraper}>
        <section className={styles.imgSection}>
          <img src={img || "/def/def-img.jpeg"} alt={img} />
        </section>
        <section className={styles.textSection}>
          <div className={styles.titleAndDescp}>
            <h1 className={styles.h1}>{truncateTxt(title, 150, "...")}</h1>
            <section className={styles.about}>
              <Markdown>
                {`${truncateTxt(about, truncateLength, "...")}`}
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
