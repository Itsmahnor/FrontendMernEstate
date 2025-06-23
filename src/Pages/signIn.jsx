import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isClick,UserExist } from "../Redux/User/userSlice.js";
import OAuth from "../Components/OAuth";
import { useSelector } from "react-redux";


export default function SignIn() {
  const User = useSelector((state) => state.user.User)
 
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  function handleInput(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  // Validate email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Frontend validation
    if (!email || !password) {
      return toast.error("All fields are required!");
    }
    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email.");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
console.log(data.user.avator)
      if (data.success === false) {
        toast.error(data.message || "Invalid credentials");
      } else {
      
   dispatch(UserExist({ User: data.user.username, avator: data.user.avator, id: data.user.id }));

        toast.success("Logged in successfully!");
        navigate("/"); // Redirect to homepage
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleInput}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleInput}
          value={formData.password}
        />
        <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg">
          Sign In
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 items-center">
        <p>Don't have an account?</p>
        <Link to="/signUp">
          <p className="text-slate-700 font-bold text-sm cursor-pointer"
          onClick={() => dispatch(isClick())}>Sign Up</p>
        </Link>
      </div>
    </div>
  );
}
