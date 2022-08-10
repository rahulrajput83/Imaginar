import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FacebookShareButton, FacebookIcon } from 'next-share';
import { TwitterShareButton, TwitterIcon } from 'next-share'
import { LinkedinShareButton, LinkedinIcon } from 'next-share'
import { WhatsappShareButton, WhatsappIcon } from 'next-share'



export default function Share(props) {
  const { open, setOpen } = props;
  const cancelButtonRef = useRef(null)
  const url = window.location.href


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-11/12 relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Share this post
                      </Dialog.Title>
                      <div className="mt-2 flex flex-row">
                        <FacebookShareButton
                          url={url}
                        >
                          <FacebookIcon className='' size={40} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={url}
                        >
                          <TwitterIcon className='ml-2' size={40} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={url}>
                          <LinkedinIcon className='ml-2' size={40} round />
                        </LinkedinShareButton>
                        <WhatsappShareButton
                          url={url}
                          separator=":: "
                        >
                          <WhatsappIcon className='ml-2' size={40} round />
                        </WhatsappShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
