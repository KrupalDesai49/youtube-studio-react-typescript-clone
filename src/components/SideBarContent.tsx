
import dash from "../assets/dashboard.svg";
import dash_fill from "../assets/dashboard_fill.svg";
import content from "../assets/content.svg";
import content_fill from "../assets/content_fill.svg";
import upload from "../assets/upload.svg";
import upload_fill from "../assets/upload_fill.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBarContent = ({ open }:any) => {
  const [selectedStatus, setSelectedStatus] = useState("p1");

  const handleRadioChange = (event:any) => {
    setSelectedStatus(event);
  };

  return (
    <div>
      <div className={`   flex  flex-1  flex-col text-white `}>
        {/* Item 1 */}
        <Link 
        to='/'
          id="p1"
          onClick={() => handleRadioChange("p1")}
          className={` relative flex items-center border-l-4 py-3 transition-all duration-200 hover:bg-[#1f1f1f]    ${selectedStatus === "p1" ? "border-[#ff4e45] bg-[#1f1f1f]" : "border-[#282828] hover:border-[#1f1f1f]"}`}
        >
          <img
            src={dash}
            alt="dashboard"
            className={`peer ml-[1.35rem] w-7 cursor-pointer  ${selectedStatus === "p1" ? "hidden" : "block"}`}
          />
          <img
            src={dash_fill}
            alt="dashboard"
            className={`peer ml-[1.35rem] w-7 cursor-pointer ${selectedStatus === "p1" ? "block" : "hidden"}`}
          />
          {!open && (
            <div className="absolute top-[4.2rem] z-10 scale-0 rounded-md bg-neutral-600 px-2 py-1 text-xs  transition-all duration-200 peer-hover:scale-95">
              Dashboard
            </div>
          )}
          <p
            className={` cursor-pointer text-sm font-[500] tracking-wide transition-all duration-100 ease-linear  ${selectedStatus === "p1" ? "text-[#ff4e45] " : "text-[#a6aaaa]"}  ml-5 ${open ? "scale-100" : "text-xs  opacity-0 "}`}
          >
            Dashboard
          </p>
        </Link>

        {/* Item 2 */}
        <Link
        to='/content'
          id="p2"
          onClick={() => handleRadioChange("p2")}
          className={`relative flex items-center border-l-4 py-3 transition-all duration-200 hover:bg-[#1f1f1f]     ${selectedStatus === "p2" ? "border-[#ff4e45] bg-[#1f1f1f]" : "border-[#282828] hover:border-[#1f1f1f]"}`}
        >
          <img
            src={content}
            alt="dashboard"
            className={`peer ml-[1.35rem] w-7 cursor-pointer  ${selectedStatus === "p2" ? "hidden" : "block"} `}
          />
          <img
            src={content_fill}
            alt="dashboard"
            className={`peer ml-[1.35rem] w-7 cursor-pointer ${selectedStatus === "p2" ? "block" : "hidden"}`}
          />
          {!open && (
            <div className="absolute left-2 top-[4.2rem] z-10 scale-0 rounded-md bg-neutral-600 px-2 py-1 text-xs  transition-all duration-200 peer-hover:scale-95">
              Content
            </div>
          )}
          <p
            className={` cursor-pointer text-sm font-[500]  tracking-wide transition-all duration-100 ease-linear  ${selectedStatus === "p2" ? "text-[#ff4e45] " : "text-[#a6aaaa]"}  ml-5 ${open ? "scale-100" : "text-xs  opacity-0 "}`}
          >
            Content
          </p>
        </Link>

        {/* Item 3 */}
        <Link
        to='/upload'
          id="p3"
          onClick={() => handleRadioChange("p3")}
          className={`relative flex items-center border-l-4 py-3 transition-all duration-200 hover:bg-[#1f1f1f]     ${selectedStatus === "p3" ? "border-[#ff4e45] bg-[#1f1f1f]" : "border-[#282828] hover:border-[#1f1f1f]"}`}
        >
          <img
            src={upload}
            alt="dashboard"
            className={`peer ml-[1.35rem] w-7 cursor-pointer  ${selectedStatus === "p3" ? "hidden" : "block"} `}
          />
          <img
            src={upload_fill}
            alt="dashboard"
            className={`peer ml-[1.35rem] w-7 cursor-pointer ${selectedStatus === "p3" ? "block" : "hidden"}`}
          />
          {!open && (
            <div className="absolute left-2 top-[4.2rem] z-10 scale-0 rounded-md bg-neutral-600 px-2 py-1 text-xs  transition-all duration-200 peer-hover:scale-95">
              Video Upload
            </div>
          )}
          <p
            className={` cursor-pointer text-sm font-[500]  tracking-wide transition-all duration-100 ease-linear  ${selectedStatus === "p3" ? "text-[#ff4e45] " : "text-[#a6aaaa]"}  ml-5 ${open ? "scale-100" : "text-xs  opacity-0 "}`}
          >
            Video Upload
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SideBarContent;
