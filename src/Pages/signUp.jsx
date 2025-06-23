import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isClick,UserExist } from "../Redux/User/userSlice";
import OAuth from "../Components/OAuth";
export default function SignUp() {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: ""
  });

  // Handle Input Change
  function HandleInput(e) {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  }

  // Validate Email Format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Handle Form Submission
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formdata;

    // Validation checks
    if (!username || !email || !password) {
      return toast.error("All fields are required!");
    }
    if (username.length < 3) {
      return toast.error("Username must be at least 3 characters long.");
    }
    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email.");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
console.log(data)
      if (data.success === false) {
        toast.error("Username or email already exists!");
      } else {
          dispatch(UserExist({User:data.username, avator : data.avator}))
        toast.success(data.message || "Sign up successful!");
        navigate("/signIn");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={HandleInput}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={HandleInput}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={HandleInput}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg"
        >
          Sign up
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 items-center">
        <p>Have an account?</p>
        <Link to="/signIn">
         <p
  className="text-slate-700 font-bold text-sm cursor-pointer"
  onClick={() => dispatch(isClick())}
>
  Sign in
</p>

        </Link>
      </div>
    </div>
  );
}
