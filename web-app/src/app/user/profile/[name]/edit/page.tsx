"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../../../store/zestStore/Store";
import Btn from "@/components/UI/Btn/Btn";
import styles from "./page.module.css";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { dataPicUpdate, dataPicUpload, dataUpdate } from "@/hooks/useApi/hooks";
import { fileToString } from "@/hooks/useToString/hook";

const EditPfp = () => {
  const router = useRouter();
  const store = useUserStore();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Save changes");
  const [tempImg, setTempImg] = useState("");
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
    };
    if (tempImg.length > 0) {
      setFormData({
        name: store.name,
        about: store.about,
        img: tempImg,
        id: store.id
      })
    }
  }, [store, tempImg]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "file") {
      const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
      if (file) {
        const base64 = await fileToString(file);
        // console.log(base64);

        setTempImg(base64); // now works correctly
        return;
      }
    };
    setFormData(prev => ({
      ...prev,
      [name]: name === "name" ? value.replace(/ /g, "_").toLowerCase() : value
    }));
  };

  const handleSubmit = async () => {
    setBtnTxt("Saving changes");
    setDisableBtn(true);
    let imageNewURL = store.profile;

    const file = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files?.[0];
    console.log(file?.name);

    const imgName = `${Date.now()}-${file?.name}`;

    if (file && store.profile === "/icons/pfp.svg") {
      imageNewURL = `${await dataPicUpload({ file, path: `/profile/${imgName}` })}`;
      //console.log("no prev img:", imageNewURL);

    };
    if (file && store.profile.includes('https://azjgnoxfyygbnquzecyw.supabase.co/storage/v1/object/public/cplexx/profile/')) {
      const oldImgPath = `profile/${store.profile.split("").splice(81).join("")}`;
      //console.log(oldImgPath);
      imageNewURL = `${await dataPicUpdate({ file, path: `/profile/${imgName}`, imgToDelete: oldImgPath })}`;
      console.log("new image path: ", imageNewURL);

    }
    const res = await dataUpdate({
      about: formData.about,
      img: imageNewURL,
      name: formData.name,
      id: formData.id
    }, "/api/user");
    console.log("final updates: ", res);

    if (res.status === 200) {
      Cookies.set("name", res.data[0].name);
      Cookies.set("about", res.data[0].about);
      Cookies.set("img", res.data[0].img);

      setTimeout(() => {
        router.push(`/user/profile/${formData.name}`);
        toast.success(res.message);
        // window.location.reload();
      }, 1200);
    };
    setBtnTxt("Save changes");
    setDisableBtn(false)
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
          <input type="file" name="file" className={styles.editAdd} onChange={handleChange} />
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
          <Btn text={btnTxt} onClick={handleSubmit} displayLoader={disableBtn} isDisable={disableBtn} />
        </div>
      </div>
    </div>
  );
};

export default EditPfp;
