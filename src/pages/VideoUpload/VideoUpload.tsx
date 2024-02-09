import axios, { AxiosResponse } from "axios";
import { useState ,} from "react";
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';


type SelectedType = "Video" | "Short";

type VideoUploadProp = {
  selectedType: SelectedType;
  handleTypeChange: (type: SelectedType) => void;
};

const VideoUpload = ({ selectedType, handleTypeChange }: VideoUploadProp) => {
  const [inputURL, setInputURL] = useState("");
  // const [isValid, setIsValid] = useState(false);

  // // Regular expression to match YouTube URLs
  // const youTubeURLRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^#&?]*).*/;

  // // const youTubeURLRegex =
  //   // /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  // const shortYouTubeURLRegex = /^(http(s)?:\/\/)?youtu.be\/.+/;

  // // Function to validate YouTube URL
  // const isValidYouTubeURL = (url: string): boolean => {
  //   if (youTubeURLRegex.test(url)) {
  //     console.log("Valid YouTubeURL");
  //   }
  //   if (shortYouTubeURLRegex.test(url)) {
  //     console.log("Valid shortYouTubeURL");
  //   }

  //   return youTubeURLRegex.test(url) || shortYouTubeURLRegex.test(url);
  // };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputURL(event.target.value);
  //   setIsValid(isValidYouTubeURL(event.target.value));
  // };
  const navigate = useNavigate ();
  const [canNavigate, setCanNavigate] = useState(false);
  const [linkId, setLinkId] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const getId =extractYouTubeVideoId(inputURL)
    if (getId!== null) {
      setCanNavigate(true);
      navigate('/upload/details');
setLinkId(getId)
      isYouTubeShort(getId)
  .then(({ isShort }) => {
    if (isShort) {
      console.log('The YouTube video is a Shorts video.');
    } else {
      console.log('The YouTube video is not a Shorts video.');
    }
  })
  .catch(console.error);
    } else {
      // Prevent navigation if checkFunction returns false
      event.preventDefault();
    }
  };

  function extractYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    console.log(match && match[1].length ===  11 ? match[1] : null)
    return match && match[1].length ===  11 ? match[1] : null;
  }
  
  interface YouTubeShortCheckResult {
    isShort: boolean;
  }
  
  async function isYouTubeShort(videoId: string): Promise<YouTubeShortCheckResult> {
    try {
      const response: AxiosResponse = await axios.get(`https://www.youtube.com/shorts/${videoId}`);
      return { isShort: response.status ===  200 };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This error is an AxiosError
        if (error.response && error.response.status ===  303) {
          // This means it's not a Shorts video
          return { isShort: false };
        }
      } else if (error instanceof Error) {
        // This error is a generic Error
        console.error(error.message);
      } else {
        // Unknown error, log it to see what it contains
        console.error(error);
      }
      // Throw the error if it's not handled above
      throw error;
    }
  }
  

  return (
    <>
      <div className="mx-6 my-6 flex w-full  flex-col overflow-y-scroll">
        {/* Page Name */}
        <div className="text-2xl font-semibold ">
          {selectedType === "Video" ? "Video" : "Short"} Upload
        </div>

        {/* container for Video Details */}
        <div className="flex w-full flex-col pt-20 ">
          {/* Video Type Container */}
          <div className="flex flex-col">
            <p className="text-xl font-[500]">Video Type</p>

            {/* 2 Types*/}
            <div className="flex space-x-5 pt-3">
              {/* VIdeo Type */}
              <button
                onClick={() => handleTypeChange("Video")}
                className={`rounded-md px-5 py-2 text-lg font-semibold ${selectedType === "Video" ? "bg-[#ff0000]" : " bg-neutral-600"}`}
              >
                Youtube Video
              </button>
              <button
                onClick={() => handleTypeChange("Short")}
                className={`rounded-md px-5 py-2 text-lg font-semibold ${selectedType === "Short" ? "bg-[#ff0000]" : " bg-neutral-600"}`}
              >
                Youtube Short
              </button>

              {/*  */}
            </div>
          </div>

          {/* Video Link Container */}
          <div className="flex flex-col pt-14">
            <p className="text-xl font-[500]">
              Youtube {selectedType === "Video" ? "Video" : "Short"} Link
            </p>

            {/* */}
            <div className="pt-3">
              <input
                type="text"
                value={inputURL}
                onChange={e=>setInputURL(e.target.value)}
                // onChange={handleChange}
                
                placeholder={`Add Youtube ${selectedType === "Video" ? "Video" : "Short"} Link Here`}
                className="w-full appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
              />
            </div>
          </div>

          {/* Next Page Button Container */}
          <div className=" group pt-14"
          >
             <div
        // href="/upload/details"
        onClick={handleClick}
              className="flex w-fit items-center rounded-md bg-[#ff0000] px-6 py-2 text-lg font-semibold"
            >
              <span>Next </span>
              <svg
                className="ml-2.5 mt-[0.2rem] w-3.5 transition duration-300 group-hover:rotate-180"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="m190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3"
                />
              </svg>
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
};

export default VideoUpload;
