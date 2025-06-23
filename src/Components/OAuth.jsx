import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UserExist } from "../Redux/User/userSlice";

export default function OAuth() {
  const navigate = useNavigate();
const dispatch = useDispatch();
  async function HandleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();  
      const auth = getAuth(app);

    
      const result = await signInWithPopup(auth, provider);
       const res = await fetch('/api/auth/google', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: result.user.displayName,email: result.user.email, 
          photo: result.user.avator
        })})
        console.log(result.user.photoURL)
         const data = await res.json();
console.log(data)
      if (data.success) {
          dispatch(UserExist({
  User: data.user.username,
  avator: data.user.avator,
  id: data.user.id,
}));

        toast.success('Google sign-in successful!');
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed!');
      }
    
    } catch (error) {
      console.error("Could not sign in with Google", error);
      toast.error("Google sign-in failed!");
    }
  }

  return (
    <div>
      <button
        type="button"
        className="bg-red-600 w-full text-white p-3 rounded-lg uppercase hover:opacity-90"
        onClick={HandleGoogleClick}
      >
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
}
