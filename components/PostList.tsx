"use client";

import { Photo } from "@/types/Photo";
import styles from "./Postlist.module.css";
import PostItem from "./PostItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { getData } from "@/app/page";

type PostListProps = {
  initialPhotoList: Photo[];
};

export default function PostList({ initialPhotoList }: PostListProps) {
  const targetRef = useRef(null);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Photo[]>(initialPhotoList);

  const handleIntersect = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) {
        setIsLoading(true);
        const response = await getData(page);
        setPosts((prev) => [...prev, ...response]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      }
    },
    [page, isLoading]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => observer.disconnect();
  }, [handleIntersect]);
  return (
    <>
      <ul className={styles.posts}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
      {isLoading && <p>로딩중!</p>}
      <div className={styles.target} ref={targetRef}></div>
    </>
  );
}
