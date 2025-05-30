// src/hooks/user/user.ts
import axios from "axios"
import { supabase } from "@/app/libs/suprabaseClient";


export const useCreate = async (data: {
  // account creating and login
  name?: string,
  email?: string,
  password?: string,
  about?: string,

  // blogs creating
  user_id?: string,
  title?: string,
  image_url?: string,
  tags?: [string],
  uploaded_by?: string,

}, url: string) => {
  try {
    const response = await axios.post(url, data);
    if (response.status == 200) return response.data;
    return { message: "Unexpected response from server." };
    // A demo response:{ 
    //     "message": "this will be the message",
    //     "data": [
    //         {}
    //     ]
    // }

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data;
    return { message: "An unknown error occurred." };
  };
  //   A demo response: {
  //     "message": "",
  //     "error": {}
  // }
};



export const useUpdate = async (data: {
  // account creating and login
  name?: string,
  email?: string,
  password?: string,
  about?: string,
  img?: string,
  id?: string,

  // blogs creating
  user_id?: string,
  content?: string,
  title?: string,
  image_url?: string,
  tags?: string[],
  uploaded_by?: string,

}, url: string) => {
  try {
    const response = await axios.put(url, data);
    if (response.status == 200) return response.data;
    return { message: "Unexpected response from server." };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data;
    return { message: "An unknown error occurred." };
  };
};

export const useDelete = async (data: {
  // account creating and login
  name?: string,
  email?: string,
  password?: string,
  about?: string,

  // blogs creating
  user_id?: string,
  title?: string,
  image_url?: string,
  tags?: [string],
  uploaded_by?: string,

}, url: string) => {
  try {
    const response = await axios.put(url, data);
    if (response.status == 200) return response.data;
    return { message: "Unexpected response from server." };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data;
    return { message: "An unknown error occurred." };
  };
};

export const usePicUpload = async (data: { file: File, path: string }) => {
  //path= /profile/img-name

  const uploadImg = await supabase.storage
    .from("cplexx")
    .upload(data.path, data.file);
  if (uploadImg.error) return uploadImg.error;

  // get url:
  const { data: publicURLData } = supabase.storage
    .from("cplexx")
    .getPublicUrl(data.path);
  return publicURLData.publicUrl || null;
};

export const usePicUpdate = async (data: { file: File, path: string, imgToDelete: string }) => {
  //file: from input filed
  // path: path where img is gonna save
  // img to delete: /profile/name-of-img or /blogs/name-og-img

  // delete the image:
  const deleteImg = await supabase.storage
    .from("cplexx")
    .remove([data.imgToDelete]);
  if (deleteImg.error) return deleteImg.error;

  // upload the new img:
  const uploadImg = await supabase.storage
    .from("cplexx")
    .upload(data.path, data.file);
  if (uploadImg.error) return uploadImg.error;

  // get url:
  const { data: publicURLData } = supabase.storage
    .from("cplexx")
    .getPublicUrl(data.path);
  return publicURLData.publicUrl || null;
};
