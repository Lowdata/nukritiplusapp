"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative px-4">
      {/* Background with dark overlay similar to Netflix */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-black/80 p-10 md:p-14 rounded-lg shadow-2xl border border-white/10"
      >
        <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
        
        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded transition-colors"
        >
          Sign In with Google
        </button>

        <div className="mt-8 text-white/60 text-sm">
          <p>
            Welcome to Nukriti+. Sign in with your authorized family account to continue.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
