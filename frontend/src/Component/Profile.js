import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import profilelogo from '../Images/profile.svg';
import { Transition, Menu } from '@headlessui/react'
import { FaChevronLeft, FaGlobeAsia, FaRegCalendar } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs'
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Update from './Update';
import Delete from './Delete';
import { MdOutlineEmail, MdDateRange } from "react-icons/md";
import Camera from './Camera';
import AvatarPop from './AvatarPop';



function Profile() {
    const [showAvatar, setShowAvatar] = useState(false)
    let { unique } = useParams();
    const dispatch = useDispatch();
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const [account, setAccount] = useState({});
    let navigate = useNavigate();
    const [data, setData] = useState([])
    const [deleteId, setDeleteId] = useState('');
    const [editId, setEditId] = useState('');
    const [editTitle, setEditTitle] = useState(' ');
    const [alertMeassage, setAlertMessage] = useState('');
    const [error, setError] = useState(false);
    const [showUpdate, setShowUpdate] = React.useState(false);
    const [showDelete, setShowDelete] = React.useState(false);
    const [profilePreview, setProfilePreview] = useState(profilelogo)
    const [btnText, setBtnText] = useState('Upload')
    const [btnDisable, setBtnDisable] = useState(false)


    const loadAccount = useCallback(() => {
        fetch('https://imaginar.herokuapp.com/account', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: unique })
        })
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                setAccount(response.detail)
                let current = response.detail.Joined;
                setTime(new Date(current).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }))
            })
            .catch(err => {
                setLoading(false)
            });
    }, [unique])
    
    

    const loadPost = useCallback(() => {
        fetch('https://imaginar.herokuapp.com/userpost', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: unique })
        })
            .then(response => response.json())
            .then(response => {
                const reverse = response.value.reverse();
                setData(reverse);
            })
            .catch(err => {
                console.log('Something went wrong');
            });
    }, [unique])

    useEffect(() => {
        setLoading(true);
        loadAccount()
    }, [loadAccount]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    const handleLogout = () => {
        let action = {
            type: "LOGOUT",
            payload: ''
        };
        dispatch(action);
        navigate('/signin');
    }

    const editOpen = (id, title) => {
        setEditId(id);
        setEditTitle(title);
        setShowUpdate(true)
    }
    const onTitleChange = (e) => {
        setEditTitle(e.target.value)
    }
    const deleteOpen = (id) => {
        setShowDelete(true);
        setDeleteId(id);
    }

    const confirmUpdate = () => {
        setShowUpdate(false);
        setAlertMessage('Updating...');
        setError(true);
        setTimeout(() => setError(false), 2500);
        fetch('https://imaginar.herokuapp.com/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editId, title: editTitle })
        })
            .then(response => response.json())
            .then(response => {
                loadPost();
                setAlertMessage(response.message);
                setError(true);
                setTimeout(() => setError(false), 2500);
            })
            .catch(err => {
                console.log('Error, Please try again... ')
            });
    }


    const confirmDelete = () => {
        setShowDelete(false);
        setAlertMessage('Deleting...');
        setError(true);
        setTimeout(() => setError(false), 2500);
        fetch('https://imaginar.herokuapp.com/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: deleteId })
        })
            .then(response => response.json())
            .then(response => {
                loadPost();
                setAlertMessage(response.message);
                setError(true);
                setTimeout(() => setError(false), 2500);
            })
            .catch(err => {
                console.log('Error, Please try again... ')
            });
    }

    const uploadProfile = (imageData) => {
        setBtnDisable(true);
        setBtnText('Uploading, Please wait...')
        fetch('https://imaginar.herokuapp.com/profileimg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(imageData)
        })
            .then(response => response.json())
            .then(response => {
                loadAccount();
                loadPost();
                if (response.message === 'Uploaded...') {
                    setProfilePreview(imageData.img)
                }
                setShowAvatar(false)
                setBtnText('Upload');
                setBtnDisable(false);
            })
            .catch(err => {
                setBtnText('Upload');
                setBtnDisable(false);
                console.log('Error, Please try again... ')
            });
    }

    return (
        <div className='flex overflow-y-visible w-full flex-col justify-start items-start'>

            <div className='flex mb-4 shadow-lg shadow-white-800 flex-row w-full px-3 md:px-6 py-4 items-center justify-between'>
                <Link to='/'>
                    <div className='font-bold uppercase text-xl md:text-2xl'>imaginar</div>
                </Link>
                {
                    unique === user ?
                        <button onClick={handleLogout} className='text-white bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 inline-flex items-center'>Logout</button>
                        :
                        null
                }
            </div>
            <div className='my-4 p-3 flex w-full flex-col md:flex-row justify-evenly items-start'>

                {
                    error ? <div className='z-40 animate-alert absolute top-5 right-3 rounded-lg text-white p-3 w-2/3 md:w-1/3 bg-blue-700'>
                        {alertMeassage}
                    </div> : null
                }
                <div className='shadow-lg flex flex-col items-center justify-start bg-white shadow-white-800 rounded-lg w-full md:w-4/12 relative'>
                    <Link to='/' className='cursor-pointer absolute top-0 left-0 ml-6 mt-4'>
                        <FaChevronLeft />
                    </Link>

                    {
                        loading ? <>
                            <svg role="status" className="inline mr-3 w-10 h-10 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </>
                            :
                            <>
                                {
                                    account ? <>
                                        {
                                            unique === user ?
                                                <Link to='/edit' className='cursor-pointer absolute top-0 right-5 mt-2'>
                                                    <button className='text-white bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-6 py-2 text-center mr-2 inline-flex items-center'>Edit</button>
                                                </Link>
                                                : null
                                        }
                                        <div className='translate-y-8 my-10 justify-center items-center flex flex-row relative'>
                                            {
                                                account.profileImg !== 'Not Added Yet' ?
                                                    <img className='w-24 border-blue-800' src={account.profileImg} alt='' />
                                                    :
                                                    <img className='w-24 border-blue-800' src={profilePreview} alt='' />
                                            }

                                            {
                                                unique === user ?
                                                    <Camera setShowAvatar={setShowAvatar} showAvatar={showAvatar} />
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className='mt-4 w-full text-center font-bold text-xl uppercase'>{account.fullName}</div>
                                        <div className='mt-6 flex flex-col w-full items-center'>
                                            {
                                                unique === user ?
                                                    <div className='w-11/12 flex justify-start items-center'>
                                                        <div className="flex flex-row items-center justify-center h-10 w-10 rounded-full bg-gray-300 sm:mx-0 sm:h-10 sm:w-10">
                                                            <MdOutlineEmail className="h-5 w-5 text-slate-800" />
                                                        </div>
                                                        <span className='ml-2 text-sm text-black'>
                                                            {account.email}
                                                        </span>
                                                    </div>
                                                    : null
                                            }
                                            <div className='mt-2 mb-6 w-11/12 flex justify-start items-center'>
                                                <div className="flex flex-row items-center justify-center h-10 w-10 rounded-full bg-gray-300 sm:mx-0 sm:h-10 sm:w-10">
                                                    <MdDateRange className="h-5 w-5 text-slate-800" />
                                                </div>
                                                <span className='ml-2 text-sm text-black'>
                                                    Joined on : {time}
                                                </span>
                                            </div>
                                        </div>
                                    </> : <span>Something went wrong, please try again...</span>
                                }

                            </>
                    }
                </div>
                <div className='md:px-4 my-10 md:my-0 mx-0 flex flex-col items-center justify-start bg-white w-full md:w-6/12'>
                    <div className='font-medium uppercase text-blue-800'>
                        Posts
                    </div>
                    <div className='h-0.5 my-1 bg-blue-800 w-full '>
                    </div>
                    {data.length !== 0 ?
                        <div className='mt-4 w-full h-full flex flex-col justify-center items-center '>
                            {
                                data.map((data, index) => {
                                    return (
                                        <div key={index} className='h-fit w-full relative'>
                                            <Link to={`/posts/${data._id}`} className='rounded-lg shadow-lg bg-white mt-5 pt-3 w-full flex flex-col'>
                                                <div className='flex flex-row items-center'>
                                                    {
                                                        account.profileImg !== 'Not Added Yet' ?
                                                            <img className='ml-3 w-8 h-8 mr-4' src={account.profileImg} alt='profile' />
                                                            :
                                                            <img className='ml-3 w-8 h-8 mr-4' src={profilelogo} alt='profile' />
                                                    }

                                                    <div className='flex flex-col justify-center items-center'>
                                                        <div className='w-full text-left text-sm'><span className='font-medium text-blue-800 mr-1 text-left'>{data.authorName}</span>has added an post.</div>
                                                        <div className='w-full flex flex-row justify-start items-start'>
                                                            <div className='text-xs text-slate-400 mr-3 flex justify-center items-center'><FaRegCalendar className='mr-1' />
                                                                {new Date(data.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}
                                                            </div>
                                                            <div className='text-xs text-slate-400 flex justify-center items-center'><FaGlobeAsia className='mr-1' />{data.visibility}</div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className='px-3 w-full h-fit py-2 break-all text-sm'>{data.title}</div>
                                                {
                                                    data.img ? <div className='flex flex-row w-full h-48 md:h-96 bg-white justify-center overflow-hidden items-center'>
                                                        <img className='object-cover cursor-pointer h-full w-full bg-white' src={data.img} alt={data.title} />
                                                    </div> : null
                                                }
                                            </Link>

                                            <div className='flex p-2 text-blue-800 flex-row justify-center items-center'>
                                                <Update editTitle={editTitle} confirmUpdate={confirmUpdate} onTitleChange={onTitleChange} showUpdate={showUpdate} setShowUpdate={setShowUpdate} />
                                                <Delete confirmDelete={confirmDelete} showDelete={showDelete} setShowDelete={setShowDelete} />
                                                <AvatarPop uploadProfile={uploadProfile} btnDisable={btnDisable} setBtnDisable={setBtnDisable} btnText={btnText} setBtnText={setBtnText} showAvatar={showAvatar} setShowAvatar={setShowAvatar} profilePreview={profilePreview} setProfilePreview={setProfilePreview} />
                                            </div>

                                            {
                                                unique === user ?
                                                    <div className='cursor-pointer text-slate-800 hover:text-slate-500 absolute top-6 right-2'>

                                                        <Menu as="div" className="relative inline-block text-left">
                                                            <div>
                                                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-black">
                                                                    <BsThreeDots className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                                                <Menu.Items className="origin-top-right z-10 absolute right-0 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        <Menu.Item>
                                                                            <button onClick={() => editOpen(data._id, data.title)}
                                                                                className='inline-flex hover:bg-gray-100 items-center w-full px-4 py-2 font-medium text-gray-700 hover:text-black text-sm'
                                                                            >
                                                                                <FiEdit2 className='mr-2 h-4 w-4' />
                                                                                Edit
                                                                            </button>
                                                                        </Menu.Item>
                                                                    </div>
                                                                    <Menu.Item>
                                                                        <div
                                                                            onClick={() => deleteOpen(data._id)}
                                                                            className='inline-flex hover:bg-gray-100 items-center w-full px-4 py-2 font-medium text-gray-700 hover:text-black text-sm'
                                                                        >
                                                                            <FiTrash2 className='mr-2 h-4 w-4' />
                                                                            Delete
                                                                        </div>

                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>
                                                    : null
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                    }
                </div>

            </div>
        </div>

    )
}


export default Profile;