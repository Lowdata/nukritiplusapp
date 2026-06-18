import { Play, Users, Video, Clock } from "lucide-react";

export default function AdminDashboard() {
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
            <p className="text-2xl font-bold">142</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Watch Time</p>
            <p className="text-2xl font-bold">458h</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <Play className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground">Activity logs will appear here.</p>
        </div>
      </div>
    </div>
  );
}
