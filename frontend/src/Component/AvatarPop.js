import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { useSelector } from 'react-redux';


function AvatarPop(props) {
    const { uploadProfile, btnDisable, btnText, profilePreview, showAvatar, setShowAvatar } = props;
    const user = useSelector((state) => state.user);
    const [imageData, setImageData] = useState({
        img: profilePreview,
        id: user,
    });
    const [src] = useState(null)

    const onCrop = (view) => {
        setImageData({ ...imageData, img: view });
    }

    return (
        <>
            {showAvatar ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto w-11/12 md:w-1/2">
                            <div className="rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="px-6 flex justify-center items-center mt-2 w-full pt-4">
                                    <Avatar
                                        width={200}
                                        height={100}
                                        onCrop={onCrop}
                                        label="Select Image"
                                        labelStyle={{ fontSize: '1rem', cursor: 'pointer', width: '100%' }}
                                        src={src}
                                    />
                                </div>
                                <div className="rounded-xl bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        disabled={btnDisable}
                                        type="button"
                                        className="w-full mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => uploadProfile(imageData)}
                                    >
                                        {btnText}
                                    </button>
                                    <button
                                        disabled={btnDisable}
                                        type="button"
                                        className="w-full mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-50 text-base font-medium text-blue-800 hover:bg-white sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowAvatar(false)}
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
    )
}

export default AvatarPop