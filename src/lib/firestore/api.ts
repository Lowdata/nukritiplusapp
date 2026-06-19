import { adminDb } from "@/lib/firebase/admin";

export interface Video {
  id: string;
  title: string;
  description?: string;
  category: string;
  year: number;
  videoUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  createdAt: string;
}

export async function getAllVideos(): Promise<Video[]> {
  try {
    if (!adminDb) return [];
    const snapshot = await adminDb.collection("videos").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Video));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    if (!adminDb) return null;
    const doc = await adminDb.collection("videos").doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() } as Video;
    }
    return null;
  } catch (error) {
    console.error("Error fetching video by id:", error);
    return null;
  }
}
