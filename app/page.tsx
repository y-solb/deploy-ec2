import { getData } from "@/api/photo";
import styles from "./page.module.css";
import PostList from "@/components/PostList";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["list"],
  //   queryFn: ({ pageParam }) => getData(pageParam as number),
  //   initialPageParam: 1,
  //   staleTime: 30 * 1000,
  // });
  await queryClient.prefetchQuery({
    queryKey: ["list"],
    queryFn: () => getData(1),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <section className={styles.main}>
      <h1>배포 비교</h1>
      <HydrationBoundary state={dehydratedState}>
        <PostList />
      </HydrationBoundary>
    </section>
  );
}
