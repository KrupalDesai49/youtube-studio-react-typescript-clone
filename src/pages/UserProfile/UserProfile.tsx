import arrow from "../../assets/right_arrow.svg";
import ch_banner from "../../assets/ch_banner.png";
import { UserAuth } from "../../components/AuthContext";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../context/firebase";
import LinkUploadDialogBox from "./LinkUploadDialogBox";

type UserDataType = {
  id: string;
  displayName: string;
  description:  string;
  logo_link:  string;
  banner_link: string;
  channelID: string;
  tick: boolean;
  subscribers: number;
  timestamp: string;
  isLogInByGoogle: boolean;
};

const UserProfile = () => {
  const { user }: any = UserAuth();

  const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [logoLink, setLogoLink] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  // const [isLogoDialogoBoxOpen, setIsLogoDialogBoxOpen] = useState(true);
  // const [isBannerDialogBoxOpen, setIsBannerDialogBoxOpen] = useState(false);

  useEffect(() => {
    // Check if user and user.email are defined
    if (user && user.email) {
      const docRef = doc(db, "user", user.email);
      const getData = async () => {
        try {
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            const userData: UserDataType = {
              ...docSnapshot.data(),
              id: docSnapshot.id,
            } as UserDataType;
            setUserData(userData);

            //   console.log(userData);
            setChannelName(userData.displayName);
            if (userData.description !== null)
              return setChannelDescription(userData.description);
            setIsDataAvailable(true);
          } else {
            console.log("No such document!");
            // Handle the case where the document does not exist
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      getData();
    }
  }, [user]);

  useEffect(() => {
    const handleData = async () => {
      if (userData?.displayName) {
        const isUpdated =
          userData?.displayName !== channelName ||
          userData?.description !== channelDescription ||
          userData?.logo_link !== logoLink ||
          userData?.banner_link !== bannerLink

        console.log(isUpdated);
        if (isUpdated) return setIsDataUpdated(true);

        setIsDataUpdated(false);
      }
    };
    handleData();
  }, [isDataAvailable, channelName, channelDescription,logoLink,bannerLink]);

  
  const handleLink = async (link: string) => {
    try {
      const response = await fetch(link, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');
      const imageExtensions = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml','image/bmp','image/ico','image/tiff','image/apng','image/avif'];
  
      // Check if Content-Type is one of the accepted image types
      const isImage = contentType && imageExtensions.includes(contentType);
      // console.log("Validation result:yesssssss:: ", isImage);
      return isImage;
    } catch (error) {
      console.error('Failed to validate image URL:::', error);
      // console.log("Nooooooooo::")

      return false;
    }
  };
  

  

 


  return (
    <>
      <div className="no-scrollbar flex w-full flex-col  overflow-y-scroll px-6 py-6  ">
        {/* Page Head Line */}
        <div className="flex flex-col justify-between md:flex-row sticky flex-1  w-full">
          {/* Page Name */}
          <div className="text-2xl font-semibold ">Channel Customization</div>

          {/* Submit Button */}
          <div className=" group mt-5 w-fit cursor-pointer md:mt-0 ">
            <div
              // onClick={handleUploadVideo}
              className={`flex w-fit items-center rounded-md  px-6 py-2  font-semibold ${isDataUpdated ? "bg-[#ff0000]" : "bg-[#606060]"}`}
            >
              <span>Publish</span>
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
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
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
                value={channelDescription || ""}
                onChange={(e) => setChannelDescription(e.target.value)}
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
              <div className="shrink-0">
                {user?.displayName &&
                  (user.photoURL ? (
                    <img
                      src={user ? user?.photoURL : null}
                      alt=""
                      className={`h-24 w-24 shrink-0 rounded-full transition-all duration-200`}
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
              <div className=" ml-5 flex flex-col  space-y-1.5">
                <p className="text-xs text-[#aaaaaa] lg:w-[60%]">
                  It’s recommended to use a picture that’s at least 98 x 98
                  pixels and 4MB or less. Use a PNG or GIF (no animations) file.
                  Make sure your picture follows the YouTube Community
                  Guidelines.
                </p>
                <div className="flex space-x-5 ">
                  {/* LOGO Change Button */}
                  <div className="">
                    <LinkUploadDialogBox buttonName="Change" linkOf="Logo" link={logoLink} setLink={setLogoLink} handleLink={handleLink} />
                   
                  </div>
                  {/* LOGO Remove Button */}
                  <button className=" cursor-pointer rounded-md text-sm font-semibold mt-[0.1rem]  text-[#3ea6ff]">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Container */}
          <div className="flex w-full flex-col pt-9">
            <p className="text-lg font-[500]">Channel Banner</p>

            {/* Logo Customization */}
            <div className="flex w-full flex-col pt-3 md:flex-row ">
              {/* Logo */}
              <img
                src={ch_banner}
                alt=""
                className=" w-full max-w-96  md:w-72 "
              />

              {/* Logo Edit Button */}
              <div className=" flex flex-col space-y-1.5  md:ml-5">
                <p className="text-xs text-[#aaaaaa] lg:w-[60%]">
                  For the best results on all devices, use an image that’s at
                  least 2048 x 1152 pixels and 6MB or less.
                </p>
                <div className="flex space-x-5">
                <LinkUploadDialogBox buttonName="Upload" linkOf="Banner" link={bannerLink} setLink={setBannerLink} />

                  <button className=" rounded-md text-sm font-semibold text-[#3ea6ff]  ">
                    Remove
                  </button>
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
