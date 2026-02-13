"use client";
import { useState } from "react";
import Input from "../../UI/Input/Input";
import Btn from "../../UI/Btn/Btn";
import styles from "./page.module.css";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/zestStore/Store";
import Link from "next/link";
import { dataCreate } from "@/hooks/useApi/hooks";

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
    // console.log(formData);

  };

  // function to set cookies
  const setCookies_Store_And_Navigate = (response: {
    id: string,
    name: string,
    email: string,
    about: string,
    img: string,
    created_at: string,
  }, loading: string, data: unknown) => {
    Cookies.set("userLoginCredential", `${response.created_at}${Date.now()}${response.id}`)
    Cookies.set("id", response.id);
    Cookies.set("name", response.name);
    Cookies.set("email", response.email);
    Cookies.set("about", response.about);
    Cookies.set("img", response.img);
    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
      profile: response.img,
      about: response.about,
    });
    toast.dismiss(loading);
    setTimeout(() => {
      toast.success((data as { message: string }).message);
    }, 500);
    router.push("/user/home")
  };
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const loading = toast.loading("Creating account...");
    const data = await dataCreate(formData, "/api/user");
    // console.log("data", data);
    if (data.status == 200) {
      const response = data.data[0];
      setCookies_Store_And_Navigate(response, loading, data);
    } else {
      toast.error(data.message)
    };
    toast.dismiss(loading);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loading = toast.loading("Login...");
    const data = await dataCreate(formData, "/api/login");
    // console.log("data", data);
    if (data.status == 200) {
      const response = data.data;
      setCookies_Store_And_Navigate(response, loading, data);
    } else {
      toast.error(data.message)
    };
    toast.dismiss(loading);
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
            label="Your Name"
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
              label="Your Email"
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
            label="Your Password"
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
            <Link href={"/user/home"} className={styles.skip}>Skip for now</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
