import { Edit, Trash, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminVideos() {
  const MOCK_VIDEOS = Array.from({ length: 5 }).map((_, i) => ({
    id: `video-${i}`,
    title: `Family Vacation 202${i}`,
    category: "Travel",
    year: `202${i}`,
    featured: i === 0,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Videos</h1>
        <Link href="/admin/uploads" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition">
          <Plus className="w-5 h-5" />
          Add Video
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Year</th>
              <th className="px-6 py-4 font-medium">Featured</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_VIDEOS.map(video => (
              <tr key={video.id} className="hover:bg-muted/50 transition">
                <td className="px-6 py-4 font-medium">{video.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{video.category}</td>
                <td className="px-6 py-4 text-muted-foreground">{video.year}</td>
                <td className="px-6 py-4">
                  {video.featured ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">Yes</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded-full text-xs font-medium">No</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:text-primary transition"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 hover:text-destructive transition"><Trash className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
