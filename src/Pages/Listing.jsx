import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaMapMarkerAlt, FaBed, FaBath, FaChair, FaParking } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../Components/Contact';

export default function Listing() {
    const user = useSelector((state)=> state.user.id)
  const [listing, setlisting] = useState(null);
  SwiperCore.use([Navigation]);
  const params = useParams();
  const[contact,setcontact]= useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listing/single/${params.listingid}`, {
          credentials: 'include',
        });
        const data = await response.json();

        if (data.success === false) {
          toast.error('Something went wrong');
          return;
        }

        setlisting(data);
      } catch (error) {
        toast.error('Something went wrong');
        console.error('❌ Fetch error:', error);
      }
    };

    fetchListing();
  }, [params.listingid]);

  return (
    <div className="bg-[#f5f7f4] min-h-screen">
      {listing && (
        <>
          {/* Image Slider */}
          <Swiper navigation className="w-full h-[500px]">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Info Box */}
          <div className="max-w-4xl mx-auto  p-6 mt-4 rounded-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {listing.name} - <span className="text-gray-700">${listing.regularPrice} / month</span>
            </h2>

            <div className="flex items-center text-gray-600 text-sm gap-1">
              <FaMapMarkerAlt className="text-green-700" />
              <span>{listing.address}</span>
            </div>

            <button
              className={`px-4 py-2 rounded text-white w-fit ${
                listing.type === 'rent' ? 'bg-red-800' : 'bg-green-700'
              }`}
            >
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </button>

            <p className="text-gray-800 text-base">
              <span className="font-semibold">Description</span> - {listing.description}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-green-800 font-medium pt-3">
              <div className="flex items-center gap-1">
                <FaBed /> {listing.bedrooms} Bed
              </div>
              <div className="flex items-center gap-1">
                <FaBath /> 1 Bath
              </div>
              <div className="flex items-center gap-1">
                <FaParking />
                {listing.parking ? 'Parking' : 'No parking'}
              </div>
              <div className="flex items-center gap-1">
                <FaChair />
                {listing.furnished ? 'Furnished' : 'Not furnished'}
              </div>
            </div>
            {user && listing.userRef === user && !contact &&(
                  <button onClick={()=> setcontact(true)} className='bg-slate-700 text-white rounded-lg
         uppercase hover:opacity-95 p-3'>Contact landloard</button>  
            ) }

            {contact &&
            (
                <Contact listing={listing} />
            )
            }
        
          </div>
        </>
      )}
    </div>
  );
}
