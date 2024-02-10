import { useState } from "react"
import { useNavigate } from "react-router-dom"

type SelectedType = "Video" | "Short"

type VideoUploadDetailsProp = {
  selectedType : SelectedType
  linkId : string
}

const VideoUploadDetails = ({selectedType, linkId}:VideoUploadDetailsProp) => {

  const YOUTUBE_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY; 
  const navigate = useNavigate();

const [videoTitle, setVideoTitle] = useState('')
const [videoDescription, setVideoDescription] = useState('')

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
