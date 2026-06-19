import { HLSPlayer } from "@/components/player/HLSPlayer";
import { getVideoById } from "@/lib/firestore/api";
import { notFound } from "next/navigation";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }
  
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <HLSPlayer 
        src={video.videoUrl} 
        title={video.title}
      />
    </div>
  );
}
