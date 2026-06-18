"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Mock upload
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Video uploaded successfully!");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Upload Memory</h1>
      
      <form onSubmit={handleUpload} className="space-y-6 bg-card p-6 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input required type="text" className="w-full bg-background border border-border rounded-md px-4 py-2" placeholder="e.g., Summer Trip 2025" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea className="w-full bg-background border border-border rounded-md px-4 py-2" rows={4} placeholder="Describe the memory..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select className="w-full bg-background border border-border rounded-md px-4 py-2">
              <option>Travel</option>
              <option>Birthday</option>
              <option>Milestone</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <input type="number" className="w-full bg-background border border-border rounded-md px-4 py-2" defaultValue={new Date().getFullYear()} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Video File (to be converted to HLS)</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Click or drag video file here</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail Image</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Click or drag image file here</p>
          </div>
        </div>

        <button disabled={isUploading} type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-primary/90 transition">
          {isUploading ? "Uploading..." : "Upload Memory"}
        </button>
      </form>
    </div>
  );
}
