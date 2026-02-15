export interface UserTypes {
  id: string;
  name: string;
  email: string;
  about: string;
  img: string;
  created_at: string;
}

export interface BlogsTypes {
  user_id: string,
  title: string,
  image_url: string,
  tags: string[],
  uploaded_by: string,
}