import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, ScrollView, Pressable, Alert } from 'react-native';
import './global.css';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Loader from '@/components/UI/Loader/Loader.component';

export default function index() {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [primaryBtn, setPrimaryBtn] = useState("Create Account");
  const [secondaryBtn, setSecondaryBtn] = useState("Login Account");
  const [emailBtn, setEmailBtn] = useState(true); // handles display of email filed
  const [btnClicked, setBtnClicked] = useState(true);// this adjust primary btn's opacity and toggles loader

  const handleFrom = () => {
    const name = data.name.trim().replace(/\s+/g, "_").toLowerCase();
    const email = data.email.trim();
    const password = data.password;
    return { name, email, password };

  }
  const handlePrimaryBtn = async () => {
    setBtnClicked(false); // this adjust primary btn's opacity and toggles loader
    // handle Sign-up
    if (primaryBtn == "Create Account") {
      setEmailBtn(true);
      const payload = handleFrom();
      if (!payload.name || !payload.email || !payload.password) {
        Alert.alert("Codeplexx", "All fields are mendatory to create an account");
        setBtnClicked(true);
        return;
      }

      setPrimaryBtn("Loading...");

      try {
        const res = await fetch("https://codeplexx.vercel.app/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const response = await res.json();

        if (!res.ok) throw new Error(response.message || "Something went wrong");

        const userName = `${response.data.name}`;
        const userEmail = `${response.data.email}`;
        const userImg = `${response.data.img}`;
        await SecureStore.setItemAsync("userName", userName);
        await SecureStore.setItemAsync("userEmail", userEmail);
        await SecureStore.setItemAsync("userImg", userImg);

        Alert.alert("Account Created!", `welcome ${data.name}`);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setPrimaryBtn("Create Account");
        setEmailBtn(true);
      }
    }
    // handle Login
    else {
      setEmailBtn(false);
      const { name, password } = handleFrom();
      if (!name || !password) {
        Alert.alert("Codeplexx", "Name and password are required to login.");
        setEmailBtn(true);
        setBtnClicked(true)
        return;
      }

      setPrimaryBtn("Loading...");

      try {
        const res = await fetch("https://codeplexx.vercel.app/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        });

        const response = await res.json();

        if (!res.ok) throw new Error(response.data.message || "Login failed");

        const userName = `${response.data.name}`;
        const userEmail = `${response.data.email}`;
        const userImg = `${response.data.img}`;
        await SecureStore.setItemAsync("userName", userName);
        await SecureStore.setItemAsync("userEmail", userEmail);
        await SecureStore.setItemAsync("userImg", userImg);

        Alert.alert("Login Successful!", `Welcome back ${data.name}`);
      } catch (err: any) {
        Alert.alert("Error", err.message);
      } finally {
        setSecondaryBtn("Login Account");
        setEmailBtn(true);
      }
    }
    setBtnClicked(true);
  };

  const handleSecondaryBtn = async () => {
    if (primaryBtn == "Create Account") {
      setPrimaryBtn("Login Account");
      setSecondaryBtn("Create Account")
    } else {
      setPrimaryBtn("Create Account");
      setSecondaryBtn("Login Account")
    }
  };
  return (
    <SafeAreaView style={{ paddingTop: insets.top }} className='flex flex-col h-[100vh]'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='h-[30%] flex justify-center items-center bg-[#0B8835]'>
          <Text className='text-white text-6xl font-extrabold'>Code Plexx</Text>
          <Text className='text-white text-1xl font-thin'>Blogs | Projects | Tutorials</Text>
        </View>

        <View className='flex h-[70%] justify-start p-2 gap-2 items-center mb-2'>
          <View className='w-[90%]'>
            <Text className='text-2xl font-semibold'>Your Name</Text>
            <TextInput
              autoComplete='name'
              keyboardType='default'
              placeholder='Enter Your Name'
              className='bg-[#e2e1e1]'
              value={data.name}
              onChangeText={(val) => setData({ ...data, name: val })}
            />
          </View>
          <View className='w-[90%]'
            style={{ display: secondaryBtn == "Login Account" ? 'flex' : 'none' }}>
            <Text className='text-2xl font-semibold'>Your Email</Text>
            <TextInput
              autoComplete='email'
              keyboardType='email-address'
              placeholder='Enter Your Email'
              className='bg-[#e2e1e1]'
              value={data.email}
              onChangeText={(val) => setData({ ...data, email: val })}
            />
          </View>
          <View className='w-[90%] mb-6'>
            <Text className='text-2xl font-semibold'>Set Password</Text>
            <TextInput
              autoComplete='password'
              keyboardType='default'
              secureTextEntry={true}
              placeholder='Enter Your Password'
              className='bg-[#e2e1e1]'
              value={data.password}
              onChangeText={(val) => setData({ ...data, password: val })}
            />
          </View>
          {/* Primary Button */}
          <Pressable
            className="bg-[#0B8835] py-3 px-6 rounded-lg w-[90%] items-center mb-2 flex flex-row justify-center gap-2"
            onPress={handlePrimaryBtn}
            style={{ opacity: btnClicked ? 1 : 0.6 }}
          >
            <Loader color="#fff" display={btnClicked ? "none" : 'flex'} />
            <Text className="text-white text-xl font-bold ">{primaryBtn}</Text>
          </Pressable>
          {/* secondary Button */}
          <Pressable
            className="bg-[#0b883581] py-3 px-6 rounded-lg w-[90%] items-center mb-2 flex flex-row justify-center gap-2"
            onPress={handleSecondaryBtn}>
            <Text className="text-white text-xl font-bold">{secondaryBtn}</Text>
          </Pressable>

          <Link href={"/"} className='text-[#0B8835] text-xl font-medium opacity-[0.7]'><Text>Skip for now</Text></Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
