"use client"

// /user/profile/:id
import { useParams } from "next/navigation";

export default function page() {
  const searchParams = useParams<{ id: string }>();
  const id = searchParams.id;
  return (
    <>
      this is profile page of id: {id}
    </>
  );
}
// how to properly get the id