type SelectedType = "Video" | "Short"

type VideoUploadDetailsProp = {
  selectedType : SelectedType
}

const VideoUploadDetails = ({selectedType}:VideoUploadDetailsProp) => {
  return (
    <>
       <div className="mx-6 my-6 flex w-full  flex-col">
        {/* Page Name */}
        <div className="text-2xl font-semibold ">Video</div>

        </div>
    </>
  )
}

export default VideoUploadDetails
