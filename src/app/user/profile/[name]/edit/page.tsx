"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../../../store/zestStore/Store";
import Btn from "@/app/utils/Btn/Btn";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePicUpdate, usePicUpload, useUpdate } from "@/hooks/useApi/hooks";

const EditPfp = () => {
  const router = useRouter();
  const store = useUserStore();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    img: "",
    id: ""
  });

  useEffect(() => {
    if (store?.name) {
      setFormData({
        name: store.name,
        about: store.about,
        img: store.profile,
        id: store.id
      });
      setLoading(false);
    }
  }, [store]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "name" ? value.replace(/ /g, "_").toLowerCase() : value
    }));
  };

  const handleSubmit = async () => {
    let imageNewURL = formData.img;

    const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
    //console.log(file);

    const imgName = `${Date.now()}-${file?.name}`;

    if (file && store.profile === "/icons/pfp.svg") {
      imageNewURL = `${await usePicUpload({ file, path: `/profile/${imgName}` })}`;
      //console.log("no prev img:", imageNewURL);

    };
    if (file && store.profile.includes('https://azjgnoxfyygbnquzecyw.supabase.co/storage/v1/object/public/cplexx/profile/')) {
      const oldImgPath = `profile/${store.profile.split("").splice(81).join("")}`;
      //console.log(oldImgPath);
      imageNewURL = `${await usePicUpdate({ file, path: `/profile/${imgName}`, imgToDelete: oldImgPath })}`;
      //console.log("new image path: ", imageNewURL);

    }
    const res = await useUpdate({
      about: formData.about,
      img: imageNewURL,
      name: formData.name,
      id: formData.id
    }, "/api/user");
    //console.log("final updates: ", res);

    if (res.status === 200) {
      Cookies.set("name", res.data[0].name);
      Cookies.set("about", res.data[0].about);
      Cookies.set("img", res.data[0].img);

      setTimeout(() => {
        router.push(`/user/profile/${formData.name}`);
        toast.success(res.message);
        // window.location.reload();
      }, 1200);
    }
  };

  if (loading) {
    return (
      <div className={styles.editmain}>
        <div className={styles.editArea}>
          <div className={styles.imageArea}>
            <img src={"/icons/pfp.svg"} alt={"loading..."} className={styles.editImage} />
          </div>
          <div className={styles.skeletonInputArea}>
            <div className={styles.skeletonInputFields}></div>
            <div className={styles.skeletonInputFields}></div>
          </div>
        </div>
      </div>
    );
  }

  if (store && store.name !== name) {
    return (
      <h1>
        Authentication denied! <br /> <Link href="/user/home">Go back</Link>
      </h1>
    );
  }

  return (
    <div className={styles.editmain}>
      <div className={styles.editArea}>
        <div className={styles.imageArea}>
          <img src={formData?.img} alt={store.name} className={styles.editImage} />
          <div className={styles.editAdd}><p>+</p></div>
          <input type="file" className={styles.editAdd} onChange={handleChange} />
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputFields}>
            <input
              type="text"
              name="name"
              placeholder="edit name"
              value={formData.name}
              className={styles.nameInp}
              onChange={handleChange}
            />
            <h3>About:</h3>
            <textarea
              name="about"
              placeholder="Write about yourself..."
              value={formData.about}
              className={styles.aboutInp}
              onChange={handleChange}
            />
          </div>
          <Btn text={"submit"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default EditPfp;
