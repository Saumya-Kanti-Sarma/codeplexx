"use client";
import React, { useState } from "react";
import { useUserStore } from "../../../store/zestStore/Store";
import Btn from "../../app/utils/Btn/Btn";
import styles from "./edit.module.css";
import { supabase } from "@/app/libs/suprabaseClient";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
interface editProps {
  display?: boolean,
  closeBtn?: () => void
}
const EditPfp: React.FC<editProps> = ({ display = true, closeBtn }) => {
  const { name, profile, about, id } = useUserStore();
  const [newImg, setNewImg] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: name,
    about: about,
    img: profile,
    id: id
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      setFormData(prev => ({
        ...prev,
        [name]: files && files[0] ? files[0] : null
      }));
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async () => {
    setNewImg(formData.img);
    // step1: upload the image to supabase(cplexx/profile)
    const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
    const imgName = `${Date.now()}-${name}`;
    console.log(imgName);

    if (file && profile == "/icons/pfp.svg") {
      const supabaseStorage = await supabase.storage
        .from("cplexx")
        .upload(`profile/${imgName}`, file)
      if (supabaseStorage.error) {
        toast.error(supabaseStorage.error.message);
      };
      const path = supabase.storage.from("cplexx").getPublicUrl(`profile/${imgName}`);
      console.log(path);

      setNewImg(path.data.publicUrl);
    };
    // delete the existing image
    if (file && profile.includes('https://azjgnoxfyygbnquzecyw.supabase.co/storage/v1/object/public/cplexx/profile/')) {
      const supabaseStorage = await supabase.storage
        .from("cplexx")
        .update(`profile/${profile.split("").splice(81).join("")}`, file)
      if (supabaseStorage.error) {
        toast.error(supabaseStorage.error.message);
      } else {
        const path = supabase.storage.from("cplexx").getPublicUrl(`profile/${imgName}`);
        console.log(path.data.publicUrl);
        setNewImg(path.data.publicUrl);
      };
    }
    //  upload the formData to supabase table named users
    const res = await axios.put('/api/user', {
      about: formData.about,
      img: newImg,
      name: formData.name,
      id: formData.id
    });
    console.log({
      message: "dome",
      res
    });
    if (res.status == 200) {
      toast.success(res.data.message);
      Cookies.set("name", formData.name)
      Cookies.set("about", formData.about)
      Cookies.set("profile", newImg)
      router.push(`/user/profile/${formData.name}`)
      // window.location.reload();
    }

  };
  return (
    <>
      <div className={styles.editmain} style={{ display: display == true ? "" : "none" }}>

        <div className={styles.closeBar}>
          <button className={styles.closeImgBtn} onClick={closeBtn}>
            <img src="/icons/close.svg" alt="close" className={styles.closeImg} />
          </button>
        </div>

        <div className={styles.editArea}>

          <div className={styles.imageArea}>
            <img src={formData?.img || undefined} alt={name} className={styles.editImage} />
            <div className={styles.editAdd}>
              <p>+</p>
            </div>
            <input type="file" className={styles.editAdd} onChange={handleChange} />
          </div>

          <div className={styles.inputArea}>

            <div className={styles.inputFields}>
              <input type="text" name="name" placeholder="edit name" value={formData.name} className={styles.nameInp} onChange={handleChange} />
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