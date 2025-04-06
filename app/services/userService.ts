import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { UserProfile } from "../type";

const USERS_COLLECTION = "user";

// Create or update user profile
export const saveUserProfile = async (userId: string, userData: UserProfile) => {
  try {
    // Check if document exists
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, update only the provided fields
      const updates: Partial<UserProfile> = {};
      for (const [key, value] of Object.entries(userData)) {
        if (value !== undefined) {
          updates[key as keyof UserProfile] = value;
        }
      }

      await setDoc(docRef, updates, { merge: true });
    } else {
      // Document doesn't exist, create with all data
      await setDoc(docRef, {
        ...userData,
        createdAt: new Date().toISOString(), // Add creation timestamp
      });
    }
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update specific fields
export const updateUserProfile = async (userId: string, updates: UserProfile) => {
  try {
    await updateDoc(doc(db, USERS_COLLECTION, userId), updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
