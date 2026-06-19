import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let app: App | undefined;

if (!getApps().length) {
  try {
    app = initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/"/g, '') as string,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
} else {
  app = getApps()[0];
}

export const adminDb = app ? getFirestore(app) : null as any;
export const adminAuth = app ? getAuth(app) : null as any;
