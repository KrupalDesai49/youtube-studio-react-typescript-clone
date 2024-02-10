import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface VideoDetails {
  title: string;
  description: string;
  thumbnails: string
  // thumbnails: {
  //   default: { url: string };
  //   medium: { url: string };
  //   high: { url: string };
  //   standard: { url: string };
  // };
  duration: string;
}
type VideoUploadDetailsProp = {
  linkId : string
}

const VideoUploadDetails = ({ linkId}:VideoUploadDetailsProp) => {

  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY; 
  const navigate = useNavigate();

const [videoTitle, setVideoTitle] = useState('')
const [videoDescription, setVideoDescription] = useState('')
const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);


useEffect(() => {
  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${linkId}&key=${apiKey}`);
      if (response.data.items && response.data.items.length >  0) {
        const videoInfo = response.data.items[0];
      const snippet = videoInfo.snippet;
      const contentDetails = videoInfo.contentDetails;
      
      const title = snippet.title;
      const description = snippet.description;
      const thumbnails = snippet.thumbnails.standard.url;
      const duration = convertISO8601ToReadableDuration(contentDetails.duration); // You will need to convert this ISO  8601 duration to a human-readable format
    

      setVideoDetails({
        title,
        description,
        thumbnails,
        duration,
      });
      setVideoTitle(title)
      setVideoDescription(description)
      // console.log(videoDetails)
      } else {
        console.error('No items returned from the API');
      }
   
    } catch (error) {
      console.error('Failed to fetch video details:', error);
    }
  };

  
  fetchVideoDetails();
}, []);

function convertISO8601ToReadableDuration(iso8601Duration: string): string {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = iso8601Duration.match(regex);
  let duration = "";

  if (matches && matches.length >  1) {
    if (matches[1]) {
      duration += `${parseInt(matches[1],  10)}:`;
    }
    if (matches[2]) {
      duration += `${parseInt(matches[2],  10)<10 && parseInt(matches[1],  10)?  '0'+parseInt(matches[2],  10):parseInt(matches[2],  10) }:`;
    }
    if (matches[3]) {
      duration += `${parseInt(matches[3],  10)<10 ?  '0'+parseInt(matches[3],  10):parseInt(matches[3],  10) }`;
    }
  }

  return duration || "0:00"; // Default to   0:00 if the duration is empty
}

const handleInputTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const newValue = event.target.value;
  setVideoTitle(newValue);
};
const handleInputDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const newValue = event.target.value;
  setVideoDescription(newValue);
};

  return (
    <>
       <div className="px-6 py-6 flex w-full  flex-col overflow-y-scroll no-scrollbar">
        {/* Page Name */}
        <div className="text-2xl font-semibold ">Video Details</div>

{/* Video Detail container */}
        <div className="pt-14">

          {/* Title */}
            <div className="flex flex-col ">
            <p className="text-xl font-[500]">
            Title
            </p>

            {/* */}
            <div className="pt-3">
              <textarea
                value={videoTitle}
                onChange={handleInputTitleChange}
                rows={2}
                placeholder={`Add Youtube Video Title Here`}
                className="w-full resize-none appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"

              />
            </div>
         
          </div>

          {/* Description */}
            <div className="flex flex-col pt-7">
            <p className="text-xl font-[500]">
            Description
            </p>

            {/* */}
            <div className="pt-3">
              <textarea
                value={videoDescription}
                onChange={handleInputDescriptionChange}
                rows={10}
                placeholder={`Add Youtube Video Description Here`}
                className="w-full resize-none appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
              />
            </div>
         
          </div>

          {/* Submit Button */}
             <div className=" group mt-10 w-fit cursor-pointer">
            <div
              // onClick={handleClick}
              className="flex w-fit items-center rounded-md bg-[#ff0000] px-6 py-2 text-lg font-semibold"
            >
              <span>
             
                  Upload Youtube Video
              </span>
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
  )
}

export default VideoUploadDetails
