import React from 'react'

function ComingSoon() {

    return (
        <div className='shadow-lg bg-white w-full shadow-white-800 my-4 rounded-lg p-3 flex flex-col justify-center items-center'>
            <ul className='mt-5 mb-9 list-disc w-10/12 font-medium text-base uppercase'>
                <div className='mb-5 font-bold text-center'>Coming Soon</div>
                <li className='text-sm normal-case font-normal'>Like Post</li>
                <li className='text-sm normal-case font-normal'>Bookmark Post</li>
                <li className='text-sm normal-case font-normal'>Upload Private Posts</li>
                <li className='text-sm normal-case font-normal'>Customize Account</li>
                <li className='text-sm normal-case font-normal'>And Much More</li>
            </ul>
        </div>
    )
}


export default ComingSoon;