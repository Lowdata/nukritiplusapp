"use client";

import { useState } from "react";
import { Search as SearchIcon, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const MOCK_RESULTS = [
    { id: "1", title: "Hawaii 2023", thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
    { id: "2", title: "Aria's 5th Birthday", thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?auto=format&fit=crop&w=600&q=80" },
    { id: "3", title: "Christmas 2024", thumbnailUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80" },
    { id: "4", title: "Graduation", thumbnailUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" },
    { id: "5", title: "First Steps", thumbnailUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80" },
    { id: "6", title: "Ski Trip", thumbnailUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80" },
  ];

  const filtered = query ? MOCK_RESULTS.filter(v => v.title.toLowerCase().includes(query.toLowerCase())) : MOCK_RESULTS;

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
              className="relative aspect-video rounded-md overflow-hidden bg-muted cursor-pointer"
            >
              <Link href={`/watch/${video.id}`}>
                <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors z-10" />
                {video.thumbnailUrl ? (
                  <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <Play className="w-8 h-8 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 z-20">
                  <p className="text-sm font-semibold text-white drop-shadow-md">{video.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
