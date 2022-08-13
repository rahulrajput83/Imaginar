import React, { useEffect, useState, Fragment, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import profilelogo from '../Images/profile.svg';
import { Dialog, Transition, Menu } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { FaChevronLeft, FaGlobeAsia, FaRegCalendar } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs'
import { FiEdit2, FiTrash2 } from "react-icons/fi";


function Profile() {
    const dispatch = useDispatch();
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const [account, setAccount] = useState({});
    let navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const cancelButtonRef = useRef(null)
    const [deleteId, setDeleteId] = useState('');
    const [editId, setEditId] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [alertMeassage, setAlertMessage] = useState('');
    const [error, setError] = useState(false);
    const [isInput, setIsInput] = useState(false);

    useEffect(() => {
        setLoading(true);
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
                setLoading(false)
                setAccount(response.detail)
                let current = response.detail.Joined;
                setTime(new Date(current).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }))
            })
            .catch(err => {
                setLoading(false)
            });
    }, [user]);

    const loadPost = useCallback(() => {
        fetch('https://imaginar.herokuapp.com/userpost', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: user })
        })
            .then(response => response.json())
            .then(response => {
                const reverse = response.value.reverse();
                setData(reverse);
            })
            .catch(err => {
                console.log('Something went wrong');
            });
    }, [user])


    useEffect(() => {
        setLoading(true);
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
        setIsInput(true);
        setOpen(true)
    }
    const onTitleChange = (e) => {
        setEditTitle(e.target.value)
    }
    const deleteOpen = (id) => {
        setIsInput(false);
        setOpen(true);
        setDeleteId(id);
    }

    const confirmUpdate = () => {
        setOpen(false);
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
        setOpen(false);
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

    return (
        <div className='my-4 p-3 flex flex-col md:flex-row justify-evenly items-start'>
            {
                error ? <div className='z-40 animate-alert absolute top-5 right-3 rounded-lg text-white p-3 w-2/3 md:w-1/3 bg-blue-700'>
                    {alertMeassage}
                </div> : null
            }
            <div className='shadow-lg flex flex-col items-center justify-start bg-white shadow-white-800 rounded-lg w-full md:w-3/12 relative'>
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
                                account ? <><img className='mt-10 w-24 h-24' src={profilelogo} alt='profile' />
                                    <div className='mt-5 font-medium text-base uppercase'>{account.fullName}</div>
                                    <div className='mt-3 text-slate-400 text-xs'>{account.email}</div>
                                    <div className='mt-1 text-slate-400 text-xs'>Joined on : {time}</div>
                                    <button onClick={handleLogout} className='mt-8 mb-3 text-white bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 inline-flex items-center'>Logout</button>
                                </> : <span>Something went wrong, please try again...</span>
                            }

                        </>
                }
            </div>
            <div className='md:px-4 my-10 md:my-0 mx-0 flex flex-col items-center justify-start bg-white w-full md:w-7/12'>
                <div className='font-medium uppercase text-blue-800'>
                    Posts
                </div>
                <div className='h-0.5 my-1 bg-blue-800 w-full '>
                </div>
                {data.length !== 0 ?
                    <div className='mt-4 w-full flex flex-col justify-center items-center '>
                        {
                            data.map((data, index) => {
                                return (
                                    <div key={index} className='w-full relative'>
                                        <Link to={`/posts/${data._id}`} className='rounded-lg shadow-lg bg-white mt-5 pt-3 w-full flex flex-col'>
                                            <div className='flex flex-row items-center'>
                                                <img className='ml-3 w-8 h-8 mr-4' src={profilelogo} alt='profile' />
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


                                            <div className='px-3 w-full py-2 break-all text-sm'>{data.title}</div>
                                            {
                                                data.img ? <div className='flex flex-row w-full h-48 md:h-96 bg-white justify-center overflow-hidden items-center'>
                                                    <img className='object-cover cursor-pointer h-full w-full bg-white' src={data.img} alt={data.title} />
                                                </div> : null
                                            }
                                        </Link>
                                        {/* <FaTrash className='cursor-pointer text-slate-800 hover:text-slate-500 absolute top-10 right-6' /> */}
                                        <div className='cursor-pointer text-slate-800 hover:text-slate-500 absolute top-2 right-2'>

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
                                                    <Menu.Items className="origin-top-right absolute right-0 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                <div onClick={() => editOpen(data._id, data.title)}
                                                                    href="jjbb"
                                                                    className='inline-flex hover:bg-gray-100 items-center w-full px-4 py-2 font-medium text-gray-700 hover:text-black text-sm'
                                                                >
                                                                    <FiEdit2 className='mr-2 h-4 w-4' />
                                                                    Edit
                                                                </div>
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
                                                            {
                                                                isInput ?
                                                                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                            <div className="sm:flex sm:items-start">
                                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                                                        Edit Post
                                                                                    </Dialog.Title>
                                                                                    <div className="mt-2 w-full">
                                                                                        <input onChange={onTitleChange} name='fullName' value={editTitle} placeholder='Write Something...' className='text-sm w-80 outline-none py-2.5 px-3 bg-slate-100 rounded' type='text' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                                            <button
                                                                                type="button"
                                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                                                onClick={confirmUpdate}
                                                                            >
                                                                                Update
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-50 text-base font-medium text-blue-800 hover:bg-white sm:ml-3 sm:w-auto sm:text-sm"
                                                                                onClick={() => setOpen(false)}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                    :
                                                                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                            <div className="sm:flex sm:items-start">
                                                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                                    <ExclamationIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                                                                </div>
                                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                                                        Delete Post
                                                                                    </Dialog.Title>
                                                                                    <div className="mt-2">
                                                                                        <p className="text-sm text-gray-500">
                                                                                            Are you sure you want to delete this post ? This action cannot be undone.
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                                            <button
                                                                                type="button"
                                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                                                onClick={confirmDelete}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-50 text-base font-medium text-blue-800 hover:bg-white sm:ml-3 sm:w-auto sm:text-sm"
                                                                                onClick={() => setOpen(false)}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                            }
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </Transition.Root>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <span className='text-black text-center mt-6 w-full'>No Post Found</span>
                }
            </div>

        </div>

    )
}


export default Profile;