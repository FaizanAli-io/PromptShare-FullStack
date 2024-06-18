"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          href={`profile/${post.creator._id}`}
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </Link>

        <div onClick={handleCopy} className="copy_btn">
          <Image
            src={
              copied === post.prompt
                ? "../assets/icons/tick.svg"
                : "../assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy button"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            onClick={handleEdit}
            className="font-inter text-sm green_gradient cursor-pointer"
          >
            Edit
          </p>
          <p
            onClick={handleDelete}
            className="font-inter text-sm orange_gradient cursor-pointer"
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
