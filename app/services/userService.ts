import { db } from "@/lib/firebase";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection 
} from "firebase/firestore";

const USERS_COLLECTION = "user";

// Create or update user profile
export const setUserProfile = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, USERS_COLLECTION, userId), userData, { merge: true });
  } catch (error) {
    console.error("Error setting user profile:", error);
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
export const updateUserProfile = async (userId: string, updates: any) => {
  try {
    await updateDoc(doc(db, USERS_COLLECTION, userId), updates);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};