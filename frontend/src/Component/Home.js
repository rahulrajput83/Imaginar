import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import profilelogo from '../Images/profile.svg'
import { IoIosImages, IoIosSend, IoMdClose, IoMdRefreshCircle } from "react-icons/io";
import { FaRegCalendar, FaGlobeAsia } from "react-icons/fa";
import { useSelector } from 'react-redux';
import ComingSoon from './ComingSoon';


function Home() {
    const fullName = useSelector((state) => state.fullName);
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [Data, setData] = useState([]);
    const inputRef = useRef(null);
    const [preview, setPreview] = useState('')
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [postData, setPostData] = useState({
        img: preview,
        title: '',
        author: user,
        authorName: fullName
    });

    const handleImageChange = (e) => {
        let file = e.target.files[0];
        setFileToBase(file);
        e.target.value = ''
    }
    const setFileToBase = (file) => {
        if (!file) {
            alert('Please select an image');
        }
        else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPostData({ ...postData, img: reader.result });
                setPreview(reader.result)
            }
        }
    }

    const deleteImg = () => {
        setPreview('');
        setPostData({ ...postData, img: '' })
    }

    const handleInputCLick = () => {
        inputRef.current.click();
    }
    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        if (postData.title === '' && postData.img === '') {
            setError(true);
            setErrorMessage('Please add text or image first...')
            setTimeout(() => setError(false), 2500);
        }
        else {
            setError(true);
            setErrorMessage('Posting...')
            setTimeout(() => setError(false), 2500);
            setSubmitDisabled(true);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(response => response.json())
                .then(response => {
                    setSubmitDisabled(false)
                    loadData();
                    setPostData({
                        img: '',
                        title: '',
                        author: user,
                        authorName: fullName
                    });
                    setPreview('');
                    setError(true);
                    setErrorMessage('Posted...')
                    setTimeout(() => setError(false), 2500);
                })
                .catch(err => {
                    setSubmitDisabled(false)
                    setError(true);
                    setErrorMessage('Something went wrong...')
                    setTimeout(() => setError(false), 2500);
                });
        }

    }
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                setData(response.value.reverse())
            })
            .catch(err => {
                setError(true);
                setErrorMessage('Something went wrong...')
                setTimeout(() => setError(false), 2500);
            });
    }

    return (
        <div className='flex flex-col w-full'>
            {
                error ? <div className='animate-alert absolute top-5 right-3 rounded-lg text-white p-3 w-2/3 md:w-1/3 bg-blue-700'>
                    {errorMessage}
                </div> : null
            }

            <div className='flex mb-4 shadow-lg shadow-white-800 flex-row w-full px-3 md:px-6 py-4 items-center justify-between'>
                <Link to='/'>
                    <div className='font-bold uppercase text-xl md:text-2xl'>imaginar</div>
                </Link>
                <Link to={`/users/${user}`}>
                    <button className='text-blue-700 bg-blue-100 hover:bg-blue-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>Account</button>
                </Link>
            </div>
            <div className='w-full h-full bg-white p-1 md:px-2 flex flex-col md:flex-row justify-between items-start'>
                <div className='hidden md:block w-11/12 md:w-80'>
                    <ComingSoon />
                </div>
                <div className='md:px-5 w-full md:w-7/12 my-4 flex flex-col'>
                    <div className='mx-2 md:mx-0 shadow-lg md:p-4 p-2 shadow-white-800 bg-white rounded-lg flex flex-col justify-center items-center'>
                        <div className='flex flex-row w-full justify-center items-center'>
                            <input value={postData.title} onChange={handleChange} name='title' placeholder='Enter Something here...' className='placeholder-gray-500 text-sm w-full bg-transparent outline-none py-2.5 px-1 md:px-3' type='text' />
                            <IoIosImages onClick={handleInputCLick} className='cursor-pointer w-10 h-10 md:w-8 md:h-8 text-blue-800 hover:text-blue-600 mr-4' />
                            <input name='img' ref={inputRef} type='file' className='hidden' accept='image/*' onChange={handleImageChange} />
                            <button disabled={submitDisabled} onClick={handleSubmit} className='text-white bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed font-medium rounded-3xl text-sm px-2 py-2 text-center mr-2 inline-flex items-center'><IoIosSend /></button>
                            <IoMdRefreshCircle onClick={loadData} className='cursor-pointer w-12 h-12 md:w-10 md:h-10 text-blue-800 hover:text-blue-600 mr-1' />
                        </div>
                    </div>
                    {
                        preview ? <div className='rounded-lg shadow-lg bg-white relative flex flex-col mt-3 w-full h-48 md:h-96 justify-center overflow-hidden items-end'>
                            <img className='bg-white w-full h-full object-cover' src={preview} alt='' />
                            <IoMdClose onClick={deleteImg} className='top-0 absolute cursor-pointer w-7 h-7' />
                        </div> : null
                    }
                    {
                        loading ? <>
                            <div className='mt-10 w-full flex flex-col justify-center items-center'>
                                <svg role="status" className="inline mr-3 w-10 h-10 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                            </div>
                        </>
                            : null
                    }
                    <div className='mt-4 w-full flex flex-col justify-center items-center '>
                        {
                            Data.map((data, index) => {
                                return (
                                    <div key={index} className='rounded-lg shadow-lg mt-5 pt-3 w-full pb-0 bg-white flex flex-col'>
                                        <div className='flex flex-row items-center'>
                                            <img className='ml-3 w-8 h-8 mr-4' src={profilelogo} alt='profile' />
                                            <div className='flex flex-col justify-center items-center'>
                                                <div className='w-full text-left text-sm'><Link to={`/users/${data.author}`} className='font-medium text-blue-800 mr-1 text-left'>{data.authorName}</Link>has added an post.</div>
                                                <div className='w-full flex flex-row justify-start items-start'>
                                                    <div className='text-xs text-slate-400 mr-3 flex justify-center items-center'><FaRegCalendar className='mr-1' />
                                                        {new Date(data.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}
                                                    </div>
                                                    <div className='text-xs text-slate-400 flex justify-center items-center'><FaGlobeAsia className='mr-1' />{data.visibility}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={`/posts/${data._id}`} className='w-full'>
                                            <div className='px-3 w-full py-2 text-justify break-all text-sm'>{data.title}</div>
                                            {
                                                data.img ? <div className='flex flex-row w-full h-48 md:h-96 bg-white justify-center overflow-hidden items-center'>
                                                    <img className='object-cover cursor-pointer h-full w-full bg-white' src={data.img} alt={data.title} />
                                                </div> : null
                                            }
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='shadow-lg text-slate-300 bg-white w-80 h-80 hidden md:flex shadow-white-800 my-4 rounded-lg p-3 flex-col justify-center items-center'>
                    Advertisement Here
                </div>
            </div>

        </div>
    )
}

export default Home