import React from 'react'
import { FaGithub, FaInstagram, FaLink, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className='w-full h-full flex items-center flex-col'>
            <div className='flex rounded shadow-lg shadow-white-800 flex-row w-full px-3 md:px-6 py-4 items-center justify-between'>
                <Link to='/'>
                    <div className='font-bold uppercase text-xl md:text-2xl'>imaginar</div>
                </Link>
                <Link to='/signin'>
                    <div className='text-blue-700 bg-slate-100 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>Login</div>
                </Link>
            </div>
            <div className='shadow-lg bg-white w-full md:w-1/2  shadow-white-800 my-4 rounded-lg p-3 flex flex-col justify-center items-center'>
                <div className='mt-4 uppercase font-bold'>Rahul Rajput</div>
                <div className='text-sm text-slate-500'>Frontend Developer</div>
                <div className='no-underline flex mb-10 mt-5 flex-row justify-center'>
                    <a href='https://www.linkedin.com/in/rahulrajput83/' className="mx-2.5 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaLinkedinIn />
                    </a>
                    <a href='https://github.com/rahulrajput83' className="mx-2.5 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaGithub />
                    </a>
                    <a href='https://www.instagram.com/rajput_rahul8' className="mx-2.5 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaInstagram />
                    </a>
                    <a href='https://rahulrajput83-portfolio.vercel.app/' className="mx-2.5 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaLink />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;