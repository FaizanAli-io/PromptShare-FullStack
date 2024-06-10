"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ promtp: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
