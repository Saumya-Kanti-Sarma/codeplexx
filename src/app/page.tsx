"use client";
import { useState } from "react";
import Input from "@/components/Input/Input";
import Btn from "@/components/Btn/Btn";
import styles from "./page.module.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Replace spaces with underscores for username
    const newValue = id === "userName" ? value.replace(/\s+/g, "_") : value;

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating account with:", formData);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { userName, userPassword } = formData;
    console.log("Logging in with:", { userName, userPassword });
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
          onSubmit={isLogin ? handleLogin : handleCreateAccount}
        >
          <Input
            h3="Your Name"
            inpPlaceholder="Enter Your Name Here.."
            inpId="userName"
            inpType="text"
            inpValue={formData.userName}
            inpOnChange={handleInputChange}
          />

          {!isLogin && (
            <Input
              h3="Your Email"
              inpPlaceholder="Enter Your Email Here.."
              inpId="userEmail"
              inpType="email"
              inpValue={formData.userEmail}
              inpOnChange={handleInputChange}
            />
          )}

          <Input
            h3="Your Password"
            inpPlaceholder="Enter Your Password Here.."
            inpId="userPassword"
            inpType="password"
            inpValue={formData.userPassword}
            inpOnChange={handleInputChange}
          />

          <div className={styles.btnDiv}>
            <Btn
              text={isLogin ? "Login" : "Create Account"}
              width="100%"
              bgColor="--primary-green"
              onClick={(e) => {
                e.preventDefault();
                isLogin ? handleLogin(e) : handleCreateAccount(e);
              }}
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
