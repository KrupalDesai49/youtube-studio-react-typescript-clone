import arrow from "../../assets/right_arrow.svg";
import ch_banner from "../../assets/ch_banner.png";
import { UserAuth } from "../../components/AuthContext";

const UserProfile = () => {
  const { user }: any = UserAuth();

  return (
    <>
      <div className="no-scrollbar flex w-full flex-col  overflow-y-scroll px-6 py-6">
        {/* Page Head Line */}
        <div className="flex flex-col justify-between md:flex-row">
          {/* Page Name */}
          <div className="text-2xl font-semibold ">Channel Customization</div>

          {/* Submit Button */}
          <div className=" group mt-5 w-fit cursor-pointer md:mt-0 ">
            <div
              // onClick={handleUploadVideo}
              className="flex w-fit items-center rounded-md bg-[#ff0000] px-6 py-2  font-semibold"
            >
              <span>Update Channel Detail</span>
              <img
                src={arrow}
                alt=""
                className="ml-2.5 mt-[0.2rem] w-3.5 transition duration-300 group-hover:rotate-180"
              />
            </div>
          </div>
        </div>

        {/* CHannel Customization container */}
        <div className="pt-12">
          {/* Channel Name Contianer */}
          <div className="flex flex-col ">
            <p className="text-lg font-[500]">Channel Name</p>

            {/* Edittext */}
            <div className="pt-3">
              <input
                type="text"
                //   value={videoTitle}
                //   onChange={handleInputTitleChange}
                maxLength={50}
                placeholder={`Enter Channel Name Here`}
                className="w-full resize-none appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
              />
            </div>
          </div>

          {/* Channel Description Contianer*/}
          <div className="flex flex-col pt-7">
            <p className="text-lg font-[500]">Channel Description</p>

            {/* Edittext */}
            <div className="pt-3">
              <textarea
                //   value={videoDescription}
                //   onChange={handleInputDescriptionChange}
                maxLength={1000}
                rows={10}
                placeholder={`Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places.`}
                className="w-full resize-none appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
              />
            </div>
          </div>

          {/* Logo Container */}
          <div className="flex flex-col pt-8 ">
            <p className="text-lg font-[500]">Channel Logo</p>

            {/* Logo Customization */}
            <div className="flex flex-row pt-3  ">

              {/* Logo */}
              <div className=" h-fit">
                {user?.displayName &&
                  (user.photoURL ? (
                    <img
                      src={user ? user?.photoURL : null}
                      alt=""
                      className={`w-24 h-24 rounded-full transition-all duration-200`}
                    />
                  ) : (
                    <button
                      className={` h-24 w-24  rounded-full bg-[#ff0000]  text-5xl font-[500]
               text-white transition-all duration-200 hover:bg-[#ff0000]/90 `}
                    >
                      {user?.displayName
                        ? user?.displayName?.charAt(0).toUpperCase()
                        : ""}
                    </button>
                  ))}
              </div>

              {/* Logo Edit Button */}
              <div className=" flex flex-col ml-5  space-y-1.5">
                <p className="text-xs text-[#aaaaaa] lg:w-[60%]">It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the YouTube Community Guidelines. 
</p>
<div className="flex space-x-5">
                <button className=" font-semibold text-[#3ea6ff] text-sm rounded-md  ">Change</button>
                <button className=" font-semibold text-[#3ea6ff] text-sm rounded-md  ">Remove</button>
                </div>
              </div>

            </div>
          </div>

          {/* Banner Container */}
          <div className="flex flex-col pt-9 w-full">
            <p className="text-lg font-[500]">Channel Banner</p>

            {/* Logo Customization */}
            <div className="flex flex-col pt-3 md:flex-row w-full ">

              {/* Logo */}
              <img src={ch_banner} alt="" className=" max-w-96 md:w-72  w-full " />

              {/* Logo Edit Button */}
              <div className=" flex flex-col md:ml-5  space-y-1.5">
                <p className="text-xs text-[#aaaaaa] lg:w-[60%]">For the best results on all devices, use an image that’s at least 2048 x 1152 pixels and 6MB or less. 

</p>
<div className="flex space-x-5">
                <button className=" font-semibold text-[#3ea6ff] text-sm rounded-md  ">Upload</button>
                <button className=" font-semibold text-[#3ea6ff] text-sm rounded-md  ">Remove</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
