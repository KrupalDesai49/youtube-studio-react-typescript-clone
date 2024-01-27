import SideBarContent from "./SideBarContent";
import { UserAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const SideBar = ({ open, setOpen }: any) => {
  const { user }: any = UserAuth();
  let Ids = useLocation();

  return (
    // Container
    <div
      className={`fixed z-10 flex  h-full  shrink-0 flex-col bg-neutral-800 md:sticky  md:h-auto ${Ids.pathname == "/signup" || Ids.pathname == "/login" ? "hidden" : null} shadow-lg transition-all duration-200  ${open ? "w-64" : "w-20"} border-r  border-r-neutral-700 `}
    >
      <div
        className={`md:hidden ${open ? "block" : "hidden"} absolute -z-10 h-full w-screen backdrop-blur-sm  transition-all duration-300`}
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
  );
};

export default SideBar;
