import React, { useEffect, useState } from 'react'
import {doc,  addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'
import { db } from '../Firebase/firebase';


export default function Contact({ userRef, listing}) {
    const [landLord, setLandLord] = useState(null)
    const [message , setMessage ] = useState('')
    useEffect(()=>{
        async function getLandLord(){
            const docRef = doc(db, "users", userRef)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setLandLord(docSnap.data())

            }else{
                toast.error("couldn't get landLord data")
            }
        }
        getLandLord()
    }, [userRef])

    function onChange(e){
        setMessage(e.target.value)
    }
   
  return (
    <div>{landLord !== null && (
        <div className='flex flex-col w-full mt-6'>
            <p>
                contact {landLord.name} for the {listing.name.toLowerCase()}</p>
            <div>
                <textarea
                
                name="message" 
                id="message" 
                cols="30" 
                rows="2" 
                value={message}
                onChange={onChange}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                ></textarea>
            </div>
            <a
            href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6" type="button">
              Send Message
            </button>
          </a>
        </div>

    )}</div>
  )
}
