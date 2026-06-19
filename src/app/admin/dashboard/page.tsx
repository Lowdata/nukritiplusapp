import { Play, Users, Video, Clock } from "lucide-react";
import { getAllVideos } from "@/lib/firestore/api";
import { adminDb } from "@/lib/firebase/admin";

export const revalidate = 0; // Always fetch fresh dashboard data

export default async function AdminDashboard() {
  const videos = await getAllVideos();
  
  // Fetch users count dynamically
  let totalUsers = 0;
  try {
    if (adminDb) {
      const usersSnapshot = await adminDb.collection("users").get();
      totalUsers = usersSnapshot.size;
    }
  } catch (error) {
    console.error("Error fetching user count for dashboard:", error);
  }

  const featuredCount = videos.filter(v => v.featured).length;
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Videos</p>
            <p className="text-2xl font-bold">{videos.length}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Watch Time</p>
            <p className="text-2xl font-bold">0h</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Play className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold">{featuredCount}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground">
            {videos.length > 0 
              ? `Last upload: "${videos[0].title}" on ${new Date(videos[0].createdAt).toLocaleDateString()}`
              : "No upload activity yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
