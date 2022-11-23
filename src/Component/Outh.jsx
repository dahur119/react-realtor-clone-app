import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {toast} from "react-toastify";
import { db } from '../Firebase/firebase';
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

export default function Outh() {

  const navigate = useNavigate()

  const onGoogleClick = async () =>{
    
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      console.log(user)

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()){
        await setDoc(docRef, {
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp(),
        });
      }
      navigate("/")
    

      
      
      
    } catch (error) {
      toast.error("could not sign in google error")
      console.log(error)
    }

  }
  return (
    <button type='button' onClick={onGoogleClick} className='flex item-center justify-center w-full bg-red-700 text-white px-7 py-2 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue With Google
        </button>
  )
}
