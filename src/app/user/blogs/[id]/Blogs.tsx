"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { truncateTxt } from "@/hooks/Truncate";
import Profile from "@/components/Profile/Profile";
import AllPosts from "@/components/AllPosts/AllPosts";
import Loader from "@/app/utils/Loaders/Loader";
import { useParams } from "next/navigation";

const Blogs = () => {
  type blog = {
    user_id: string;
    title: string;
    content: string;
    image_url: string;
    tags: string[];
    created_at: string;
    uploaded_by: string;
  };

  const [rawData, setData] = useState<blog[]>([]);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    async function GetData() {
      const req = await axios.get(`/api/blogs/one?id=${params.id}`);
      if (req.status == 200) {
        //console.log(req.data);
        setData(req.data.data);
      };
      if (req.data.data.length < 0) {
        return (
          <>
            <h1>Opps! nothing available here</h1>
          </>
        )
      }
    }; GetData();
  }, [params.id, rawData[0]?.user_id]);

  return (
    <>
      {rawData && rawData.length > 0 ? rawData.map((item, index) =>
        <React.Fragment key={index}>
          <div className={styles.blogContainer} key={index}>
            <article className={styles.blogContent}>
              <h1 className={styles.title}>{item?.title}</h1>
              <p></p>
              <div className={styles.blogImgholder}>
                <img src={item?.image_url || "/def/def-img.jpeg"} alt="blogImg" className={styles.blogImg} />
                <p>posted: {truncateTxt(`${item?.created_at}`, 10, "")}</p>
              </div>
              <hr />
              <div className="markdown">

                <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                  {item?.content}
                </ReactMarkdown>
              </div>

            </article>
            <br />
            {item ? <>
              <h2>Follow Me: </h2>
              <br />
              <Profile
                displayTruncateBtn={false}
                displayVisitBtn={true}
                editBtnDisplay={false}
                profileName={`${item?.uploaded_by}`}
              />
            </> :
              <>
                <div className={styles.smallloader}>
                  <Loader />
                </div>
              </>}
            <br />
            <h3>Read More: </h3>
            <AllPosts url={`/api/blogs/getAll`} />
            <br />
            <div className="lastDiv"></div>
          </div>
        </React.Fragment>
      ) : <>
        <div className={styles.loader}>
          <Loader />
        </div>
      </>}
    </>
  );
}

export default Blogs;