"use client";
import styles from "./page.module.css";
import { useUserStore } from "../../../../../../store/zestStore/Store";
import Btn from "@/app/utils/Btn/Btn";
import React, { useEffect, useState } from "react";
import Input from "@/app/utils/Input/Input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { useToString } from "@/hooks/useToString/hook";
import Link from "next/link";
import { usePicUpdate, usePicUpload, useUpdate } from "@/hooks/useApi/hooks";


const CreatePost = () => {
  const store = useUserStore();
  const { id } = useParams();
  const [newImgUrl, setNewImgUrl] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [btnText, setBtnText] = useState("Update");
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
        console.log(blogData);
        setNewImgUrl(blogData.image_url);
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

  const handleformChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const base64 = async () => {
          const url = await useToString(files[0]);
          setFormData(prev => ({
            ...prev,
            image: `${url}`
          }));
        }; base64();
      };
    } else if (name === "tags") {
      const tagsValue = value.replace(/\s+/g, '').replace(/,+/g, ',');
      setFormData(prev => ({
        ...prev,
        [name]: tagsValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleFormSubmit = async () => {
    setDisableBtn(true);
    setBtnLoader(true);
    setBtnText("Uploading...");
    const loading = toast.loading("Uploading...")
    const file = (document.querySelector('input[type ="file"]') as HTMLInputElement)?.files?.[0];
    const imgName = `${Date.now()}-${file?.name}`
    if (file && newImgUrl == "") {
      const url = await usePicUpload({ file, path: `/blogs/${imgName}` })
      setNewImgUrl(`${url}`);
    };
    if (file && newImgUrl.includes("https://azjgnoxfyygbnquzecyw.supabase.co/storage/v1/object/public/cplexx/blogs/")) {
      const url = await usePicUpdate({
        file,
        path: `/blogs/${imgName}`,
        imgToDelete: `/blogs/${newImgUrl.split("").splice(81).join("")}`
      });
      setNewImgUrl(`${url}`);
    };
    const res = await useUpdate({
      user_id: store.id,
      title: formData.title,
      content: formData.description,
      tags: formData.tags.split(","),
      image_url: newImgUrl,
      uploaded_by: store.name
    }, `/api/blogs?user_id=${store.id}&id=${formData.id}`);
    console.log(res);

    if (res.status == 200) {

      toast.dismiss(loading);
      toast.success("Blog uploaded successfully!");
      setDisableBtn(false);
      setBtnLoader(false);
      setBtnText("Upload");
    } else {
      toast.dismiss(loading);
      toast.error("Something went wrong!");
    };
  };
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
        <input type="file" name="file" className={styles.imgInp} onChange={handleformChange} />
      </div>
      <div className={styles.main}>
        <Input
          h3="Title" inpName="title" inpPlaceholder="Enter title" inpValue={formData.title} inpOnChange={handleformChange}
        />
        <div className={styles.description}>
          <h3>Enter Description</h3>
          <textarea name="description" id="description" placeholder="Enter description here" value={formData.description} onChange={handleformChange} />
        </div>
        <Input
          h3="Enter tags" inpName="tags" inpPlaceholder="Eg: React,Node.js, frotned, python" inpValue={formData.tags.replaceAll(" ", ",")} inpOnChange={handleformChange}
        />
        <br />
        <div className={styles.btnArea}>
          <Btn text={"Delete"} onClick={handleFormSubmit} bgColor="--red" />
          <Btn text={btnText} onClick={handleFormSubmit} isDisable={disableBtn} displayLoader={btnLoader} />
        </div>
      </div>

    </>
  )
}

export default CreatePost
