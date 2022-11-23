import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {doc,  addDoc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase/firebase';
import Spinner from '../Component/spinner';
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaShare,FaMapMarkedAlt,FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';



// import required modules
import { Navigation, Pagination } from "swiper";
import { list } from '@chakra-ui/react';



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

      <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
        <div className='w-full'>
          <p className='text-2xl font-bold mb-3 text-blue-900'>
            {listing.name} - ${listing.offer ? 
            listing.discountedPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
             : listing.regularPrice
             .toString()
             .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              {listing.type === 'rent' ? " /month" : ' '}
          </p>
          <p className='flex items-center mt-6 mb-3 font-semibold '>
            <FaMapMarkedAlt className='text-green-700 mr-1'/> 
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%] ">
            <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type === "rent"  ? "Rent" :"Sale"}</p>
            <p >
              {listing.offer && (
                <p className="w-full max-w-[200px] bg-green-800  rounded-md p-1 text-white text-center font-semibold shadow-md" >${+listing.regularPrice - +listing.discountedPrice} discount</p>
              )} 
            </p>
           
          </div>
          <p className='mt-3 mb-3'> <span className='font-semibold'>Description -</span> {listing.description}</p>

          <ul className='flex items-center space-x-2 md:space-x-10 text-sm font-semibold'>
              <li className='flex items-center whitespace-nowrap'>
                <FaBed className='text-lg mr-1'/>
                {+listing.bedrooms > 1  ? `${listing.bedrooms} Beds` : "1Bed"}
              </li>
              <li className='flex items-center whitespace-nowrap'>
                <FaBath className='text-lg mr-1'/>
                {+listing.bathrooms > 1  ? `${listing.bathrooms} Bath` : "1Bath"}
              </li>
              <li className='flex items-center whitespace-nowrap'>
                <FaParking className='text-lg mr-1'/>
                {listing.parking ? "Parking spot" : "No parking"}
              </li>
              <li className='flex items-center whitespace-nowrap'>
                <FaChair className='text-lg mr-1'/>
                {listing.furnished ? "Furnished" : "Not furnished"}
              </li>
            </ul>
        </div>
       
      </div>
    </main>
  )
}
