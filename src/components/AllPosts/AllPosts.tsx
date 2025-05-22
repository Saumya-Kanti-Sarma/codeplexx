"use client"
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { useUserStore } from '../../../store/zestStore/Store';
import axios from 'axios';
import BlogPost from '../BlogPost/BlogPost';

const AllPosts = () => {
  const { id } = useUserStore();
  type BlogData = {
    image_url: string;
    category: [];
    // Add other properties as needed, e.g. title, author, date, link
    title?: string;
    author?: string;
    date?: string;
    link?: string;
    created_at?: string;
    content?: string;
  };
  const [data, setData] = useState<BlogData[]>([]);

  useEffect(() => {
    async function GetBlogs(from: number, to: number) {
      const reqData = await axios.get(`/api/blogs?id=${id}&from=${from}&to=${to}`);
      const response = await reqData.data.data;
      setData(response)
    };
    GetBlogs(0, 10);// i asked only 2 response still got entite db's data
    console.log(id);
  }, [id]);
  return (
    <>
      {data && data.length > 0 ?
        data.map((item, index) => (
          <>
            <BlogPost
              img={`${item?.image_url || "/def/def-img.jpeg"}`}
              category={item.category}
              title={`${item.title}`}
              date={`${item.created_at}`}
              link={`/users/blogs/${item.title}`}
              about={`${item.content}`}
            />
          </>
        ))

        : <>loading</>}
    </>
  )
}

export default AllPosts
