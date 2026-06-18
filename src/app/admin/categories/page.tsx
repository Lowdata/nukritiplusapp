import { Edit, Trash, Plus } from "lucide-react";

export default function AdminCategories() {
  const MOCK_CATEGORIES = [
    { id: "1", name: "Travel", count: 42 },
    { id: "2", name: "Birthday", count: 18 },
    { id: "3", name: "Milestone", count: 5 },
  ];

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
            {MOCK_CATEGORIES.map(category => (
              <tr key={category.id} className="hover:bg-muted/50 transition">
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
