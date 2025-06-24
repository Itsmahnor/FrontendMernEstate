import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CreateListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    bedrooms: 1,
    regularPrice: 1,
    discountPrice: 1,
    type: '',
    parking: false,
    furnished: false,
    offer: false,
  });

useEffect(() => {
  const fetchListing = async () => {
    try {
      const res = await axios.get(`https://backendmernestate-production.up.railway.app/api/listing/single/${id}`, {
        withCredentials: true,
      });
      setFormData(res.data);
     
      setUploadedImages(res.data.imageUrls.map((url) => ({ url, name: url })));
    } catch (err) {
      console.log(err);
    }
  };

  fetchListing();
}, [id]);


  const handleUpload = async () => {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('images', files[i]);
    }
    try {
      const res = await axios.post('https://backendmernestate-production.up.railway.app/api/upload', form);
   setUploadedImages((prev) => [...prev, ...res.data.images]);

      setFiles([]);
    } catch (err) {
      toast.error('Image upload failed');
    }
  };

  const handleDeleteImage = (filename) => {
    setUploadedImages((prev) => prev.filter((img) => img.name !== filename));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const listingData = {
    ...formData,
    imageUrls: uploadedImages.map((img) => img.url),
    userRef: userId,
  };

  try {
    let res;

    if (id) {
      // Update existing listing
      res = await axios.put(
        `https://backendmernestate-production.up.railway.app/api/listing/update/${id}`,
        listingData,
        { withCredentials: true }
      );
      toast.success('Listing updated successfully!');
      navigate(`/listing/${id}`);
    } else {
      // Create new listing
      res = await axios.post(
        'https://backendmernestate-production.up.railway.app/api/listing/create',
        listingData,
        { withCredentials: true }
      );
      toast.success('Listing created successfully!');
      navigate(`/listing/${res.data._id}`);
    }

  } catch (err) {
    const errData = err.response?.data;

    // Show generic or custom message
    toast.error(errData?.message || 'Something went wrong');

    // Show field-specific validation errors if present
    if (errData?.errors && Array.isArray(errData.errors)) {
      errData.errors.forEach((errorMsg) => toast.error(errorMsg));
    }

    console.log('❌ Backend error:', errData);
  }
};


  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>{id ? 'Edit' : 'Create'} a Listing</h1>
      <form className='flex gap-4 flex-col sm:flex-row' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' required placeholder='Name' className='border p-3 rounded-lg'
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <textarea required placeholder='Description' className='border p-3 rounded-lg'
            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type='text' required placeholder='Address' className='border p-3 rounded-lg'
            value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

          <div className='flex gap-5 flex-wrap'>
            <label><input type='checkbox' checked={formData.type === 'sale'}
              onChange={() => setFormData({ ...formData, type: 'sale' })} /> Sell</label>
            <label><input type='checkbox' checked={formData.type === 'rent'}
              onChange={() => setFormData({ ...formData, type: 'rent' })} /> Rent</label>
            <label><input type='checkbox' checked={formData.parking}
              onChange={(e) => setFormData({ ...formData, parking: e.target.checked })} /> Parking</label>
            <label><input type='checkbox' checked={formData.furnished}
              onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })} /> Furnished</label>
            <label><input type='checkbox' checked={formData.offer}
              onChange={(e) => setFormData({ ...formData, offer: e.target.checked })} /> Offer</label>
          </div>

          <div className='flex flex-wrap gap-6'>
            <div><input type='number' min='1' value={formData.bedrooms} className='border p-3 rounded-lg'
              onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })} /> Beds</div>
            <div><input type='number' min='1' value={formData.regularPrice} className='border p-3 rounded-lg'
              onChange={(e) => setFormData({ ...formData, regularPrice: Number(e.target.value) })} /> Regular Price</div>
            <div><input type='number' min='1' value={formData.discountPrice} className='border p-3 rounded-lg'
              onChange={(e) => setFormData({ ...formData, discountPrice: Number(e.target.value) })} /> Discount Price</div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images (max 6)</p>
          <div className='flex gap-4'>
            <input type='file' accept='image/*' multiple
              onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 6))} />
            <button type='button' onClick={handleUpload} disabled={files.length === 0} className='text-green-700'>Upload</button>
          </div>
          <div className='flex flex-wrap gap-4'>
            {uploadedImages.map((img, i) => (
              <div key={i} className='relative w-24 h-24'>
                <img src={img.url || formData.imageUrls} alt=''  className='w-full h-full object-cover rounded' />
                <button type='button' onClick={() => handleDeleteImage(img.name)} className='absolute top-0 right-0 bg-red-600 text-white px-1 rounded'>X</button>
              </div>
            ))}
          </div>
          <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg'>
            {id ?<Link to={`/listing/${id}`}>Update Listing</Link>  : 'Create Listing'}
          </button>
        </div>
      </form>
    </main>
  );
}
