import React from 'react';
import { FaCamera } from 'react-icons/fa'


function Camera(props) {
    const { setShowAvatar } = props;

    return (
        <>
            <div onClick={() => setShowAvatar(true)} className="absolute cursor-pointer right-0 bottom-0 flex flex-row items-center justify-center h-9 w-9 rounded-full bg-gray-300">
                <FaCamera className="h-4 w-4 text-slate-800" />
            </div>
            
        </>
    )
}

export default Camera;