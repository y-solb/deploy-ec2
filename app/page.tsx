import { getData } from "@/api/photo";
import styles from "./page.module.css";

import PostList from "@/components/PostList";

export default async function Home() {
  const data = await getData(1);

  return (
    <section className={styles.main}>
      <PostList initialPhotoList={data} />
    </section>
  );
}
