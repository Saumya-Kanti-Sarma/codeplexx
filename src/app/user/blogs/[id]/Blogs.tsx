"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { truncateTxt } from "@/hooks/Truncate";
import Profile from "@/components/Profile/Profile";
import AllPosts from "@/components/AllPosts/AllPosts";
import Loader from "@/components/Loaders/Loader";

interface BlogProps {
  id?: string
}

const Blogs: React.FC<BlogProps> = ({ id }) => {
  type blog = {
    user_id: string;
    title: string;
    content: string;
    image_url: string;
    tags: string[];
    created_at: string;
  }
  const [rawData, setData] = useState<blog[]>([]);
  useEffect(() => {
    async function GetData() {
      const req = await axios.get(`/api/blogs/one?id=${id}`);
      if (req.status == 200) {
        //console.log(req.data);
        setData(req.data.data);
      }
      if (req.data.data.length < 0) {
        return (
          <>
            <h1>Opps! nothing available here</h1>
          </>
        )
      }
    }; GetData();
  }, [id]);

  return (
    <>
      {rawData && rawData.length > 0 ? rawData.map((item, index) =>
        <>
          <div className={styles.blogContainer}>
            <article className={styles.blogContent}>
              <h1 className={styles.title}>{rawData[0]?.title}</h1>
              <p></p>
              <div className={styles.blogImgholder}>
                <img src={rawData[0]?.image_url || "/def/def-img.jpeg"} alt="blogImg" className={styles.blogImg} />
                <p>posted: {truncateTxt(`${rawData[0]?.created_at}`, 10, "")}</p>
              </div>
              <hr />
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {rawData[0]?.content}
              </ReactMarkdown>
            </article>
            <br />
            <h1>Follow Me: </h1>
            <Profile display="none" />
            <br />
            <h1>Read More: </h1>
            <AllPosts />
            <br />
            <hr />
            <div className="lastDiv"></div>
          </div>
          <br />
        </>
      ) : <>
        <div className={styles.loader}>
          <Loader />
        </div>
      </>}
    </>
  );
}

export default Blogs;