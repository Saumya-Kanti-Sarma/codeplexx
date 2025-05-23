"use client"
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../../store/zestStore/Store';
import axios from 'axios';
import BlogPost from '../BlogPost/BlogPost';
import Loader from '../Loaders/Loader';
const AllPosts = () => {
  const { id } = useUserStore();
  type BlogData = {
    image_url: string;
    category?: string[],
    // Add other properties as needed, e.g. title, author, date, link
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
    async function GetBlogs(from: number, to: number) {
      setLoading(true);
      const reqData = await axios.get(`/api/blogs?id=${id}&from=${from}&to=${to}`);
      console.log(reqData);
      setData(reqData.data.data);
      setLoading(false);
    }
    GetBlogs(0, 10);
  }, [id]);

  if (loading) return (
    <div style={{
      width: "200px",
      height: "200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Loader />
    </div>
  );
  <>
    No posts found

  </>
  return (
    <>
      {data && data.map((item, index) => (
        <BlogPost
          key={index}
          img={item?.image_url || "/def/def-img.jpeg"}
          category={item.category}
          title={`${item.title}`}
          date={`${item.created_at}`}
          link={`/user/blogs/${item.id}`}
          about={`${item.content}`}
        />
      ))}
      <br />
      <hr />
    </>
  );
};
export default AllPosts
