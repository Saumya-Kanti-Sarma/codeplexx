/**
 * """Authentication Page Component"""
 * 
 * This component handles user authentication including both login and signup functionality. at `http://localhost:3000`
 * It provides a toggleable form that switches between login and account creation modes.
 * 
 * OPERATION FLOW
 * 1. pages loads - no API is being called
 * 2. user desides to Signup or login by clicking the Create Account or Login Button
 
------------------(SignUp)---------------------------
 * 3. User enters details
 * 4. Data is being sent to server
 * 5. if server checks if account already exists; if exsist then throw error message
 * 6. data is saved in server
 
------------------(Login)---------------------------
 * 3. User enters details
 * 4. Data is being sent to server
 * 5. if server checks account name and password matches; if not match then throw error message
 * 6. data is saved in server
 * 
 * 
 * 7. Cookies are saved in browser (userLoginCredential, id, name, email, about, img)
 * 8. Update the global store 
 * 9. User is redirected to /user/home
 * 
 */

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

import { UserTypes } from "@/types/types";

/**
 * Interface for the API response structure
 */
interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

export default function Home() {
  // State to toggle between login and signup; 
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Hooks for navigation and state management
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    `
    1. gets id (inpId) and value (inpValue) from input 
    2. if spaces are available in id == name then replace all spaces with _ and make it lower case
    3. update from data
    `
    //  step 1
    const { id, value } = e.target;
    // step 2
    const newValue = id === "name" ? value.replace(/\s+/g, "_").toLowerCase() : value;
    // step 3
    setFormData((prev) => ({
      ...prev,
      [id]: newValue.trim(),
    }));

  };

  /**
   * Sets user cookies, updates global store, and navigates to home page
   * This function is called after successful authentication
   * 
   * @param {UserTypes} response - User data from API
   */
  const setCookies_Store_And_Navigate = (
    response: UserTypes,
    loading: string,
    data: unknown
  ) => {
    // Set authentication cookies
    Cookies.set("userLoginCredential", `${response.created_at}${Date.now()}${response.id}`);
    Cookies.set("id", response.id);
    Cookies.set("name", response.name);
    Cookies.set("email", response.email);
    Cookies.set("about", response.about);
    Cookies.set("img", response.img);

    // Update global user store
    setUser({
      id: response.id,
      name: response.name,
      email: response.email,
      profile: response.img,
      about: response.about,
    });

    // Handle toast notifications
    toast.dismiss(loading);
    setTimeout(() => {
      toast.success((data as ApiResponse).message);
    }, 500);

    // Navigate to user home page
    router.push("/user/home");
  };

  /**
   * Handles account creation form submission
   * Makes API call to create new user account
   */
  const handleCreateAccount = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const loading = toast.loading("Creating account...");

    try {
      const data = await dataCreate(formData, "/api/user") as ApiResponse;

      if (data.status === 200) {
        const response = data.data[0];
        setCookies_Store_And_Navigate(response, loading, data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during account creation");
    } finally {
      toast.dismiss(loading);
    }
  };

  /**
   * Handles login form submission
   * Makes API call to authenticate user
   */
  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const loading = toast.loading("Login...");

    try {
      const data = await dataCreate(formData, "/api/login") as ApiResponse;

      if (data.status === 200) {
        const response = data.data;
        setCookies_Store_And_Navigate(response, loading, data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <main className={styles.main}>
      {/* Branding section */}
      <aside className={styles.aside}>
        <h1>
          Code <br /> Plexx
        </h1>
      </aside>

      {/* Authentication form section */}
      <div className={styles.fomrArea}>
        <form className={styles.form}>
          {/* Name input - always visible but only required for signup */}
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

          {/* Email input - conditionally rendered based on mode */}
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

          {/* Password input - always visible */}
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

          {/* Action buttons */}
          <div className={styles.btnDiv}>
            {/* Primary action button (Login or Create Account) */}
            <Btn
              text={isLogin ? "Login" : "Create Account"}
              width="100%"
              bgColor="--primary-green"
              onClick={isLogin ? handleLogin : handleCreateAccount}
            />

            {/* Toggle mode button */}
            <Btn
              text={isLogin ? "Switch to Sign Up" : "Login"}
              width="100%"
              bgColor="--light-green"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
              }}
            />

            {/* Skip authentication link */}
            <Link href={"/user/home"} className={styles.skip}>
              Skip for now
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}