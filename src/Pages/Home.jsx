import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
    <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700
      font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>Perfect</span>
       <br /> place with ease
      </h1>
<div className='text-gray-700 text-xs sm:text-sm'>
  Sahand Esatte is the best place to find your next perfect place
  to live <br /> we have widr range of properties for you to choose from.

</div>
<Link to="/search" className='font-bold  hover:underline text-xs sm:text-sm text-blue-800'>Let's get started</Link>
</div>

      {/* Swiper Section */}
      <section className=" py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Featured Listings</h2>
          <Swiper
  modules={[Pagination]}
  pagination={{ clickable: true }}
  spaceBetween={20}
  slidesPerView={1}
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {[
    {
      id: 1,
      img: 'https://images.privatevillas.guide/hotelimage.php?p_id=11695532&code=21fc5cb193990525aa2fe87901e8dcc8&webpage=privatevillas.guide&link=https%3A%2F%2Fsubdomain.cloudimg.io%2Fcrop%2F1536x1152%2Fq70.fcontrast10.fbright0.fsharp5%2Fhttps%3A%2F%2Fq-xx.bstatic.com%2Fxdata%2Fimages%2Fhotel%2Fmax1536%2F638233133.jpg%3Fk%3D32c36028742990290409ca871df0fd0054cb029f286e2c4144f48dc04cfbc809%26o%3D',
      title: 'Modern Villa in Islamabad',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      title: 'Luxury Apartment in Lahore',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80',
      title: 'Cozy House in Karachi',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      title: 'Family Home in Rawalpindi',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      title: 'Elegant Bungalow in Multan',
    },
  ].map((listing) => (
    <SwiperSlide key={listing.id}>
      <div className="h-64 w-full rounded-lg overflow-hidden shadow-md group relative">
        <img
          src={listing.img}
          alt={listing.title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-300 ease-in-out"
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full px-3 py-2 text-sm font-semibold">
          {listing.title}
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
      </section>

  
      {/* Offers Section */}
<section className="py-14 ">
  <div className="max-w-6xl mx-auto px-4 ">
    <h2 className="text-2xl font-bold text-slate-800 mb-8">What We Offer</h2>
    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-6 border bg-white rounded-lg shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Buy a Home</h3>
        <p className="text-gray-600 text-sm">
          Find your dream home from our curated listings across cities and budgets.
        </p>
      </div>

      <div className="p-6 border bg-white rounded-lg shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Rent a Property</h3>
        <p className="text-gray-600 text-sm">
          Discover rental options that fit your lifestyle — short or long term.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-white shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Sell Your Property</h3>
        <p className="text-gray-600 text-sm">
          List your property and reach thousands of verified buyers quickly.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-white shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Verified Listings</h3>
        <p className="text-gray-600 text-sm">
          Browse properties with verified ownership and legal clearance.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-white shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Free Consultation</h3>
        <p className="text-gray-600 text-sm">
          Talk to our expert agents for advice on buying, renting, or investing.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-white shadow hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">Market Insights</h3>
        <p className="text-gray-600 text-sm">
          Get updated insights, trends, and prices to make informed decisions.
        </p>
      </div>
    </div>
  </div>
</section>
<footer className="bg-slate-900 text-white py-12 mt-10">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {/* Logo & Description */}
    <div>
      <h2 className="text-xl font-bold mb-4">Sahand Estate</h2>
      <p className="text-gray-300 text-sm">
        Your trusted partner in finding, renting, and selling properties with ease and confidence.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
        <li><Link to="/search" className="hover:text-white transition">Search</Link></li>
        <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
      </ul>
    </div>

    {/* Services */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Services</h3>
      <ul className="space-y-2 text-gray-400 text-sm">
        <li>Buy Property</li>
        <li>Rent Property</li>
        <li>Sell Property</li>
        <li>Consultation</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <p className="text-gray-300 text-sm">Email: info@sahandestate.com</p>
      <p className="text-gray-300 text-sm mt-1">Phone: +92 123 4567890</p>
      <div className="flex gap-4 mt-4">
        <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-facebook"></i></a>
        <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  </div>

  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
    © {new Date().getFullYear()} Sahand Estate. All rights reserved.
  </div>
</footer>

    </div>
  );
}
