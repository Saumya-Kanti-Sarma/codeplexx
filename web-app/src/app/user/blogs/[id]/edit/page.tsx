"use client";
import styles from "./page.module.css";
import { useUserStore } from "../../../../../../store/zestStore/Store";
import Btn from "../../../../../../UI/Btn/Btn";
import React, { useEffect, useState } from "react";
import Input from "../../../../../../UI/Input/Input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { dataDelete } from "@/hooks/useApi/hooks";


const CreatePost = () => {
  const store = useUserStore();
  const { id } = useParams();
  const [deleteTxt, setDeleteTxt] = useState("Delete")
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    image: "",
    description: "",
    tags: "",
    uploaded_by: "",
  });
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/api/blogs/one?id=${id}`);
      if (response.status == 200) {
        const blogData = response.data.data[0];
        // console.log(blogData);
        setFormData({
          id: blogData.id,
          title: blogData.title,
          image: blogData.image_url,
          description: blogData.content,
          uploaded_by: blogData.uploaded_by,
          tags: blogData.tags.join(","),
        });
      };
    } getData();
  }, []);
  const handleOnchange = () => {
    toast("feature comming soon!")
  }
  const handledelete = async () => {
    setDeleteTxt("deleting...");
    const req = await dataDelete(`/api/blogs?id=${id}&user_id=${store.id}`);
    if (req.status == 200) {
      toast.success(req.message);
    } else {
      toast.error("cannot delete post");
    }
    setDeleteTxt("Delete");

  }
  if (formData.uploaded_by.length > 0 && formData.uploaded_by != store.name) {
    return (
      <>
        Authentication denied!
        <Link href={"/user/home"}>Go back?</Link>
      </>
    )
  };

  if (formData.title.length == 0) {
    return (
      <>
        Loading...
      </>
    )
  }
  return (
    <>
      <div className={styles.imgWrapper}>
        <img src={formData.image || "/def/def-img.jpeg"} alt="" className={styles.img} />
        <img src="/icons/upload.svg" alt="" className={styles.imgUpload} />
        <input type="file" name="file" className={styles.imgInp} />
      </div>
      <div className={styles.main}>
        <Input
          label="Title" inpName="title" inpPlaceholder="Enter title" inpValue={formData.title} inpOnChange={handleOnchange} />
        <div className={styles.description}>
          <h3>Enter Description</h3>
          <textarea name="description" id="description" placeholder="Enter description here" value={formData.description} onChange={handleOnchange} />
        </div>
        <Input
          label="Enter tags" inpName="tags" inpPlaceholder="Eg: React,Node.js, frotned, python" inpValue={formData.tags.replaceAll(" ", ",")} inpOnChange={handleOnchange} />
        <br />
        <div className={styles.btnArea}>
          <Btn text={"Delete"} onClick={handledelete} bgColor="--red" displayLoader={deleteTxt == "deleting..." ? true : false} isDisable={deleteTxt == "deleting..." ? true : false} />
        </div>
      </div>

    </>
  )
}

export default CreatePost
