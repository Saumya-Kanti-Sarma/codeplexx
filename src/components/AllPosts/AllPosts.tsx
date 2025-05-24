"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogPost from '../BlogPost/BlogPost';
import Loader from '../Loaders/Loader';

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
      //console.log(reqData);
      setData(reqData.data.data);
      setLoading(false);
    }
    GetBlogs();
  }, [url]);

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
