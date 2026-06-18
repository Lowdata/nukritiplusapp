"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

export function VideoCarousel({ title, videos }: VideoCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-2 relative group md:px-8 px-4">
      <h2 className="text-xl md:text-2xl font-bold text-foreground/90 transition hover:text-foreground">
        {title}
      </h2>
      <div className="relative group/carousel">
        <button
          className={`absolute top-0 bottom-0 left-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition hover:bg-black/50 group-hover/carousel:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
          <ChevronLeft className="mx-auto h-8 w-8 text-white" />
        </button>

        <div
          ref={rowRef}
          className="flex items-center gap-3 overflow-x-scroll py-8 px-2 snap-x snap-mandatory overscroll-x-contain"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Hide default scrollbar via webkit for Chrome/Safari */}
          <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }`}} />
          
          {videos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05, zIndex: 10, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative min-w-[220px] md:min-w-[300px] h-[124px] md:h-[168px] rounded-md overflow-hidden bg-card cursor-pointer shrink-0 snap-center shadow-md hover:shadow-xl hover:ring-2 ring-white/20 transition-shadow group"
            >
              <Link href={`/watch/${video.id}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent hover:via-transparent transition-colors z-10" />
                {video.thumbnailUrl ? (
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none"><rect width="800" height="400" fill="%23222" /><text x="400" y="200" font-family="Arial" font-size="20" fill="%23666" text-anchor="middle" dy=".3em">Image not available</text></svg>';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <Play className="w-8 h-8 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 z-20">
                  <p className="text-sm md:text-base font-bold text-white drop-shadow-md">{video.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          className="absolute top-0 bottom-0 right-0 z-40 m-auto h-full w-12 cursor-pointer opacity-0 transition hover:bg-black/50 group-hover/carousel:opacity-100"
          onClick={() => handleClick("right")}
        >
          <ChevronRight className="mx-auto h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
