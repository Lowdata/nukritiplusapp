import { Timestamp } from "firebase/firestore";

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  year: number;
  category: string;
  featured: boolean;
  season: number;
  episode: number;
  duration: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: "admin" | "viewer";
}

export interface Progress {
  userId: string;
  videoId: string;
  currentTime: number;
  completed: boolean;
  updatedAt: Timestamp;
}
