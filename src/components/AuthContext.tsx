import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../context/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup, signInWithRedirect ,GoogleAuthProvider
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

const googleSignIn = () =>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
};

  async function signUp(email, password, displayName) {
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

  function logIn(email, password) {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
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
