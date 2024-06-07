import styles from "./page.module.css";

import PostList from "@/components/PostList";

export async function getData(page: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home() {
  const data = await getData(1);

  return (
    <section className={styles.main}>
      <PostList initialPhotoList={data} />
    </section>
  );
}
