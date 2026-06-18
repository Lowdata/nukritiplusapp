# Deployment Guide

Nukriti+ is designed to be deployed seamlessly on **Vercel** with **Firebase** and **Cloudflare R2** integrations.

## Prerequisites
1. A Vercel account.
2. A Firebase project with Authentication and Firestore enabled.
3. A Cloudflare account with R2 enabled.

## Step-by-Step Deployment

1. **Push to GitHub**
   Ensure your codebase is pushed to a GitHub repository.

2. **Connect to Vercel**
   - Log in to your Vercel account.
   - Click "Add New..." -> "Project".
   - Import your GitHub repository.

3. **Configure Environment Variables**
   - In the Vercel deployment settings, add all required environment variables based on the `.env.example` file.
   - For `FIREBASE_PRIVATE_KEY`, ensure the multiline string is correctly formatted (you may need to wrap it in quotes or properly escape newlines depending on Vercel's UI).

4. **Deploy**
   - Click "Deploy".
   - Vercel will automatically detect the Next.js framework, build the application, and assign a production URL.

5. **Post-Deployment Checks**
   - Visit the production URL.
   - Set up your first admin user via the Firebase Console (manually assign `role: "admin"` in Firestore to your user document).
