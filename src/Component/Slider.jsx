import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'

import Spinner from '../Component/spinner'
import { db } from '../Firebase/firebase'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from 'react-router';

export default function Slider() {
    const [listings , setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    SwiperCore.use([Autoplay, Navigation, Pagination])
    useEffect(()=>{
      async function fetchListing(){
        const listingsRef = collection(db, "listings")
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
        const querySnap = await getDocs(q)
        let listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data:doc.data(),
          })
        })
        setListing(listings);
        setLoading(false)
       
      } 
      fetchListing()
  }, []);
  
  if(loading){
    return <Spinner/>
  
  }
  
  if(listings.length === 0){
    return <></>;
  }
    return (
        listings && (
            <>
              <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 3000 }}
              >
                {listings.map(( listing, id) => (
                    // console.log(listing.data.imgUrl[0])
                  <SwiperSlide
                    key={id}
                    onClick={() => navigate(`/category/${listing.data.type}/${listing.id}`)}
                  >
                    <div
                      style={{
                        background: `url(${listing.data.imgUrl[0]}) center, no-repeat`,
                        backgroundSize: "cover",
                      }}
                      className="relative w-full h-[300px] overflow-hidden"
                    ></div>
                    <p className='text-[#f1faee] absolute left-1 top-3 font-medium mx-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl '>{listing.data.name}</p>
                    <p className='text-[#e63946] absolute left-1 bottom-1 font-semibold mx-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-tr-3xl '>${listing.data.discountedPrice ?? listing.data.regularPrice }
                    {listing.data.type === "rent"  &&  " / month"}
                    </p>
                  </SwiperSlide>
                  
                ))}
              </Swiper>
            </>
          )
        );
   
}
