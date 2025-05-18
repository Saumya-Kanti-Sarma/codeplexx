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

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter()

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const userCredentials = Cookies.get("userCredentials");
    if (userCredentials) {
      router.push("/user/home");
    }
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Replace spaces with underscores for name
    const newValue = id === "name" ? value.replace(/\s+/g, "_") : value;

    setFormData((prev) => ({
      ...prev,
      [id]: newValue.trim(),
    }));
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const loading = toast.loading("Creating account...");

    // Step 1: Check if email already exists in 'users' table
    const { data: existingUsers, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .or(`email.eq.${formData.email},name.eq.${formData.name}`);


    if (fetchError) {
      console.error(fetchError);
      toast.error("Something went wrong");
      toast.dismiss(loading);
      return;
    }

    if (existingUsers && existingUsers.length > 0) {
      toast.error("Email already used, please try another");
      toast.dismiss(loading);
      return;
    }

    // Step 2: Sign up user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password.trim(),
    });

    if (error) {
      console.error(error);
      toast.error("Cannot Sign-up");
      toast.dismiss(loading);
      return;
    }

    // Step 3: Insert additional user profile info
    const { error: userError } = await supabase.from("users").insert({
      id: data.user?.id,
      name: formData.name,
      password: formData.password,
      email: formData.email.trim(),
    });

    if (userError?.code === "23505") {
      toast.error("Username already exists, please try another");
      toast.dismiss(loading);
      return;
    };
    Cookies.set("userCredentials", `${formData.email}${data.user?.id}${Date.now()}`)

    // Update Zustand store
    setUser({
      id: data.user?.id || "",
      name: formData.name,
      email: formData.email,
      profile: "" // You can add profile picture later
    });

    toast.success(`Welcome ${formData.name}!`);
    toast.dismiss(loading);
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loading = toast.loading("Loging..");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password.trim()
    });
    if (error) {
      toast.error(`Invalid Login Credentials`);
      //console.log({success: false, error,});
      toast.dismiss(loading);
      return
    };

    // Update Zustand store
    const { data: userDataArray, error: userError } = await supabase.from("users").select("name, email,profile").eq("email", formData.email.trim());

    if (userError || !userDataArray || userDataArray.length === 0) {
      toast.error("Failed to get user credentials");
      toast.dismiss(loading);
      return;
    }
    const userData = userDataArray[0];
    //console.log(userData);

    setUser({
      id: data.user?.id,
      name: userData?.name,
      email: userData?.email,
      profile: userData?.profile  // You can add profile picture later
    });

    //console.log(data);
    toast.dismiss(loading);
    toast.success("Welcome Back " + formData.name);
    Cookies.set("userCredentials", `${formData.email}${data.user?.id}${Date.now()}`);
    router.push("/user/home")
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
          {!isLogin && (
            <Input
              h3="Your Name"
              inpPlaceholder="Enter Your Name Here.."
              inpId="name"
              inpType="text"
              inpValue={formData.name}
              inpOnChange={handleInputChange}
              required={true}
            />
          )}

          <Input
            h3="Your Email"
            inpPlaceholder="Enter Your Email Here.."
            inpId="email"
            inpType="email"
            inpValue={formData.email}
            inpOnChange={handleInputChange}
            required={true}
          />

          <Input
            h3="Your Password"
            inpPlaceholder="Enter Your Password Here.."
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
