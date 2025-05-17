"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Blogs() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("/markdown.txt")
      .then((res) => res.text())
      .then((txt) => setData(txt))
      .catch((err) => console.log(err));
  }, [])
  return (
    <>
      <div className={styles.blogContainer}>
        <article className={styles.blogContent}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {data || "Loading..."}
          </ReactMarkdown>
        </article>
      </div>
      <br />
    </>
  );
}