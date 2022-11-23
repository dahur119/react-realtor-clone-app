import React from 'react'
import { useState } from 'react';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
  import { db } from "../Firebase/firebase";
  import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";


export default function SignUp() {

   
    const [showPassword, setShowPassword] = useState(true)
    const [formData, setFormData] = useState({
      name:"",
      email:"",
      password:""
    })

    const {name, email, password } = formData;
    const navigate = useNavigate()
    function onChange(e){
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value
        }))
    }

    const onSubmitHandler =  async (e) =>{
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            updateProfile(auth.currentUser, {
                displayName:name,
            })

            const user = userCredential.user;
            const formDataCopy = { ...formData }
              delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, "users", user.uid), formDataCopy);
            navigate("/")

            
        } catch (error) {
            toast.error("Something went wrong please check your connection");
            
            
        }
        
       
    }

  return (
    <section>
        <h1 className=' text-3xl text-center mt-6 font-bold'>SignUp</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
            <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
                <img src='w-full rounded-2xl '>
                </img>
            </div>
            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          

            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmitHandler}>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              FullName
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name"
             type="text" 
             placeholder="FullName" 
            value={name} 
             onChange={onChange}/>
            </div>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Email 
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email"
             type="text" 
             placeholder="email" 
             value={email} 
             onChange={onChange}/>
            </div>
            <div class="mb-6 relative">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="****" 
            value={password} 
            onChange={onChange}/>
            {showPassword ? (
                <AiFillEyeInvisible  className='absolute right-3 top-1 cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>
            ): <AiFillEye className='absolute right-3 top-1 cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>  }
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div class="flex items-center justify-between">
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                <Link to='/forgot-password'>Forgot Password</Link>                     
            </a> 
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                
                <Link to='/sign-in'>Have an Account?</Link>
            </a>
            
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3" type="submit">
                Sign-up
            </button>
            {/* <div className=' flex  items-center my-4 before:border-t  before:flex-1  before:border-grey-300   after:border-t  after:flex-1  after:border-grey-300 '>
                <p className='text-center font-semibold mx-4'>OR</p>
            </div> */}
            {/* <Outh></Outh> */}


            {/* <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3" type="submit">
                Google-Sign
            </button> */}
        </form>
        

        </div>
            </div>

    </section>
    
  )
}
