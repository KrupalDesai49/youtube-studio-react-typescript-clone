import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../assets/right_arrow.svg"

import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../context/firebase";
import { selectedStatusAtom } from "../../context/atom";
import { useAtom } from "jotai";

interface VideoDetails {
  title: string;
  description: string;
  thumbnails: string;
  duration: string;
}
type VideoUploadDetailsProp = {
  linkId: string;
};

const VideoUploadDetails = ({ linkId }: VideoUploadDetailsProp) => {
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
  const navigate = useNavigate();

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails >({} as VideoDetails);

  const [, setSelectedStatus] = useAtom(selectedStatusAtom);


  useEffect(() => {
    setSelectedStatus('p3')

    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${linkId}&key=${apiKey}`,
        );
        if (response.data.items && response.data.items.length > 0) {
          const videoInfo = response.data.items[0];
          const snippet = videoInfo.snippet;
          const contentDetails = videoInfo.contentDetails;

          const title = snippet.title;
          const description = snippet.description;
          const thumbnails = snippet.thumbnails.standard.url;
          const duration = convertISO8601ToReadableDuration(
            contentDetails.duration,
          ); // You will need to convert this ISO  8601 duration to a human-readable format

          setVideoDetails({
            title,
            description,
            thumbnails,
            duration,
          });
          setVideoTitle(title);
          setVideoDescription(description);
          // console.log(videoDetails)
        } else {
          console.error("No items returned from the API");
        }
      } catch (error) {
        console.error("Failed to fetch video details:", error);
      }
    };

    fetchVideoDetails();
  }, []);

  function convertISO8601ToReadableDuration(iso8601Duration: string): string {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = iso8601Duration.match(regex);
    let duration = "";

    if (matches && matches.length > 1) {
      if (matches[1]) {
        duration += `${parseInt(matches[1], 10)}:`;
      }
      if (matches[2]) {
        duration += `${parseInt(matches[2], 10) < 10 && parseInt(matches[1], 10) ? "0" + parseInt(matches[2], 10) : parseInt(matches[2], 10)}:`;
      }
      if (matches[3]) {
        duration += `${parseInt(matches[3], 10) < 10 ? "0" + parseInt(matches[3], 10) : parseInt(matches[3], 10)}`;
      }
    }

    return duration || "0:00"; // Default to   0:00 if the duration is empty
  }

  const handleInputTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setVideoTitle(newValue);
  };
  const handleInputDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;
    setVideoDescription(newValue);
  };

  const handleUploadVideo = async () =>{

    try{
      // await addDoc(
      //   collection(db, "ytvideo2" ),
      //   videoDetails,
      // );

    }catch (e){
      console.log("Upload Video Data Error!!",e)
    }
  }

  return (
    <>
      <div className="no-scrollbar flex w-full flex-col  overflow-y-scroll px-6 py-6">
        {/* Page Name */}
        <div className="text-2xl font-semibold ">Video Details</div>

        {/* Video Detail container */}
        <div className="pt-12">

          {/* Title */}
          <div className="flex flex-col ">
            <p className="text-lg font-[500]">Title</p>

            {/* Edittext */}
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
            <p className="text-lg font-[500]">Description</p>

            {/* Edittext */}
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
              onClick={handleUploadVideo}
              className="flex w-fit items-center rounded-md bg-[#ff0000] px-6 py-2  font-semibold"
            >
              <span>Upload Youtube Video</span>
              <img src={arrow} alt=""  className="ml-2.5 mt-[0.2rem] w-3.5 transition duration-300 group-hover:rotate-180"/>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default VideoUploadDetails;
