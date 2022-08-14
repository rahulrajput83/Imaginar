import React from "react";
import { FiEdit2 } from "react-icons/fi";


export default function Update(props) {
    const { showUpdate, editTitle, onTitleChange, confirmUpdate, setShowUpdate } = props

    return (
        <>
            {showUpdate ? (
                <>
                    <div
                        className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-11/12 md:w-1/2">
                            <div className="rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-center p-5">
                                    <div className="mx-2 flex flex-row items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <FiEdit2 className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h3 className="mx-2 text-lg leading-6 font-medium text-gray-900">
                                        Edit Post
                                    </h3>
                                </div>
                                <div className="mt-2 w-full flex justify-center items-center">
                                    <input onChange={onTitleChange} name='fullName' value={editTitle} placeholder='Write Something...' className='text-sm text-black w-11/12 outline-none py-2.5 px-3 bg-slate-100 rounded' type='text' />
                                </div>
                                <div className="rounded-xl bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={confirmUpdate}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-50 text-base font-medium text-blue-800 hover:bg-white sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowUpdate(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}