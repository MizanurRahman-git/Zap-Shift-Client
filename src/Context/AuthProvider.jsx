import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/Firebase.init";



const googleProvider = new GoogleAuthProvider

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const updateuserProfile = (updateInfo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, updateInfo)
  }

  const logOut = () => {
    return signOut(auth)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      setLoading(false)
    })
    return ()=> {
      unsubscribe();
    }
  },[])

  const authInfo = {
    user,
    setUser,
    loading,
    logOut,
    setLoading,
    registerUser,
    signInUser,
    signWithGoogle,
    updateuserProfile,
  };



  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
