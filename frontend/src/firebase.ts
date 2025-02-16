import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import type { Store } from 'pinia'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.settings.appVerificationDisabledForTesting = import.meta.env.DEV;

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence);

// Create a variable to hold the store reference
let userStore: Store | null = null;

// Create a function to initialize the store
export function initializeAuthStore(store: Store) {
    userStore = store;
}

// Add auth state observer
onAuthStateChanged(auth, async (firebaseUser) => {
    if (!userStore) return; // Skip if store isn't initialized

    if (firebaseUser) {
        // User is signed in
        if (!userStore.isAuthenticated) {
            const token = await firebaseUser.getIdToken();
            await userStore.restoreSession(token);
        }
    } else {
        // User is signed out
        userStore.logout();
    }
});

export async function getFirebaseToken(): Promise<string> {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return await userCredential.user.getIdToken();
}