import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../context/firebase";
import { User } from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// const AuthContext = createContext();

 
interface AuthContextValue {
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  googleSignIn: () => void;
  user: User;
 }
 interface AuthContextProviderProps {
  children: React.ReactNode;
 }
 
 
const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>({});

const googleSignIn = () =>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
};

async function signUp(email: string, password: string, displayName: string): Promise<void> {
  try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      await setDoc(doc(db, "user", email), {
        savedShows: [],
        displayName: displayName,
      });
    } catch (error) {
      console.error(error);
    }
  }

function logIn(email: string, password: string): Promise<void> {
    try {
      return signInWithEmailAndPassword(auth, email, password).then(() => {});

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function logOut() {
    try {
      return signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User::",currentUser)
    });

    return () => {
      unsubscribe();
    };
  },[]);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
