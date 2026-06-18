# Environment Variables Documentation

This document explains the environment variables required for Nukriti+ to function properly. All of these variables should be added to your `.env.local` file for local development and to Vercel for production.

## Firebase Configuration
These variables are obtained from your Firebase Project Settings.
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Your Firebase Web API Key.
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: The Auth domain for your Firebase project.
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Your unique Firebase project ID.
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase Storage bucket URL.
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Used for FCM (optional but recommended).
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase application ID.

## Firebase Admin SDK
Used for server-side operations (like verifying admin status, secure writes).
- `FIREBASE_CLIENT_EMAIL`: Found in the Firebase service account JSON.
- `FIREBASE_PRIVATE_KEY`: Found in the Firebase service account JSON. Keep this secret!

## Cloudflare R2 Configuration
Used for storing and serving video assets without egress fees.
- `R2_ACCOUNT_ID`: Your Cloudflare Account ID.
- `R2_ACCESS_KEY_ID`: Generated R2 Access Key.
- `R2_SECRET_ACCESS_KEY`: Generated R2 Secret Key. Keep this secret!
- `R2_BUCKET_NAME`: The name of the bucket created in R2 (e.g., `nukriti-videos`).
- `NEXT_PUBLIC_R2_PUBLIC_URL`: The public custom domain or `r2.dev` URL for serving your assets.
