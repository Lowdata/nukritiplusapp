"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Film } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | Blob | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const catRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const generateThumbnail = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.playsInline = true;
      video.muted = true;
      const url = URL.createObjectURL(file);
      video.src = url;

      video.onloadedmetadata = () => {
        // Seek to 1s or half the video length to capture a good frame
        video.currentTime = Math.min(1, video.duration / 2);
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Thumbnail extraction failed"));
            URL.revokeObjectURL(url);
          }, "image/jpeg", 0.8);
        } else {
          reject(new Error("No canvas context"));
        }
      };

      video.onerror = (e) => {
        reject(e);
        URL.revokeObjectURL(url);
      };
    });
  };

  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);

    try {
      toast.info("Extracting thumbnail...");
      const blob = await generateThumbnail(file);
      setThumbnailFile(blob);
      setThumbnailPreview(URL.createObjectURL(blob));
      toast.success("Thumbnail generated automatically!");
    } catch (err) {
      console.error(err);
      toast.error("Could not automatically generate thumbnail. Please upload one manually.");
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const uploadFileToR2 = async (file: File | Blob, originalName: string, isVideo: boolean) => {
    const ext = isVideo ? originalName.split('.').pop() || 'mp4' : 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const contentType = isVideo ? (file.type || "video/mp4") : "image/jpeg";

    const res = await fetch("/api/upload/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, contentType }),
    });

    if (!res.ok) throw new Error("Failed to get presigned URL");
    const { signedUrl, publicUrl } = await res.json();

    const uploadRes = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });

    if (!uploadRes.ok) throw new Error("Failed to upload file to R2");
    
    return publicUrl;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) {
      toast.error("Please provide both a video and a thumbnail.");
      return;
    }

    setIsUploading(true);
    try {
      setUploadProgress("Uploading thumbnail...");
      const thumbUrl = await uploadFileToR2(thumbnailFile, "thumbnail.jpg", false);

      setUploadProgress("Uploading video (this may take a while)...");
      const videoUrl = await uploadFileToR2(videoFile, videoFile.name, true);

      setUploadProgress("Saving to database...");
      const videoData = {
        title: titleRef.current?.value,
        description: descRef.current?.value,
        category: catRef.current?.value,
        year: parseInt(yearRef.current?.value || "2025"),
        videoUrl,
        thumbnailUrl: thumbUrl,
        featured: false,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "videos"), videoData);

      toast.success("Memory uploaded successfully!");
      
      // Reset form
      setVideoFile(null);
      setThumbnailFile(null);
      setThumbnailPreview(null);
      if (titleRef.current) titleRef.current.value = "";
      if (descRef.current) descRef.current.value = "";

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Upload Memory</h1>
      
      <form onSubmit={handleUpload} className="space-y-6 bg-card p-6 md:p-8 rounded-lg border border-border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input ref={titleRef} required type="text" className="w-full bg-background border border-border rounded-md px-4 py-2" placeholder="e.g., Summer Trip 2025" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea ref={descRef} className="w-full bg-background border border-border rounded-md px-4 py-2" rows={3} placeholder="Describe the memory..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select ref={catRef} className="w-full bg-background border border-border rounded-md px-4 py-2">
              <option>Travel</option>
              <option>Birthday</option>
              <option>Milestone</option>
              <option>Family Gathering</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <input ref={yearRef} type="number" className="w-full bg-background border border-border rounded-md px-4 py-2" defaultValue={new Date().getFullYear()} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Video File (.mp4 recommended)</label>
          {videoFile ? (
            <div className="flex items-center justify-between bg-muted p-4 rounded-md border border-border">
              <div className="flex items-center gap-3">
                <Film className="text-primary w-6 h-6" />
                <span className="text-sm font-medium truncate max-w-[200px] md:max-w-md">{videoFile.name}</span>
              </div>
              <button type="button" onClick={() => setVideoFile(null)} className="p-2 hover:text-red-500"><X className="w-5 h-5"/></button>
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
              <input type="file" accept="video/*" onChange={handleVideoSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Click or drag video file here</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail Image</label>
          {thumbnailPreview ? (
            <div className="relative bg-muted p-2 rounded-md border border-border inline-block">
              <img src={thumbnailPreview} alt="Thumbnail preview" className="h-32 object-contain rounded" />
              <button 
                type="button" 
                onClick={() => { setThumbnailFile(null); setThumbnailPreview(null); }} 
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                <X className="w-4 h-4"/>
              </button>
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition cursor-pointer">
              <input type="file" accept="image/*" onChange={handleThumbnailSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Click to upload custom thumbnail (or it auto-generates on video select)</p>
            </div>
          )}
        </div>

        <button disabled={isUploading} type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-primary/90 transition disabled:opacity-50">
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {uploadProgress}
            </>
          ) : "Upload Memory"}
        </button>
      </form>
    </div>
  );
}
