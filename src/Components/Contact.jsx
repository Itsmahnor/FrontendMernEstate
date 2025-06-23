import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
 const[landload,setlandload]=useState(null)
 const [message,setmessage] = useState(null)
 const onChange = (e) =>{
    setmessage(e.target.value)
 }
console.log(landload)
 useEffect(()=>{
const fetchLandlord = async ()=>{
    try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data =await  res.json();
        setlandload(data)
    } catch (error) {
        console.log(error)
    }
}
fetchLandlord();
 },[listing.userRef])
    return (
    <div>
      {landload &&(
        <div className='flex flex-col gap-3'>
           
            <p>Contact: <span className='font-semibold'>{landload.username} </span>for 
           
            <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea name='message' id='message' rows={2} 
           value={message}  onChange={onChange} 
           placeholder='Enter your message here... '
           className='w-full border p-3 rounded-lg'>

            </textarea>
        <Link to={`mailto:${landload.email}?subject=Regarding ${listing.name}
            &body=${message}`}
            className='bg-slate-700 text-white 
           text-center p-3 uppercase rounded-lg hover:opacity-95  '>
        Send Message
        </Link>    
        </div>
      )}
    </div>
  )
}
