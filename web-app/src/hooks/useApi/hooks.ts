// src/hooks/user/user.ts
import axios from "axios"
import { supabase } from "@/app/libs/suprabaseClient";


export const dataCreate = async (data: {
  // account creating and login
  name?: string,
  email?: string,
  password?: string,
  about?: string,
}, url: string) => {
  try {
    const response = await axios.post(url, data);
    console.log(response.data);

    if (response.status == 200) return response.data;
    //     `
    // {
    //     "message": "Welcome user_name",
    //     "status": 200,
    //     "data": [
    //         {
    //             "id": "148bc54d-140d-4df4-97e0-4b2f31c193a2",
    //             "img": "/icons/pfp.svg",
    //             "name": "user_name",
    //             "email": "userName@gmail.com",
    //             "password": "521d55b8ec65bbcdaf8127573f9fbf48834dafc7b76382f909ed034fa4c3d88a",
    //             "created_at": "2026-02-15T07:45:50.122051",
    //             "about": null
    //         }
    //     ]
    // }
    // `
    return { message: "Unexpected response from server." };


  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data;
    return { message: "An unknown error occurred." };
  };
};



export const dataUpdate = async (data: {
  // account creating and login
  name?: string,
  email?: string,
  password?: string,
  about?: string,
  img?: string,
  id?: string,

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

export const dataDelete = async (url: string) => {
  try {
    const response = await axios.delete(url);
    if (response.status == 200) return response.data;
    return { message: "Unexpected response from server." };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data;
    return { message: "An unknown error occurred." };
  };
};

export const dataPicUpload = async (data: { file: File, path: string }) => {
  //path= /profile/img-name

  const uploadImg = await supabase.storage
    .from("cplexx")
    .upload(data.path, data.file);
  if (uploadImg.error) return uploadImg.error;

  // get url:
  const { data: publicURLData } = supabase.storage
    .from("cplexx")
    .getPublicUrl(data.path);
  return `${publicURLData.publicUrl}` || null;
};

export const dataPicUpdate = async (data: { file: File, path: string, imgToDelete: string }) => {
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
  return `${publicURLData.publicUrl}` || null;
};
