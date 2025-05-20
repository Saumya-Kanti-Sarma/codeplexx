"use client";
import { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import styles from "./page.module.css";
import { supabase } from "./libs/suprabaseClient";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/zestStore/Store";
import axios from "axios";
import { error } from "console";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Replace spaces with underscores for name
    const newValue = id === "name" ? value.replace(/\s+/g, "_").toLowerCase() : value;

    setFormData((prev) => ({
      ...prev,
      [id]: newValue.trim(),
    }));
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    let loading = toast.loading("Creating account...");
    const loginData = {
      name: formData.name,
      password: formData.password
    }
    try {
      const data = await axios.post("/api/user", loginData);
      console.log(data.data);

      if (data.data.status == 200) {
        Cookies.set("userLoginCredential", `${data.data.data.created_at}${Date.now()}${data.data.data.id}`)
        setUser({
          id: data.data.data.id,
          name: data.data.data.name,
          email: data.data.data.email,
          profile: data.data.data.img,
          about: data.data.data.about,
        });
        toast.success(data.data.message);
        toast.dismiss(loading);
        toast("redirecting.. please wait");
        router.push("/user/home")
      }
      if (data.data.error.code == "23505") {
        toast.error("Account already exist. please try login")
      }
    } catch (error) {
      toast.error("cannot create account, please try again later");
      console.log(error);
    }
    finally {
      toast.dismiss(loading);
    }

  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let loading = toast.loading("Login...");
    try {
      const data = await axios.post("/api/login", formData);
      const response = await data.data;
      console.log(response);

      if (response.status == 200) {
        Cookies.set("userLoginCredential", `${response.data.created_at}${Date.now()}${response.data.id}`)
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          profile: response.data.img,
          about: response.data.about,
        });
        toast.success(data.data.message);
        toast.dismiss(loading);
        toast("redirecting.. please wait");
        router.push("/user/home")
      };
      if (data.data.status == 500) {
        toast.error(response.data.message);
        toast.dismiss(loading);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        console.log(error);
      } else {
        toast.error("An unexpected error occurred.");
        console.log(error);
      }
    }
    finally {
      toast.dismiss(loading);
    }
  };

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <h1>
          Code <br /> Plexx
        </h1>
      </aside>

      <div className={styles.fomrArea}>
        <form
          className={styles.form}
        >

          <Input
            h3="Your Name"
            inpPlaceholder="Enter Your Name Here.."
            inpId="name"
            inpName="name"
            inpType="text"
            inpValue={formData.name}
            inpOnChange={handleInputChange}
            required={true}
          />

          {!isLogin && (
            <Input
              h3="Your Email"
              inpPlaceholder="Enter Your Email Here.."
              inpId="email"
              inpName="email"
              inpType="email"
              inpValue={formData.email}
              inpOnChange={handleInputChange}
              required={true}
            />
          )}
          <Input
            h3="Your Password"
            inpPlaceholder="Enter Your Password Here.."
            inpName="password"
            inpId="password"
            inpType="password"
            inpValue={formData.password}
            inpOnChange={handleInputChange}
            required={true}
          />

          <div className={styles.btnDiv}>
            <Btn
              text={isLogin ? "Login" : "Create Account"}
              width="100%"
              bgColor="--primary-green"
              onClick={isLogin ? handleLogin : handleCreateAccount}
            />
            <Btn
              text={isLogin ? "Switch to Sign Up" : "Login"}
              width="100%"
              bgColor="--light-green"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
              }}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
