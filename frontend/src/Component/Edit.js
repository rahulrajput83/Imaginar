import React, { useState, Fragment, useCallback, useEffect } from 'react'
import { FaChevronLeft, FaGithub, FaInstagram, FaLink, FaLinkedinIn, FaInfo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoHomeOutline, IoLocationOutline } from "react-icons/io5";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { MdOutlineLanguage } from "react-icons/md";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

const Relationship = ['Single', 'In a relationship', 'Engaged', 'Married', 'In a civil partnership', 'In a domestic partnership', 'In an open relationship', "It's complicated", "Separated", 'Divorced', 'Widowed']


function Edit() {
    const user = useSelector((state) => state.user);
    const [SaveBtn, setSaveBtn] = useState('Save');
    const [newDetails, setNewDetails] = useState({
        _id: user,
        bioData: '',
        currentCity: '',
        homeTown: '',
        selectRelation: '',
        website: '',
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
    })

    const handleChange = (e) => {
        setNewDetails({...newDetails, [e.target.name]: e.target.value})
    }

    const SubmitData = (e) => {
        e.preventDefault();
        setSaveBtn('Saving');
        fetch('http://localhost:2850/editaccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDetails)
        })
            .then(response => response.json())
            .then(response => {
                loadAccount();
                setSaveBtn('Saved');
                setTimeout(() => setSaveBtn('Save'), 2500);
            })
            .catch(err => {
                console.log('err')
            });
    }

    const loadAccount = useCallback(() => {
        fetch('https://imaginar.herokuapp.com/account', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: user })
        })
            .then(response => response.json())
            .then(response => {
                setNewDetails(response.detail);
            })
            .catch(err => {
                console.log('err');
            });
    }, [user])

    useEffect(() => {
        loadAccount()
    }, [loadAccount]);

    return (
        <div className='flex flex-row w-full justify-around items-start'>
            <div className='items-center py-4 relative flex flex-col w-full md:w-8/12 mt-5 rounded shadow-xl shadow-slate-200 mb-10'>
                <Link to={`/users/${user}`} className='cursor-pointer absolute top-0 left-0 ml-6 mt-4'>
                    <FaChevronLeft />
                </Link>
                <div className='w-11/12 flex flex-col mt-10'>
                    <span className='font-medium mb-2 text-[18px]'>Bio</span>
                    <div className='flex items-center'>
                        <span className='font-medium text-sm mx-4'><FaInfo className='text-xl' /></span>
                        <input name='bioData' value={newDetails.bioData} onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Describe who you are' />
                    </div>
                    
                </div>
                <div className='w-11/12 flex justify-center flex-col mt-5'>
                    <span className='font-medium mb-2 text-[18px]'>Customise your Intro</span>
                    <div className='flex items-center'>
                        <span className='font-medium text-sm mx-4'><IoHomeOutline className='text-xl' /></span>
                        <input name='currentCity' value={newDetails.currentCity} onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Current City' />
                    </div>
                    <div className='flex mt-2 items-center'>
                        <span className='font-medium text-sm mx-4'><IoLocationOutline className='text-xl' /></span>
                        <input name='homeTown' value={newDetails.homeTown} onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Home Town' />
                    </div>

                    <Menu as="div" className="relative mt-2 w-full inline-block text-left">
                        <div className='flex items-center'>
                            <span className='font-medium text-sm mx-4'><IoHeartOutline className='text-xl' /></span>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {newDetails.selectRelation}
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-10 origin-top-right absolute right-0 w-64 rounded-md shadow-lg bg-white">
                                <div className="py-1">
                                    {
                                        Relationship.map((item, index) => {
                                            return (
                                                <Menu.Item>
                                                    <div key={index}
                                                        onClick={() => setNewDetails({...newDetails, selectRelation: item })}
                                                        className='cursor-pointer bg-gray-100 text-gray-900 block px-4 py-2 text-sm'
                                                    >
                                                        {item}
                                                    </div>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className='w-11/12 flex justify-center flex-col mt-5'>
                    <span className='font-medium mb-2 text-[18px]'>Social Links</span>
                    <div className='flex items-center'>
                        <span className='font-medium text-sm mx-4'><MdOutlineLanguage className='text-xl' /></span>
                        <input name='website' value={newDetails.website} onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Website' />
                    </div>
                    <div className='mt-2 flex items-center'>
                        <span className='font-medium text-sm mx-4'><FiFacebook className='text-xl' /></span>
                        <input name='facebook' value={newDetails.facebook} onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Facebook Link' />
                    </div>
                    <div className='mt-2 flex items-center'>
                        <span className='font-medium text-sm mx-4'><FiInstagram className='text-xl' /></span>
                        <input value={newDetails.instagram} name='instagram' onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Instagram Link' />
                    </div>
                    <div className='mt-2 flex items-center'>
                        <span className='font-medium text-sm mx-4'><FiTwitter className='text-xl' /></span>
                        <input value={newDetails.twitter} name='twitter' onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Twitter Link' />
                    </div>
                    <div className='mt-2 flex items-center'>
                        <span className='font-medium text-sm mx-4'><FiLinkedin className='text-xl' /></span>
                        <input value={newDetails.linkedin} name='linkedin' onChange={handleChange} className='w-full text-sm py-3 px-4 outline-none bg-slate-100' type='text' placeholder='Linkedin link' />
                    </div>
                </div>

                <div className='w-11/12 mt-6 flex justify-end'>
                    <button onClick={SubmitData} className='px-6 text-white hover:bg-blue-600 py-2 bg-blue-700'>{SaveBtn}</button>
                </div>
            </div>


            <div className='shadow-lg bg-white w-3/12 hidden md:flex shadow-white-800 my-4 rounded-lg p-3 flex flex-col justify-center items-center'>
                <a href="https://github.com/rahulrajput83/Imaginar" target="_blank" rel="noopener noreferrer">
                    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/rahulrajput83/Imaginar?style=for-the-badge" />
                </a>
                <div className='mt-4 uppercase font-bold'>Rahul Rajput</div>
                <div className='text-sm text-slate-500'>Frontend Developer | MERN Developer</div>
                <div className='no-underline flex mb-10 mt-5 flex-row justify-center animate-rotate'>
                    <a href='https://www.linkedin.com/in/rahulrajput83/' className="mx-2.5 hover:animate-spin flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaLinkedinIn />
                    </a>
                    <a href='https://github.com/rahulrajput83' className="mx-2.5 hover:animate-spin flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaGithub />
                    </a>
                    <a href='https://www.instagram.com/rajput_rahul8' className="mx-2.5 hover:animate-spin flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaInstagram />
                    </a>
                    <a href='https://rahulrajput83-portfolio.vercel.app/' className="mx-2.5 hover:animate-spin flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-800 text-white hover:bg-blue-100 hover:text-blue-800 cursor-pointer sm:mx-2.5 sm:h-10 sm:w-10">
                        <FaLink />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Edit;