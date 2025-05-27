"use client";
import styles from "./page.module.css";
import { useUserStore } from "../../../store/zestStore/Store";
import Btn from "@/app/utils/Btn/Btn";
import React, { useEffect, useState } from "react";
import Input from "@/app/utils/Input/Input";
import { supabase } from "@/app/libs/suprabaseClient";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { name, id } = useUserStore();
  const [disableBtn, setDisableBtn] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const [btnText, setBtnText] = useState("Upload");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
  });
  // make the Post Btn disbale untill form is valid
  useEffect(() => {
    setDisableBtn(!(formData.title.length > 0 && formData.description.length > 0));
  }, [formData]);


  const handleformChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData(prev => ({
        ...prev,
        [name]: files && files[0] ? files[0] : null
      }));
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
    setBtnText("Uploading...")
    const fileName = Date.now();
    const loading = toast.loading("Uploading...")
    let updatedForm = {
      user_id: id,
      title: formData.title,
      content: formData.description,
      tags: formData.tags.split(","),
      image_url: "",
    };
    //upload file
    if (formData.image) {
      const uploadResponse = await supabase.storage
        .from('cplexx')
        .upload(`blogs/${fileName}-${name}`, formData.image)
      if (uploadResponse.error) {
        toast.dismiss(loading);
        toast.error("Cannot uplaod the image, please retry");
        console.log(uploadResponse.error);
        setDisableBtn(false);
        setBtnLoader(false);
        setBtnText("Upload")
      };
      const path = supabase.storage.from('cplexx').getPublicUrl(`blogs/${fileName}-${name}`);
      updatedForm = {
        user_id: id,
        title: formData.title,
        content: formData.description,
        tags: formData.tags.split(","),
        image_url: path.data.publicUrl
      };
    };
    const insertResponse = await supabase
      .from("blogs")
      .insert(updatedForm);

    if (insertResponse.error) {
      toast.dismiss(loading);
      await supabase.storage.from('cplexx').remove([`blogs/${fileName}-${name}`]);
      toast.error("Error saving blog. Please try again.");
      console.log(insertResponse.error);
      setDisableBtn(false);
      setBtnLoader(false);
      setBtnText("Upload");
    } else {
      toast.dismiss(loading);
      toast.success("Blog uploaded successfully!");
      setDisableBtn(false);
      setBtnLoader(false);
      setBtnText("Upload");
    }
    setFormData({
      title: "",
      image: "",
      description: "",
      tags: "",
    })
  };
  return (
    <>
      <Input
        h3="Title" inpName="title" inpPlaceholder="Enter title" inpValue={formData.title} inpOnChange={handleformChange}
      />
      <Input
        h3="select image" inpType="file" inpName="image" inpOnChange={handleformChange}
      />
      <div className={styles.description}>
        <h3>Enter Description</h3>
        <textarea name="description" id="description" placeholder="Enter description here" value={formData.description} onChange={handleformChange} />
      </div>
      <Input
        h3="Enter tags" inpName="tags" inpPlaceholder="Eg: React,Node.js, frotned, python" inpValue={formData.tags} inpOnChange={handleformChange}
      />
      <Btn text={btnText} onClick={handleFormSubmit} isDisable={disableBtn} displayLoader={btnLoader} />

    </>
  )
}

export default CreatePost
