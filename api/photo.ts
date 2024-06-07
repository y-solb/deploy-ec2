export async function getData(page: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
