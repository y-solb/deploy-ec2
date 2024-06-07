import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/types/Photo";

type PostItemProps = {
  post: Photo;
};

const PostItem = ({ post }: PostItemProps) => {
  const { title, url, thumbnailUrl } = post;
  return (
    <li>
      <Link href={`${url}`}>
        <p>{title}</p>
        <Image src={thumbnailUrl} alt={title} width={150} height={150} />
      </Link>
    </li>
  );
};

export default PostItem;
