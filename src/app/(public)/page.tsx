import { VideoCarousel } from "@/components/netflix/VideoCarousel";
import { Play, Info } from "lucide-react";
import Link from "next/link";

const MOCK_VIDEOS = [
  { id: "1", title: "Hawaii 2023", thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" },
  { id: "2", title: "Aria's 5th Birthday", thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?auto=format&fit=crop&w=600&q=80" },
  { id: "3", title: "Christmas 2024", thumbnailUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80" },
  { id: "4", title: "Graduation", thumbnailUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" },
  { id: "5", title: "First Steps", thumbnailUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80" },
  { id: "6", title: "Ski Trip", thumbnailUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=600&q=80" },
  { id: "7", title: "Paris Vacation", thumbnailUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { id: "8", title: "Wedding Anniversary", thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80" },
  { id: "9", title: "Summer Camp", thumbnailUrl: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80" },
  { id: "10", title: "New Puppy", thumbnailUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80" },
];

export default function HomePage() {
  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Hero Banner */}
      <div 
        className="relative h-[75vh] lg:h-[80vh] w-full bg-card bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80')` }}
      >
        {/* Mock background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        
        <div className="absolute top-[35%] md:top-[45%] left-4 md:left-12 z-20 max-w-[550px]">
          <h1 className="text-3xl md:text-5xl font-black drop-shadow-2xl mb-4 text-white tracking-tight">Our 2025 Family Trip</h1>
          <p className="text-base md:text-lg drop-shadow-lg text-white/90 mb-6 line-clamp-3 font-medium">
            An unforgettable journey through the mountains, capturing every smile, sunset, and silly moment. Relive the best memories from our summer getaway.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/watch/featured" className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-white text-black rounded font-bold hover:bg-white/80 transition-colors shadow-lg">
              <Play className="w-5 h-5 fill-current" />
              Play
            </Link>
            <button className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-gray-500/50 backdrop-blur-md text-white rounded font-bold hover:bg-gray-500/30 transition-colors shadow-lg">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-10 md:space-y-16 mt-8 md:mt-12 relative z-30">
        <VideoCarousel title="Continue Watching" videos={MOCK_VIDEOS.slice(0, 5)} />
        <VideoCarousel title="Trending Memories" videos={MOCK_VIDEOS.slice(5, 10)} />
        <VideoCarousel title="Family Originals" videos={MOCK_VIDEOS} />
        <VideoCarousel title="Birthday Collection" videos={MOCK_VIDEOS.slice(2, 8)} />
        <VideoCarousel title="Travel Collection" videos={MOCK_VIDEOS.slice(1, 9)} />
        <VideoCarousel title="Recently Added" videos={MOCK_VIDEOS} />
      </div>
    </div>
  );
}
