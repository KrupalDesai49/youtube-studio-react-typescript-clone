import SideBarContent from "./SideBarContent";
import { UserAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SideBar = ({ open, setOpen }: any) => {
  const { user }: any = UserAuth();
  let Ids = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () =>{
    setWindowWidth(window.innerWidth)
    console.log(windowWidth)
   
  }


  useEffect(() => {
    window.addEventListener("resize", handleResize)
  if(windowWidth> 768){
      setOpen(true);
    } else {
      setOpen(false);
    }
  
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [windowWidth])
  

  return (
    <>
    {/* spacing */}

    <div className="sticky  bg-white/0 w-[5.1rem] md:hidden shrink-0 "></div>

    {/*  Container */}
    <div
      className={`absolute md:sticky z-10 flex  h-full md:h-auto md:  shrink-0 flex-col bg-neutral-800 ${Ids.pathname == "/signup" || Ids.pathname == "/login" ? "hidden" : null} shadow-lg transition-all duration-200  ${open ? "w-64" : "w-20"} border-r  border-r-neutral-700 `}
    >
      <div
        className={`md:hidden ${open ? "block  " : "hidden"} absolute -z-10 h-full w-screen    backdrop-blur-sm  transition-all duration-300`}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      {/* User's Logo */}
      <div className="flex flex-col items-center justify-center py-3">
        {user?.displayName &&
          (user.photoURL ? (
            <img
              src={user ? user?.photoURL : null}
              alt=""
              className={`rounded-full transition-all duration-200 ${open ? "mb-2 h-24 w-24" : "mb-0 h-8 w-8"}`}
            />
          ) : (
            <button
              className={` rounded-full bg-[#ff0000] font-[500]  text-white transition-all  duration-200 hover:bg-[#ff0000]/90
               ${open ? "mb-2 h-24 w-24 text-5xl" : "mb-0 h-8 w-8 text-xl "} `}
            >
              {user?.displayName
                ? user?.displayName?.charAt(0).toUpperCase()
                : ""}
            </button>
          ))}
        <p
          className={`duration-50 text-sm font-[500] tracking-wide text-white transition-all  ${open ? "" : "hidden"}`}
        >
          Your Channel
        </p>
        <p
          className={`duration-50 text-xs text-[#909090] transition-all ${open ? "" : "hidden"}`}
        >
          {user?.displayName}
        </p>
      </div>

      <SideBarContent open={open} />
    </div>
    </>
  );
};

export default SideBar;
