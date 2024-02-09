import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type SelectedType = "Video" | "Short";

type VideoUploadProp = {
  selectedType: SelectedType;
  handleTypeChange: (type: SelectedType) => void;
};

const VideoUpload = ({ selectedType, handleTypeChange }: VideoUploadProp) => {
  const YOUTUBE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY; // Replace with your actual API key

  const navigate = useNavigate();
  // Regular expression to match YouTube URLs
  const youTubeURLRegex =
    /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^#&?]*).*/;
  // Regular expression to match YouTube Shorts URLs
  const shortYouTubeURLRegex =
    /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/shorts\/(.+)/;

  const [inputURL, setInputURL] = useState("");
  const [validText, setValidText] = useState("");
  const [linkType, setLinkType] = useState<"standard" | "shorts" | "invalid">("invalid");
  const [linkId, setLinkId] = useState("");

  useEffect(() => {
    if (inputURL === "") {
      setValidText("<pre> </pre>");
    } else if (linkType === "standard") {
      setValidText(
        'This is a Standard <span style={{ color: "#ff0000" }}>YouTube Video</span> link.',
      );
    } else if (linkType === "shorts") {
      setValidText(
        'This is a Standard <span className="text-[#ff0000]">YouTube Shorts</span> link.',
      );
    } else if (linkType === "invalid") {
      setValidText("This is not a valid YouTube link.");
    }
  }, [inputURL]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const getId = extractYouTubeVideoId(inputURL);
    if (getId !== null) {
      // setCanNavigate(true);
      setLinkId(getId);
      // setLinkType(identifyYouTubeLinkType(inputURL));

      isValidYouTubeVideoId(getId)
        .then((isValid) => {
          if (isValid) {
            console.log("The YouTube video ID is valid.");
            navigate("/upload/details");
          } else {
            setLinkType("invalid");
            console.log("The YouTube video ID is not valid or does not exist.");
          }
        })
        .catch(console.error);
    } else {
      setLinkType("invalid");

      // Prevent navigation if checkFunction returns false
      event.preventDefault();
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
                onClick={() => {
                  handleTypeChange("Video");
                  setInputURL("");
                }}
                className={`rounded-md px-5 py-2 text-lg font-semibold ${selectedType === "Video" ? "bg-[#ff0000]" : " bg-neutral-600"}`}
              >
                Youtube Video
              </button>
              <button
                onClick={() => {
                  handleTypeChange("Short");
                  setInputURL("");
                }}
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
                onChange={handleInputChange}
                placeholder={`Add Youtube ${selectedType === "Video" ? "Video" : "Short"} Link Here`}
                className="w-full appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
              />
            </div>
            <p dangerouslySetInnerHTML={{ __html: validText }} />
            {/* {linkType === 'standard' && <p>This is a standard YouTube video link.</p>}
      {linkType === 'shorts' && <p>This is a YouTube Shorts link.</p>}
      {linkType === 'invalid' && <p>This is not a valid YouTube link.</p>} */}
          </div>

          {/* Next Page Button Container */}
          <div className=" group mt-14 cursor-pointer">
            <div
              onClick={handleClick}
              className="flex w-fit items-center rounded-md bg-[#ff0000] px-6 py-2 text-lg font-semibold"
            >
              <span>
                {selectedType === "Video"
                  ? "Next Page"
                  : "Upload Youtube Short"}{" "}
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
  );
};

export default VideoUpload;
