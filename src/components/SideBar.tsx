import SideBarContent from "./SideBarContent";
import { UserAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const SideBar = ({ open,setOpen }:any) => {
  const { user }:any = UserAuth();
  let Ids = useLocation();

  return (
    // Container
    <div
      className={`md:sticky z-10 shrink-0  fixed  flex flex-col h-full md:h-auto  bg-neutral-800 ${Ids.pathname == "/signup" || Ids.pathname == "/login" ? "hidden" : null} shadow-lg transition-all duration-200  ${open ? "w-64" : "w-20"} border-r  border-r-neutral-700 `}
    >
      <div className={`md:hidden ${open? 'block':"hidden"} transition-all duration-300 absolute w-screen h-full  backdrop-blur-sm -z-10`}
      onClick={()=>{setOpen(false)}}></div>
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
              className={` transition-all duration-200 ${open ? "mb-2 h-24 w-24" : "mb-0 h-8 w-8 "}  bg-[#ff0000] text-xl font-[500] text-white hover:bg-[#ff0000]/90`}
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
  );
};

export default SideBar;
