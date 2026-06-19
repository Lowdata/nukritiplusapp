import { SearchClient } from "./SearchClient";
import { getAllVideos } from "@/lib/firestore/api";

export const revalidate = 60; // Cache for 60 seconds

export default async function SearchPage() {
  const videos = await getAllVideos();
  return <SearchClient initialVideos={videos} />;
}
