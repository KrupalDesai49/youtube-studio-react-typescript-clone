import logo from "../assets/studio.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import person from "../assets/person.svg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

interface NavbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
 }

const Navbar: React.FC<NavbarProps>  = ({setOpen}) => {
  const { user, logOut }:any = UserAuth();
  const navigate = useNavigate();
  // console.log(user)
  useParams();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleResize = () => {
       if (window.innerWidth > 500) {
        setOpen(true);
       } else {
        setOpen(false);
       }
    };
   
    return () => {    handleResize();    };

   }, []); 


  return (
    <div className={`font-roboto  sticky top-0 z-[100] flex items-center justify-between bg-[#282828] shadow-lg `}>
      {/* Menu */}
      <div className="mx-3 flex items-center sm:mx-5">

        <div className="px-2 cursor-pointer" onClick={()=>setOpen((prevOpen) => !prevOpen)}>
        <svg
          width="64"
          className="w-7 text-[#909090] hover:text-white"
          height="64"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h24M4 16h24M4 24h24"
          />
        </svg>
        </div>

        {/* Logo */}
        <Link to="/" className="">
          <img src={logo} alt="" className="ml-4 w-24 sm:ml-6" />
        </Link>
      </div>
      {/* Search Bar */}
      <div className="mx-3 flex shrink rounded-md  bg-[#262626] text-white ring-1 ring-[#383838] sm:w-[50%] ">

        <svg
          className=" mx-2 w-7 text-[#909090] sm:mx-2 hover:text-white cursor-pointer "
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            d="M23 36c-7.2 0-13-5.8-13-13s5.8-13 13-13s13 5.8 13 13s-5.8 13-13 13m0-24c-6.1 0-11 4.9-11 11s4.9 11 11 11s11-4.9 11-11s-4.9-11-11-11"
          />
          <path
            fill="none"
            stroke="currentColor"
            d="m32.682 31.267l8.98 8.98l-1.414 1.414l-8.98-8.98z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="   w-full focus:outline-none rounded-md bg-[#262626] py-[0.4rem] pl-3   placeholder:text-zinc-500"
        ></input>
      </div>

      {/* Log In & Sign in */}
      {user?.email ? (
        <div className="flex shrink-0 items-center pr-3">
          <div className=" mr-3 h-10 w-10  flex flex-col items-center justify-center">
        {user.photoURL ? (
          <img src={user ? user.photoURL : null} alt="" className="rounded-full" />
        ) : (
          <button className="mr-3 h-10 w-10 rounded-full bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90">
            {user.displayName.charAt(0).toUpperCase()}
          </button>
        )}
      </div>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center justify-center rounded-full border border-[#37a6ff] bg-[#272727] px-3 py-2 text-[#37a6ff]"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center pr-3">
          {/* <Link to="/login">
          <button className="pr-4 text-white">Sign In</button>{" "}
        </Link> */}
          <Link to="/signup">
            <button className=" flex cursor-pointer items-center justify-center rounded-full border border-[#37a6ff] bg-[#272727] px-3 py-2 text-[#37a6ff] hover:bg-[#263850]">
              <img src={person} alt="" className="w-5 " />
              <p className="pl-1.5 text-sm">Sign Up</p>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
