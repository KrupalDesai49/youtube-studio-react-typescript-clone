// Modal.tsx

import { useState } from "react";
import { Flex, Text, Button,TextField, Dialog} from '@radix-ui/themes';

interface ModalType {
  isOpen?: boolean;
  toggle?: () => void;
  title?: string;
  subText?: string;
  setLink?: (link: string) => void;
}

export default function Modal({
  title,
  subText,
  isOpen,
  toggle,
  setLink,
}: ModalType) {
  const [linkValue, setLinkValue] = useState("");
  return (
    <>
      {isOpen && (
<>
       
   
     <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-[#262626] text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle w-full">
              <div className="bg-[#262626]  w-full">
                <div className="shrink sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <h3
                      className="text-lg font-medium leading-6 text-white"
                      id="modal-title"
                    >
                      Update Your Channel {title}
                    </h3>
                    <div className="mt-4 w-full">
                      <input
                        type="text"
                        value={linkValue}
                        onChange={(e) => setLinkValue(e.target.value)}
                        maxLength={50}
                        placeholder={`Enter Channel Name Here`}
                        className="w-full resize-none appearance-none rounded-md border border-[#606060] bg-transparent px-4 py-2 outline-none placeholder:text-[#717171] hover:border-[#909090] focus:border-[#3ea6ff] lg:w-[60%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#262626] px-4 pb-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#ff0000] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggle}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent text-[#3ea6ff] px-2 py-2 text-base font-medium shadow-sm focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggle}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
           )}
  );
}
