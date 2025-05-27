"use client";
import React, { useState } from "react";
import { useUserStore } from "../../../../../../store/zestStore/Store";
import Btn from "@/app/utils/Btn/Btn";
import styles from "./page.module.css";
import { supabase } from "@/app/libs/suprabaseClient";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";


const EditPfp = () => {
  const router = useRouter();
  const store = useUserStore();
  const { name } = useParams();
  const [formData, setFormData] = useState({ // def values from store
    name: store.name,
    about: store.about,
    img: store.profile,
    id: store.id
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    let image = formData.img;
    // step1: upload the image to supabase(cplexx/profile)
    const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
    const imgName = `${Date.now()}-${name}`;
    console.log(imgName);

    // if profile is default image then:
    if (file && store.profile === "/icons/pfp.svg") {
      const supabaseStorage = await supabase.storage
        .from("cplexx")
        .upload(`profile/${imgName}`, file)
      if (supabaseStorage.error) {
        toast.error(supabaseStorage.error.message);
      };
      const path = supabase.storage.from("cplexx").getPublicUrl(`profile/${imgName}`);
      console.log("if profile is def image");
      console.log(path);
      image = path.data.publicUrl;
    };
    // if profile is not default image
    if (file && store.profile.includes('https://azjgnoxfyygbnquzecyw.supabase.co/storage/v1/object/public/cplexx/profile/')) {
      const supabaseStorage = await supabase.storage
        .from("cplexx")
        .update(`profile/${store.profile.split("").splice(81).join("")}`, file)
      if (supabaseStorage.error) {
        toast.error(supabaseStorage.error.message);
      };
      const path = supabase.storage.from("cplexx").getPublicUrl(`profile/${imgName}`);
      console.log("if profile is not def image");
      console.log(path.data.publicUrl);
      image = path.data.publicUrl;
    }
    //  upload the formData to supabase table named users
    const res = await axios.put('/api/user', {
      about: formData.about,
      img: image,
      name: formData.name,
      id: formData.id
    });
    console.log(res);
    if (res.status == 200) {
      toast.success(res.data.message);
      Cookies.set("name", formData.name)
      Cookies.set("about", formData.about)
      Cookies.set("img", image)
      router.push(`/user/profile/${formData.name}`)
      window.location.reload();
    }

  };
  if (store && store.name != name) {
    return (
      <>
        <h1>Authentication denied! <br /> <Link href="/user/home">Go back</Link></h1>
      </>
    )
  }
  return (
    <>
      <div className={styles.editmain}>
        <div className={styles.editArea}>

          <div className={styles.imageArea}>
            <img src={formData?.img} alt={store.name} className={styles.editImage} />
            <div className={styles.editAdd}>
              <p>+</p>
            </div>
            <input type="file" className={styles.editAdd} onChange={handleChange} />
          </div>

          <div className={styles.inputArea}>

            <div className={styles.inputFields}>
              <input type="text" name="name" placeholder="edit name" value={formData.name.replace(/ /g, "_")} className={styles.nameInp} onChange={handleChange} />
              <h3>About:</h3>
              <textarea name="about" placeholder="edit name" value={formData.about} className={styles.aboutInp} onChange={handleChange} />
            </div>

            <Btn text={"submit"} onClick={handleSubmit} />
          </div>

        </div>
      </div>
    </>
  )
}

export default EditPfp