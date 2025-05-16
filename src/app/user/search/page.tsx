"use client"
// route: /user/search?querry=some-search

import { useSearchParams } from "next/navigation";

export default function page() {
  const search = useSearchParams();
  const querry = search.get("querry")
  return (
    <>
      this is search page and querry is: {querry}
    </>
  );
}
