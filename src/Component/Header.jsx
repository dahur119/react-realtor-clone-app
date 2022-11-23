import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

 

export default function () {
    const [pageState, setPageState] = useState('sign in')
    const location = useLocation()
    const navigate = useNavigate()

    const auth = getAuth()

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setPageState('profile')
            }else{
                setPageState('sign-in ')
            }
        } )

    }, [auth])
    console.log(location)

    const pathMatchRoute =(route) =>{
        if(route === location.pathname){
            return true
        }
    }

    
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40' >
       <header className=" flex justify-between items-center px-3 max-w-6xl mx-auto ">
            <div>
                <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' alt='logo' className="h-5 cursor-pointer" onClick={()=>navigate("/")}/>
            </div>
            <div class=""> 
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-500 "}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offer") && "text-black border-b-red-500 "}`} onClick={()=>navigate("/offer")}>Offer</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&  "text-black border-b-red-500 "}`} onClick={()=>navigate("/profile")}>
                        {pageState}</li>
                </ul>

            </div>

     
       </header>
    </div>
  )
}
