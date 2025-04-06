import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Project } from "../type";

const PROJECTS_COLLECTION = "projects";

// Add new project
export const addProject = async (projectData: Project) => {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting projects: ", error);
    throw error;
  }
};

// Update project
export const updateProject = async (projectId: string, updatedData: any) => {
  try {
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), updatedData);
  } catch (error) {
    console.error("Error updating project: ", error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId: string) => {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
};
