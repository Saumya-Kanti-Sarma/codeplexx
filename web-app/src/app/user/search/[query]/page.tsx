"use client"

import BlogPost from "@/components/BlogPost/BlogPost";
import Profile from "@/components/Profile/Profile";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const Page = () => {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);

  interface dataProps {
    about?: string,
    name?: string,
    id?: string,
    image_url?: string,
    title?: string,
    content?: string,
    uploaded_by?: string,
  }
  const [data, setData] = useState<dataProps[]>([])
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const req = await axios.get(`/api/search?query=${query}`);
      setData(req.data.data);
      setLoading(false);
    };
    getData();
  }, [query]);

  if (loading) return (
    <div className={styles.mainSearchWrapper}>
      <div className={styles.skeletonPfpWraper}>
        <section className={styles.imgWraper}>
          <img src={"/icons/pfp.svg"} alt={"default image"} className={styles.pfpImg} />
        </section>
        <section className={styles.skeletonTtxtWraper}>
          <div className={styles.skeletopnWrapper}></div>
          <div className={styles.skeletopnWrapper}></div>
        </section>
      </div>
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
    </div>
  );


  if (data && data.length == 0) {
    return (
      <>
        <p style={{ textAlign: "center" }}>No post Found</p>
      </>
    )
  }
  return (
    <div className={styles.mainSearchWrapper}>
      {data && data.map((item, index) => {
        // Render Profile if it's a profile-like object
        if (item.name && item.about) {
          return (
            <Profile key={`profile-${item.id}-${index}`} profileName={item.name} />
          );
        }

        // Otherwise, assume it's a blog post
        return (
          <BlogPost
            key={`blog-${item.id}-${index}`}
            img={item.image_url}
            title={`${item.title}`}
            link={`/user/blogs/${item.id}`}
            about={`${item.content}`}
            date={`${item.uploaded_by}`}
          />
        );
      })}
      <div className="lastDiv"></div>
    </div>
  );
}

export default Page