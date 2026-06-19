"use client";

import { useState } from "react";
import { Search as SearchIcon, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Video } from "@/lib/firestore/api";

export function SearchClient({ initialVideos }: { initialVideos: Video[] }) {
  const [query, setQuery] = useState("");

  const filtered = query ? initialVideos.filter(v => v.title.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase())) : initialVideos;

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-12 max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search memories, trips, birthdays..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card/50 border border-border rounded-full py-4 pl-14 pr-6 text-lg focus:outline-none focus:border-primary transition shadow-xl"
          />
        </div>

        <h2 className="text-xl font-semibold mb-6 text-muted-foreground">
          {query ? `Search results for "${query}"` : "Top searches"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(video => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-video rounded-md overflow-hidden bg-card cursor-pointer group shadow-md hover:shadow-xl hover:ring-2 ring-white/20 transition-all"
            >
              <Link href={`/watch/${video.id}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent hover:via-transparent transition-colors z-10" />
                {video.thumbnailUrl ? (
                  <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <Play className="w-8 h-8 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 z-20">
                  <p className="text-sm font-bold text-white drop-shadow-md">{video.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
