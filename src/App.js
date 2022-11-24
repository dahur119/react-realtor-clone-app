import { BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import CreateListing from "./Pages/CreateListing";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import ForgetPassword from "./Pages/ForgetPassword";
import Offer from "./Pages/Offer";
import Listing from "./Pages/Listing";
import PrivateRoute from "./Component/privateRoute";
import Header from "./Component/Header";
import { ToastContainer } from "react-toastify";
import EditListing from "./Pages/EditListing";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (

    <>
    <Router> 
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/profile" element={<PrivateRoute />}> 
            <Route path="/profile" element={<Profile />} />
          </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
       
        <Route path="/forgot-password" element={<ForgetPassword/>}/>
        <Route path="/offer" element={<Offer/>}/>
        <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
         
        <Route path="/create-listing" element={<PrivateRoute />}>   
        <Route path="/create-listing" element={<CreateListing />}/>
        </Route>

        <Route path="/edit-listing" element={<PrivateRoute />}>   
        <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
        </Route>
        
      </Routes>
    </Router>
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    


    </>

  //   <h1 class="text-4xl font-bold underline">
  //   Hello world!
  // </h1>
    
    
    
  )
}

export default App;
