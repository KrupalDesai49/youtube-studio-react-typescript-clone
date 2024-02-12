import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../assets/right_arrow.svg"
import { useAtom } from "jotai";
import { selectedStatusAtom } from "../../context/atom";


type SelectedType = "Video" | "Short";

type VideoUploadProp = {
  selectedType: SelectedType;
  handleTypeChange: (type: SelectedType) => void;
  handleUploadVideoId: (id:string)=>void
};


const VideoUpload = ({ selectedType, handleTypeChange, handleUploadVideoId }: VideoUploadProp) => {
  
  const YOUTUBE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY; 
  const navigate = useNavigate();

  // Regular expression to match YouTube URLs
  const youTubeURLRegex =
    /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^#&?]*).*/;
  // Regular expression to match YouTube Shorts URLs
  const shortYouTubeURLRegex =
    /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/shorts\/(.+)/;

  const [inputURL, setInputURL] = useState("");
  const [linkType, setLinkType] = useState<"standard" | "shorts" | "invalid">(
    "invalid",
  );

  const [, setSelectedStatus] = useAtom(selectedStatusAtom);

  useEffect(() => {
    setSelectedStatus('p3')
  }, [])
  

  const handleClick = () => {
    const getId = extractYouTubeVideoId(inputURL);
    if (getId !== null) {
      // setCanNavigate(true);
      handleUploadVideoId(getId);
      // setLinkType(identifyYouTubeLinkType(inputURL));

      isValidYouTubeVideoId(getId)
        .then((isValid) => {
          if (isValid) {
            if (selectedType === "Video") {
              console.log("The YouTube video ID is valid.");
              navigate("/upload/details");
            } else if (selectedType === "Short") {
              console.log("The YouTube Short ID is valid.");
              ///// TODO - to Store Data in Firebase 
              // navigate("/");

            }
          } else {
            setLinkType("invalid");
            console.log("The YouTube video ID is not valid or does not exist.");
          }
        })
        .catch(console.error);
    } else {
      setLinkType("invalid");

      // Prevent navigation if checkFunction returns false
      // event.preventDefault();
    }
  };

  function extractYouTubeVideoId(url: string): string | null {
    const regExp =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    console.log(match && match[1].length === 11 ? match[1] : null);
    return match && match[1].length === 11 ? match[1] : null;
  }

  async function isValidYouTubeVideoId(videoId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=id&id=${videoId}&key=${YOUTUBE_API_KEY}`,
      );
      const data = await response.json();

      // Check if the video exists by looking at the items array length
      return data.items.length > 0;
    } catch (error) {
      console.error("Error fetching YouTube video details:", error);
      return false;
    }
  }

  const identifyYouTubeLinkType = (
    url: string,
  ): "standard" | "shorts" | "invalid" => {
    if (youTubeURLRegex.test(url)) {
      if (shortYouTubeURLRegex.test(url)) {
        return "shorts";
      } else {
        return "standard";
      }
    }
    return "invalid";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputURL(newValue);
    setLinkType(identifyYouTubeLinkType(newValue));
  };

  return (
    <>
      <div className="no-scrollbar flex w-full flex-col  overflow-y-scroll px-6 py-6">
        {/* Page Name */}
        <div className="text-2xl font-semibold ">
          {selectedType === "Video" ? "Video" : "Short"} Upload
        </div>

        {/* container for Video Details */}
        <div className="flex w-full flex-col pt-20 ">
          {/* Video Type Container */}
          <div className="flex flex-col">
            <p className="text-lg font-[500]">Video Type</p>

            {/* 2 Types*/}
            <div className="flex space-x-5 pt-3">
              {/* VIdeo Type */}
              <button
                onClick={() => {
                  handleTypeChange("Video");
                  setInputURL("");
                }}
                className={`rounded-md px-5 py-2  font-semibold ${selectedType === "Video" ? "bg-[#ff0000]" : " bg-neutral-600"}`}
              >
                Youtube Video
              </button>
              <button
                onClick={() => {
                  handleTypeChange("Short");
                  setInputURL("");
                }}
                className={`rounded-md px-5 py-2  font-semibold ${selectedType === "Short" ? "bg-[#ff0000]" : " bg-neutral-600"}`}
              >
                Youtube Short
              </button>

              {/*  */}
            </div>
          </div>

          {/* Video Link Container */}
          <div className="flex flex-col pt-14">
            <p className="text-lg font-[500]">
              Youtube {selectedType === "Video" ? "Video" : "Short"} Link
            </p>

            {/* */}
            <div className="pt-3">
              <input
                type="text"
                value={inputURL}
                onChange={handleInputChange}
                placeholder={`Add Youtube ${selectedType === "Video" ? "Video" : "Short"} Link Here`}
                className="w-full appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
              />
            </div>
            {/* Link Validated Text*/}
            <div className="mt-1">
              {inputURL === "" && <pre className="font-[500]"> </pre>}
              {linkType === "standard" && inputURL !== "" && (
                <p className="font-[500]">
                  This is a Standard{" "}
                  <span className="text-[#ff0000] ">YouTube Video</span> link.
                </p>
              )}
              {linkType === "shorts" && inputURL !== "" && (
                <p className="font-[500]">
                  This is a Standard{" "}
                  <span className="text-[#ff0000] ">YouTube Short</span> link.
                </p>
              )}
              {linkType === "invalid" && inputURL !== "" && (
                <p className="font-[500]">
                  This is not a valid YouTube link.
                </p>
              )}
            </div>
          </div>

          {/* Next Page Button Container */}
          <div className=" group mt-14 w-fit cursor-pointer">
            <div
              onClick={handleClick}
              className="flex w-fit items-center rounded-md bg-[#ff0000] px-6 py-2  font-semibold"
            >
              <span>
                {selectedType === "Video"
                  ? "Next Page"
                  : "Upload Youtube Short"}
              </span>
              <img src={arrow} alt=""  className="ml-2.5 mt-[0.2rem] w-3.5 transition duration-300 group-hover:rotate-180"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoUpload;
