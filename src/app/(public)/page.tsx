import { VideoCarousel } from "@/components/netflix/VideoCarousel";
import { Play, Info } from "lucide-react";
import Link from "next/link";
import { getAllVideos } from "@/lib/firestore/api";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const videos = await getAllVideos();

  const featured = videos.find(v => v.featured) || videos[0];

  const continueWatching = videos.slice(0, 10);
  const birthdays = videos.filter(v => v.category.toLowerCase().includes("birthday"));
  const travel = videos.filter(v => v.category.toLowerCase().includes("travel"));
  const familyOriginals = videos.filter(v => !v.category.toLowerCase().includes("birthday") && !v.category.toLowerCase().includes("travel"));

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Hero Banner */}
      <div 
        className="relative h-[75vh] lg:h-[80vh] w-full bg-card bg-cover bg-center"
        style={{ backgroundImage: `url('${featured?.thumbnailUrl || 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        
        <div className="absolute top-[35%] md:top-[45%] left-4 md:left-12 z-20 max-w-[550px]">
          <h1 className="text-3xl md:text-5xl font-black drop-shadow-2xl mb-4 text-white tracking-tight">{featured?.title || "Our Memories"}</h1>
          <p className="text-base md:text-lg drop-shadow-lg text-white/90 mb-6 line-clamp-3 font-medium">
            {featured?.description || "Upload some memories from the admin panel to see them featured here."}
          </p>
          <div className="flex items-center gap-3">
            {featured && (
              <Link href={`/watch/${featured.id}`} className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-white text-black rounded font-bold hover:bg-white/80 transition-colors shadow-lg">
                <Play className="w-5 h-5 fill-current" />
                Play
              </Link>
            )}
            <button className="flex items-center gap-2 px-5 py-2 md:px-6 md:py-2.5 bg-gray-500/50 backdrop-blur-md text-white rounded font-bold hover:bg-gray-500/30 transition-colors shadow-lg">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-10 md:space-y-16 mt-8 md:mt-12 relative z-30">
        {continueWatching.length > 0 && <VideoCarousel title="Recently Added" videos={continueWatching} />}
        {birthdays.length > 0 && <VideoCarousel title="Birthday Collection" videos={birthdays} />}
        {travel.length > 0 && <VideoCarousel title="Travel Collection" videos={travel} />}
        {familyOriginals.length > 0 && <VideoCarousel title="Family Originals" videos={familyOriginals} />}
        {videos.length === 0 && (
           <div className="text-center py-20 text-muted-foreground font-medium">No videos found. Log in as an admin and upload some memories!</div>
        )}
      </div>
    </div>
  );
}
