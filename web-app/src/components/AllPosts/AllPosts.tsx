"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogPost from '../BlogPost/BlogPost';
import styles from "./page.module.css";
interface PostParams {
  url?: string,
}
const AllPosts: React.FC<PostParams> = ({ url }) => {

  type BlogData = {
    image_url: string;
    category?: string[],
    title?: string;
    author?: string;
    date?: string;
    link?: string;
    created_at?: string;
    content?: string;
    id?: string;
  };
  const [data, setData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function GetBlogs() {
      setLoading(true);
      const reqData = await axios.get(`${url}`);
      setData(reqData.data.data);
      setLoading(false);
    }
    GetBlogs();
  }, [url]);

  if (loading) return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
        <div className={styles.skeletonWraper} key={index}>
          <section className={styles.skeletonImgSection}>
            <img src={"/def/def-img.jpeg"} alt={"def-img.jpeg"} />
          </section>
          <section className={styles.skeletonTextSection}>
            <div></div>
            <div></div>
          </section>
        </div>
      ))}
    </>
  );
  if (data && data.length == 0) {
    return (
      <>
        <p style={{ textAlign: "center" }}>No post Found</p>
      </>
    )
  }

  return (
    <>
      {data && data.map((item, index) => (
        <BlogPost
          key={index}
          img={item?.image_url || "/def/def-img.jpeg"}
          title={`${item.title}`}
          date={`${item.created_at}`}
          link={`/user/blogs/${item.id}`}
          about={`${item.content}`}
        />
      ))}
      <br />
    </>
  );
};
export default AllPosts
