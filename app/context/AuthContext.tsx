"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, User, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error?: Error | null; // Consider adding error state
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  //   checkBiometricSupport: () => boolean;
  //   biometricLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();
  // Check user existence in Firestore
  const checkUserExists = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "user", uid));
    console.log("🚀 ~ checkUserExists ~ userDoc:", userDoc);
    return userDoc.exists();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const exists = await checkUserExists(user.uid);
        if (!exists) {
          await signOut(auth);
          setCurrentUser(null);
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      setCurrentUser(null);
      router.push("/login");
    } catch (error) {
      setError(error?.message);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  //   const checkBiometricSupport = () => {
  //     if (typeof window !== "undefined" && window.PublicKeyCredential) {
  //       return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  //     }
  //     return false;
  //   };

  //   const biometricLogin = async () => {
  //     // if (!checkBiometricSupport()) {
  //     //   setError("Biometric authentication not supported");
  //     //   return;
  //     // }

  //     try {
  //       // WebAuthn implementation would go here
  //       // This is a placeholder for actual implementation
  //       const auth = getAuth(app);
  //       // In a real app, you would verify the biometric signature
  //       // and then sign in the user
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   const registerBiometric = async (email: string) => {
  //     try {
  //       // This is a simplified version - actual implementation requires server-side components
  //       const auth = getAuth(app);
  //       const credential = await navigator.credentials.create({
  //         publicKey: {
  //           challenge: new Uint8Array(32),
  //           rp: { name: "Freelancer Dashboard" },
  //           user: {
  //             id: new Uint8Array(16),
  //             name: email,
  //             displayName: email,
  //           },
  //           pubKeyCredParams: [
  //             { type: "public-key", alg: -7 }, // ES256
  //           ],
  //           authenticatorSelection: {
  //             authenticatorAttachment: "platform",
  //             userVerification: "required",
  //           },
  //         },
  //       });

  //       // Store the credential ID with the user's account in your backend
  //       // Then you can use it for future authentications
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   const authenticateBiometric = async () => {
  //     try {
  //       // Get the credential ID from your backend for this user
  //       const credential = await navigator.credentials.get({
  //         publicKey: {
  //           challenge: new Uint8Array(32),
  //           allowCredentials: [{
  //             type: "public-key",
  //             id: new Uint8Array(STORED_CREDENTIAL_ID), // You need to store this
  //             transports: ["internal"],
  //           }],
  //           userVerification: "required",
  //         },
  //       });

  //       // Verify the signature with your backend
  //       // Then sign in the user with Firebase
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        register,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
