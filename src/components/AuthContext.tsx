import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../context/firebase";
import { User } from "firebase/auth";
import { DocumentReference } from '@firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { setDoc, doc, getDoc, collection } from "firebase/firestore";


 
interface AuthContextValue {
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  googleSignIn: () => void;
  user?: User;
 }
 interface AuthContextProviderProps {
  children: React.ReactNode;
 }
 
 
const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);



const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user =  result.user;

   
    // Check if the user object exists before proceeding
    if (user && user.email) {
      const docRef = doc(collection(db, "user"), user.email);

      const checkDocumentExistenceAndExecute = async (docRef:DocumentReference) => {
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          await setDoc(docRef, {
            displayName: user.displayName,
            description: '',
            logo_link: '',
            banner_link: '',
            photoURL: user?.photoURL,
            channelID:
              "@" +
              user.displayName
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(""),
            tick: false,
            subscribers: 0,
            timestamp: Date.now(),
            isLogInByGoogle: true,
          });
        }
      };

      await checkDocumentExistenceAndExecute(docRef);

    }
  } catch (error) {
    console.error(error);
  }
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
        displayName: displayName,
        description: '',
        logo_link: '',
        banner_link: '',
        photoURL:'',
        channelID:
          "@" +
          displayName
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(""),
        tick: false,
        subscribers: 0,
        timestamp: Date.now(),
        isLogInByGoogle: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

async function logIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {});

    } catch (error) {
      console.error(error);
    }
  }

  async function logOut (): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      throw error;
    }
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
      console.log("User::", currentUser);
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
  // return useContext(AuthContext);
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
