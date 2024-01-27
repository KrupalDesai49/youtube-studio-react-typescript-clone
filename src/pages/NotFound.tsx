import { Link } from "react-router-dom";
import not_found from "../assets/error_illustration.svg";


const NotFound = () => {
    return (
        <div className="m-auto flex flex-col items-center justify-center text-white ">
          <img src={not_found} alt="" className="w-48" />
          <p className="mb-7 mt-2 text-2xl">Oops, something went wrong.</p>
          <Link to="/">
            <button className="mb-10 flex cursor-pointer items-center justify-center rounded-full border border-[#263850] bg-[#0e161f] px-3 py-2 text-[#37a6ff] hover:bg-[#263850]">
              <p className="text-sm font-semibold ">GO TO HOME </p>
            </button>
          </Link>
        
        </div>
      )
}

export default NotFound