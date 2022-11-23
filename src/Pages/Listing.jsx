import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {doc,  addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase/firebase';
import Spinner from '../Component/spinner';
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaShare } from 'react-icons/fa';



// import required modules
import { Navigation, Pagination } from "swiper";



export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setLinkedCopied] = useState(false)
    // SwiperCore.use([Autoplay]);

    useEffect(()=>{
        async function fetchUserListing () {
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
                
            }



        }
        fetchUserListing()
        
        
       
    }, [params.listingId])

    if(loading){
        return <Spinner/>
    }


  return (
    <main>
        <Swiper
        dir="rtl"
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {listing.imgUrl.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrl[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=' fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-grey-400 rounded-full w-12 h-12 flex justify-center item-center'
              onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                setLinkedCopied(true)
                setTimeout(()=>{
                  setLinkedCopied(false)
      
                }, 2000)
       }}>

        <FaShare className='text-lg text-slate-500 '/>
      </div>
      {shareLinkCopied && (
        <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-grey-400 rounded-md bg-white z-10 p-2 '>Linked copied</p>
      )}
    </main>
  )
}
