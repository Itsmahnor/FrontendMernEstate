import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSidebardata((prev) => ({ ...prev, searchTerm: searchTermFromUrl }));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = new URLSearchParams();
        Object.entries(sidebardata).forEach(([key, value]) => {
          if (
            (typeof value === 'string' && value !== '' && value !== 'all') ||
            (typeof value === 'boolean' && value === true)
          ) {
            params.append(key, value);
          }
        });

        const res = await fetch(`/api/listing/get?${params.toString()}`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, [sidebardata]);

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (type === 'checkbox') {
      setSidebardata((prev) => ({ ...prev, [id]: checked }));
    } else if (type === 'select-one') {
      if (id === 'sort_order') {
        if (value === 'Price high to low') {
          setSidebardata((prev) => ({ ...prev, sort: 'price', order: 'desc' }));
        } else if (value === 'Price low to high') {
          setSidebardata((prev) => ({ ...prev, sort: 'price', order: 'asc' }));
        } else if (value === 'latest') {
          setSidebardata((prev) => ({ ...prev, sort: 'createdAt', order: 'desc' }));
        } else if (value === 'Oldest') {
          setSidebardata((prev) => ({ ...prev, sort: 'createdAt', order: 'asc' }));
        }
      }
    } else {
      setSidebardata((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(sidebardata).forEach(([key, value]) => {
      if (
        (typeof value === 'string' && value !== '' && value !== 'all') ||
        (typeof value === 'boolean' && value === true)
      ) {
        params.append(key, value);
      }
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              onChange={handleChange}
              value={sidebardata.searchTerm}
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
            />
          </div>

          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            {['all', 'rent', 'sale'].map((typeVal) => (
              <div key={typeVal} className='flex gap-2 items-center'>
                <input
                  type='radio'
                  name='type'
                  id={typeVal}
                  checked={sidebardata.type === typeVal}
                  onChange={() => setSidebardata({ ...sidebardata, type: typeVal })}
                />
                <span className='capitalize'>{typeVal}</span>
              </div>
            ))}
          </div>

          <div className='flex gap-4 flex-wrap items-center'>
            <label className='font-semibold'>Filters:</label>
            {['offer', 'parking', 'furnished'].map((filter) => (
              <div key={filter} className='flex gap-2 items-center'>
                <input
                  type='checkbox'
                  id={filter}
                  onChange={handleChange}
                  checked={sidebardata[filter]}
                  className='w-5'
                />
                <span className='capitalize'>{filter}</span>
              </div>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select id='sort_order' onChange={handleChange} className='border rounded-lg p-3'>
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>

      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 my-7'>
          Listing results:
        </h1>
      {listings.length > 0 ? (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
    {listings.map((listing) => (
      <div key={listing._id} className='border bg-white rounded-lg p-4 shadow-md'>
        {listing.imageUrls && listing.imageUrls.length > 0 && (
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className='w-full h-48 object-cover rounded-md mb-3'
          />
        )}
        <h2 className='text-lg font-bold'>{listing.name}</h2>
        <p>{listing.description}</p>
        <p className='text-sm text-gray-500'>Type: {listing.type}</p>
        <p className='text-sm text-gray-500'>Price: Rs {listing.regularPrice}</p>
      </div>
    ))}
  </div>
) : (
  <p className='text-gray-600 p-3'>No listings found</p>
)}


      </div>
    </div>
  );
}
