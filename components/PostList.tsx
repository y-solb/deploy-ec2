"use client";

import { Photo } from "@/types/Photo";
import styles from "./PostList.module.css";
import PostItem from "./PostItem";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getData } from "@/api/photo";
import { InfiniteData, useQuery } from "@tanstack/react-query";

// const useInfinitePortfolioQuery = () => {
//   return useInfiniteQuery<Photo[], Error, InfiniteData<Photo[]>>({
//     queryKey: ["list"],
//     queryFn: ({ pageParam }) => getData(pageParam as number),
//     getNextPageParam: (_, allPages) => {
//       return allPages.length + 1;
//     },
//     initialPageParam: 1,
//     staleTime: 30 * 1000,
//   });
// };
const useInfinitePortfolioQuery = () => {
  return useQuery<Photo[], Error, Photo[]>({
    queryKey: ["list"],
    queryFn: () => getData(1),
  });
};
export default function PostList() {
  // const targetRef = useRef(null);
  const { data } = useInfinitePortfolioQuery();

  // const handleIntersect = useCallback(
  //   async (entries: IntersectionObserverEntry[]) => {
  //     const target = entries[0];
  //     if (target.isIntersecting) {
  //       if (!isFetchingNextPage && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     }
  //   },
  //   [fetchNextPage, hasNextPage, isFetchingNextPage]
  // );

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "20px",
  //     threshold: 0.1,
  //   };
  //   const observer = new IntersectionObserver(handleIntersect, options);
  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }
  //   return () => observer.disconnect();
  // }, [handleIntersect]);

  return (
    <>
      <ul className={styles.posts}>
        {data?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>

      {/* {isFetchingNextPage && <p>로딩중!</p>}
      <div className={styles.target} ref={targetRef}></div> */}
    </>
  );
}
