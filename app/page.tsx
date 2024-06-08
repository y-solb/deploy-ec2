import { getData } from "@/api/photo";
import styles from "./page.module.css";

import PostList from "@/components/PostList";

export default async function Home() {
  const data = await getData(1);

  return (
    <section className={styles.main}>
      <h1>배포 비교</h1>
      <PostList initialPhotoList={data} />
    </section>
  );
}
