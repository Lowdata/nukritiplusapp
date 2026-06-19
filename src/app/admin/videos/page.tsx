import { Edit, Trash, Plus } from "lucide-react";
import Link from "next/link";
import { getAllVideos } from "@/lib/firestore/api";
import { adminDb } from "@/lib/firebase/admin";
import { revalidatePath } from "next/cache";

export const revalidate = 0; // Don't cache admin dashboard heavily

export default async function AdminVideos() {
  const videos = await getAllVideos();

  async function deleteVideo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id && adminDb) {
      await adminDb.collection("videos").doc(id).delete();
      revalidatePath("/admin/videos");
      revalidatePath("/");
    }
  }

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
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {videos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No videos uploaded yet.</td>
              </tr>
            )}
            {videos.map(video => (
              <tr key={video.id} className="hover:bg-muted/50 transition">
                <td className="px-6 py-4 font-medium flex items-center gap-4">
                  {video.thumbnailUrl && <img src={video.thumbnailUrl} alt="Thumb" className="w-16 h-10 object-cover rounded" />}
                  {video.title}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{video.category}</td>
                <td className="px-6 py-4 text-muted-foreground">{video.year}</td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <button className="p-2 hover:text-primary transition" title="Edit"><Edit className="w-4 h-4" /></button>
                  <form action={deleteVideo}>
                    <input type="hidden" name="id" value={video.id} />
                    <button type="submit" className="p-2 hover:text-destructive transition" title="Delete"><Trash className="w-4 h-4" /></button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
