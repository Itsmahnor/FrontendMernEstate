import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/About"
import SignIn from "./Pages/signIn"
import SignUp from "./Pages/signUp"
import Profile from "./Pages/Profile"
import Header from "./Components/Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileAuth from "./Components/ProfileAuth"
import CreateListing from "./Pages/CreateListing"
import Listing from "./Pages/Listing"
import Search from "./Pages/Search"
export default function App() {
  return (
  
   <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
   <Header />
   <Routes>
    <Route  path="/"  element={<Home />} />
     <Route  path="/about"  element={<About />} />
      <Route  path="/signIn"  element={<SignIn />} />
        <Route  path="/search"  element={<Search />} />
       <Route  path="/listing/:listingid"  element={ <Listing />} />
       <Route  path="/signUp"  element={<SignUp />} />
       <Route path="/profile" element={<ProfileAuth />}>
  <Route index element={<Profile />} />
</Route>
    <Route path="/createlisting" element={<ProfileAuth />}>
  <Route index element={<CreateListing />} />
</Route>
<Route path="/edit/:id" element={<CreateListing />} />

   </Routes>
   </BrowserRouter>
  )
}