"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { connectToDB } from "@utils/database";

import PromptCardList from "@components/PromptCardList";

const MyProfile = ({ params }) => {
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  const owner = params.id === session?.user.id;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${params.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (params.id) {
      fetchPosts();
    }
  }, [params.id]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Profile Page</span>
      </h1>

      {owner ? (
        <p className="desc text-left">Welcome to your personal profile page</p>
      ) : (
        <></>
      )}

      <PromptCardList data={myPosts} setData={setMyPosts} />
    </section>
  );
};

export default MyProfile;
