"use client";

import { Photo } from "@/types/Photo";
import styles from "./PostList.module.css";
import PostItem from "./PostItem";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getData } from "@/api/photo";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

const useInfinitePortfolioQuery = () => {
  return useInfiniteQuery<Photo[], Error, InfiniteData<Photo[]>>({
    queryKey: ["list"],
    queryFn: ({ pageParam }) => getData(pageParam as number),
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 30 * 1000,
  });
};

export default function PostList() {
  const targetRef = useRef(null);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePortfolioQuery();

  const handleIntersect = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
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

  useEffect(() => {
    console.log(data);
  });
  return (
    <>
      <ul className={styles.posts}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </Fragment>
        ))}
      </ul>

      {isFetchingNextPage && <p>로딩중!</p>}
      <div className={styles.target} ref={targetRef}></div>
    </>
  );
}
