import { Edit, Trash, Plus } from "lucide-react";
import { getAllVideos } from "@/lib/firestore/api";

export const revalidate = 0;

export default async function AdminCategories() {
  const videos = await getAllVideos();

  // Aggregate categories from uploaded videos
  const categoryMap: Record<string, number> = {};
  videos.forEach(v => {
    if (!categoryMap[v.category]) categoryMap[v.category] = 0;
    categoryMap[v.category]++;
  });

  const categories = Object.keys(categoryMap).map(name => ({
    name,
    count: categoryMap[name],
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition">
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden max-w-3xl">
        <table className="w-full text-left">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Video Count</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">No categories found. Upload a video to create one.</td>
              </tr>
            )}
            {categories.map(category => (
              <tr key={category.name} className="hover:bg-muted/50 transition">
                <td className="px-6 py-4 font-medium">{category.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{category.count} videos</td>
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
