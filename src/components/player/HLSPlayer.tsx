"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Maximize, SkipForward, Volume2, VolumeX, RotateCcw, RotateCw, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HLSPlayerProps {
  src: string;
  title: string;
  onProgress?: (currentTime: number) => void;
  initialTime?: number;
}

export function HLSPlayer({ src, title, onProgress, initialTime = 0 }: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ time: number, x: number } | null>(null);

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isHls = src.toLowerCase().includes(".m3u8");

    if (!isHls) {
      video.src = src;
      video.currentTime = initialTime;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => console.log("Autoplay prevented"));
      });
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        startPosition: initialTime,
      });
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => console.log("Autoplay prevented"));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.currentTime = initialTime;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => console.log("Autoplay prevented"));
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src, initialTime]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const calcProgress = Number.isFinite((current / duration) * 100) ? (current / duration) * 100 : 0;
      setProgress(calcProgress);
      if (onProgress) {
        onProgress(current);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
      setProgress(manualChange);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const now = Date.now();
    const x = e.clientX;
    const width = e.currentTarget.clientWidth;
    
    if (lastTapRef.current && now - lastTapRef.current.time < 300) {
      if (x < width / 2) {
        skipTime(-10);
      } else {
        skipTime(10);
      }
      lastTapRef.current = null;
    } else {
      lastTapRef.current = { time: now, x };
      togglePlay();
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowleft":
        case "j":
          e.preventDefault();
          skipTime(-10);
          break;
        case "arrowright":
        case "l":
          e.preventDefault();
          skipTime(10);
          break;
        case "arrowup":
          e.preventDefault();
          videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
          if (videoRef.current.volume > 0) {
            videoRef.current.muted = false;
            setIsMuted(false);
          }
          break;
        case "arrowdown":
          e.preventDefault();
          videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
          if (videoRef.current.volume === 0) {
            videoRef.current.muted = true;
            setIsMuted(true);
          }
          break;
        case "f":
          e.preventDefault();
          toggleFullScreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isMuted]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center group overflow-hidden touch-manipulation"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handleVideoClick}
      />
      
      {/* Mobile Fast Forward / Rewind Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center gap-8 md:hidden pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
        <button 
          onClick={(e) => { e.stopPropagation(); skipTime(-10); }}
          className="pointer-events-auto p-4 bg-black/50 rounded-full text-white backdrop-blur-md active:scale-95 transition-transform"
        >
          <RotateCcw className="w-8 h-8" />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="pointer-events-auto p-6 bg-black/50 rounded-full text-white backdrop-blur-md active:scale-95 transition-transform"
        >
           {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white translate-x-1" />}
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); skipTime(10); }}
          className="pointer-events-auto p-4 bg-black/50 rounded-full text-white backdrop-blur-md active:scale-95 transition-transform"
        >
          <RotateCw className="w-8 h-8" />
        </button>
      </div>
      
      {/* Top Bar (Back Button & Title) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center gap-4 z-50 pointer-events-none"
      >
        <Link href="/" className="pointer-events-auto">
          <ChevronLeft className="w-10 h-10 text-white hover:text-primary transition" />
        </Link>
        <h1 className="text-white text-xl md:text-2xl font-bold truncate pr-4">{title}</h1>
      </motion.div>

      {/* Bottom Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 50 }}
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-50"
      >
        {/* Progress Bar */}
        <div className="w-full mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={Number.isFinite(progress) ? progress : 0}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer transition-all hover:h-2"
            style={{
              background: `linear-gradient(to right, #E50914 ${Number.isFinite(progress) ? progress : 0}%, rgba(255,255,255,0.3) ${Number.isFinite(progress) ? progress : 0}%)`
            }}
          />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="hover:scale-110 transition hidden md:block">
              {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white" />}
            </button>
            <button onClick={() => skipTime(10)} className="hover:text-primary transition hidden md:block">
              <SkipForward className="w-6 h-6" />
            </button>
            <button onClick={toggleMute} className="hover:text-primary transition">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={toggleFullScreen} className="hover:text-primary transition">
              <Maximize className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
