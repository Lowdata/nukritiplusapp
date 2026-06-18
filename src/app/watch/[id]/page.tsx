import { HLSPlayer } from "@/components/player/HLSPlayer";

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <HLSPlayer 
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" 
        title={`Memory ${id}`}
      />
    </div>
  );
}
