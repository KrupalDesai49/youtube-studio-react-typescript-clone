import content_img from "../assets/no_content_illustration_upload_video_v3_darkmode.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UserAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedStatusAtom } from "../context/atom";
import { User } from "firebase/auth";

const Home = () => {

  const navigate = useNavigate();
  const [, setSelectedStatus] = useAtom(selectedStatusAtom);


  const { user } = UserAuth();
  
  // const authContext = UserAuth();
  // const user: User | undefined = authContext?.user;

useEffect(() => {
  
  const handleNavigate =async () => {
      if(await user==null){
        console.log(user, "::",user===null)
  await  navigate('/signup')
  }
  }
  handleNavigate()

    setSelectedStatus('p1')


}, [])


  return (
    // Main Container
    <div className="w-full overflow-scroll no-scrollbar">
      {/* Container */}
      <div className=" mx-5 mt-5 flex flex-col">
        {/* Heading */}
        <h1 className="text-2xl font-[500] ">Channel dashboard</h1>

        {/* Container of Upload & viewer */}
        <div className="flex w-full flex-col-reverse items-center  justify-center py-5 md:flex-row md:items-start md:justify-start md:space-x-7">
          {/* Video Upload Container*/}
          <div className="mt-7 shrink rounded-md border border-[#3e3e3e] bg-[#282828] md:mt-0">
            <div className="m-2 flex h-[25rem] flex-col items-center justify-center rounded-md border border-dashed border-[#3e3e3e] bg-[#282828] lg:px-12 px-3 ">
              {/* Image */}
              <img src={content_img} alt="img" className="-mt-7 w-36" />

              {/* Text */}
              <p className="text-sm text-center text-[#aaaaaa]">
                Want to see metrics on your recent video?
              </p>
              <p className="text-sm text-center text-[#aaaaaa]">
                Upload and publish a video to get started.
              </p>

              {/* Upload Button */}
              <Link
                to="/upload"
                className="mt-5 rounded-sm text-center bg-[#3ea6ff] px-4 py-2 text-sm font-[500] uppercase text-[#0d0d0d]"
                onClick={()=>setSelectedStatus('p3')}
              >
                Upload videos
              </Link>
            </div>
          </div>

          {/* Video Details Container */}
          <div className="flex shrink min-w-60 w-72  flex-col  justify-center rounded-md border border-[#3e3e3e] bg-[#282828] px-5 py-5">
            <p className="text-lg font-[500]"> Channel analytics</p>

            {/* Subscribe Text  */}
            <p className="-ml-3 mt-3 scale-90 text-sm">Current subscribers</p>
            <p className="text-4xl">165</p>

            {/* Views & Likes Container */}
            <div className="mt-16 w-full border-t border-[#3e3e3e]">
              <p className="mt-3 font-[500]">Summary</p>
              <p className="text-xs text-[#909090]">
                {" "}
                Channel Created 3 Days ago
              </p>

              {/* Videos */}
              <div className="mt-3 flex justify-between text-sm">
                <p className="">Videos</p>
                <div className="flex">
                  <p className="">0</p>
                  <p className="ml-3">—</p>
                </div>
              </div>

              {/* Views */}
              <div className="mt-3 flex justify-between text-sm">
                <p className="">Views</p>
                <div className="flex">
                  <p className="">0</p>
                  <p className="ml-3">—</p>
                </div>
              </div>

              {/* Commnents */}
              <div className="mt-3 flex justify-between text-sm">
                <p className="">Comments</p>
                <div className="flex">
                  <p className="">0</p>
                  <p className="ml-3">—</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
