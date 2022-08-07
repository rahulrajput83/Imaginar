import React from 'react'
import { FaGithub, FaInstagram, FaLink, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        <div className='absolute bottom-0 py-2.5 px-2 md:px-5 flex flex-row justify-between items-center bg-blue-800 w-full'>
            <div className='text-sm text-white font-bold'>
                © 2022 RAHUL RAJPUT
            </div>
            <div className='no-underline flex flex-row justify-center'>
                <a href='https://www.linkedin.com/in/rahulrajput83/' className="mx-1.5 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer">
                    <FaLinkedinIn />
                </a>
                <a href='https://github.com/rahulrajput83' className="mx-1.5 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer">
                    <FaGithub />
                </a>
                <a href='https://www.instagram.com/rajput_rahul8' className="mx-1.5 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer">
                    <FaInstagram />
                </a>
                <a href='https://rahulrajput83-portfolio.vercel.app/' className="mx-1.5 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer">
                    <FaLink />
                </a>
            </div>
    </div >
  )
}

export default Footer;