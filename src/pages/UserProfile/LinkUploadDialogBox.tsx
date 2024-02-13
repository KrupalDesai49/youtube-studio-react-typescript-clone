import {
  Flex,
  Text,
  Button,
  TextField,
  Dialog,
  
} from "@radix-ui/themes";

type LinkUploadDialogBoxProp = {
  buttonName: string;
  linkOf: string;
  setLink: (link: string) => void;
  handleLink: (
    link: string,
    setLink: (link: string) => void,
  ) => Promise<boolean>;
  link: string;
  isLinkHaveError: boolean | null;
  setIsLinkHaveError:(set:null|boolean)=>void
  notify:(message:string)=>void
  setIsLinkValid:(url:string)=>void
};

const LinkUploadDialogBox = ({
  buttonName,
  linkOf,
  setLink,
  link,
  handleLink,
  isLinkHaveError,
  setIsLinkHaveError,
  notify,
  setIsLinkValid,
}: LinkUploadDialogBoxProp) => {

const checkLinkValidity = () => {
  if(isLinkHaveError){
    notify(`Please provide a valid link to the channel ${linkOf}` )

    
  }
  else{
    setIsLinkValid(link)
  }
}

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className=" cursor-pointer  rounded-md text-sm font-semibold  text-[#3ea6ff]">
            {buttonName}
          </button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }} className="bg-[#262626] ">
          <Dialog.Title weight="medium" className="text-white">
            Update Channel {linkOf}
          </Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text
                as="div"
                size="2"
                mb="1"
                weight="medium"
                className="text-white"
              >
                Photo URL
              </Text>
              <TextField.Input
                className="border border-[#606060] bg-[#262626] text-white  placeholder:text-[#717171]  hover:border-[#909090] focus:border-[#3ea6ff] "
                // defaultValue="Freja Johnsen"
                placeholder={`Enter Here ${linkOf}'s URL`}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              {/* <div className="pt-1 text-xs text-white">
                {isLinkHaveError === null
                  ? <pre> </pre>
                  : !isLinkHaveError
                    ? ""
                    : "This is not a valid link."}
              </div> */}
            </label>
          </Flex>

          <Flex gap="0" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                onClick={() => {setLink(""); setIsLinkHaveError(null)}}
                className="cursor-pointer text-white"
              >
                Cancel
              </Button>
            </Dialog.Close>
      
              <Dialog.Close>
                <Button
                  className="cursor-pointer bg-transparent text-[#3ea6ff]"
                  onClick={async () => {
                   await handleLink(link, setLink);
                   await checkLinkValidity()
                  }}
                >
                  Update
                </Button>
              </Dialog.Close>
           
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default LinkUploadDialogBox;
