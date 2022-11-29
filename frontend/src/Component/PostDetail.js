import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import profilelogo from '../Images/profile.svg'
import { FaRegCommentAlt, FaShare, FaRegCalendar, FaGlobeAsia, FaLinkedinIn, FaGithub, FaInstagram, FaLink, } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { BiSend } from "react-icons/bi";
import Share from './Share';

function PostDetail() {
    const { uniqueid } = useParams();
    const fullName = useSelector((state) => state.fullName);
    const user = useSelector((state) => state.user);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false)
    const [alertMeassage, setAlertMessage] = useState('Failed to load post.')
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentLength, setCommentLength] = useState('')
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({
        postid: uniqueid,
        title: '',
        author: user,
        authorName: fullName
    })
    const handleChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    }
    const handleSubmit = () => {
        if (!newComment.title) {
            setError(true);
            setAlertMessage('Enter Comment...');
            setTimeout(() => setError(false), 2500);
        }
        else {
            setError(true);
            setAlertMessage('Posting ...')
            setTimeout(() => setError(false), 2500);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/postComment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
                .then(response => response.json())
                .then(response => {
                    loadComments();
                    setError(true);
                    setAlertMessage(response.message);
                    setTimeout(() => setError(false), 2500);
                })
                .catch(err => {
                    setError(true);
                    setAlertMessage('Something went wrong...')
                    setTimeout(() => setError(false), 2500);
                });
            setNewComment({
                postid: uniqueid,
                title: '',
                author: user,
                authorName: fullName
            });
        }

    }

    const loadComments = useCallback(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/comments`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                let findCommentLength = 0
                let LoadingComments = response.comments.filter(value => value.postId === uniqueid);
                LoadingComments = [...LoadingComments].reverse();
                setComments(LoadingComments);
                findCommentLength = LoadingComments.length;
                setCommentLength(findCommentLength);
            })
    }, [uniqueid]);

    const loadData = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/postdetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: uniqueid })
        })
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                setData(response.value)
            })
            .catch(err => {
                setError(true);
                setAlertMessage('Something went wrong...')
                setTimeout(() => setError(false), 2500);
            });
    }, [uniqueid])
    useEffect(() => {
        loadData();
        loadComments();
    }, [loadData, loadComments])


    return (
        <div className='w-full h-full flex items-center flex-col'>
            <div className='flex rounded shadow-lg shadow-white-800 flex-row w-full px-3 md:px-6 py-4 items-center justify-between'>
                <Link to='/'>
                    <div className='font-bold uppercase text-xl md:text-2xl'>imaginar</div>
                </Link>
                <div className='flex flex-row mr-2'>
                    <Link to='/about'>
                        <div className='mr-2 text-blue-700 bg-slate-100 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>About Me</div>
                    </Link>
                    {
                        user ? null : <Link to='/signin'>
                            <div className='text-blue-700 bg-slate-100 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Login</div>
                        </Link>
                    }
                </div>
            </div>
            {
                error ? <div className='animate-alert absolute top-5 right-3 rounded-lg text-white p-3 w-2/3 md:w-1/3 bg-blue-700'>
                    {alertMeassage}
                </div> : null
            }
            <div className='flex flex-row w-full justify-around items-start'>
                <div className='shadow-lg bg-white w-80 hidden md:flex shadow-white-800 my-4 rounded-lg p-3 flex-col justify-center items-center'>
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
                {
                    loading ? <>
                        <div className='mt-10 w-full md:w-5/12 flex flex-col justify-center items-center'>
                            <svg role="status" className="inline mr-3 w-10 h-10 text-blue-500 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div>
                    </>
                        :
                        <div className='items-center flex flex-col w-full md:w-5/12 mt-5 rounded shadow-xl shadow-slate-200 mb-10'>
                            <div className='pt-3 w-full bg-white flex flex-col'>
                                {
                                    data !== null && data !== undefined ?
                                        <>
                                            <div className='flex flex-row items-center'>
                                                <img className='ml-3 w-8 h-8 mr-4' src={profilelogo} alt='profile' />
                                                <div className='flex flex-col justify-center items-center'>
                                                    <div className='w-full text-left text-sm'><span className='font-medium text-blue-800 mr-1'>{data.authorName}</span>has added an post.</div>
                                                    <div className='w-full flex flex-row justify-start items-start'>
                                                        <div className='text-xs text-slate-400 mr-3 flex justify-center items-center'><FaRegCalendar className='mr-1' />
                                                            {new Date((data.date)).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}
                                                        </div>
                                                        <div className='text-xs text-slate-400 flex justify-center items-center'><FaGlobeAsia className='mr-1' />Public</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='px-3 w-full py-2 break-all text-sm'>{data.title}</div>
                                            {
                                                data.img ? <div className='flex flex-row w-full h-48 md:h-96 bg-white justify-center overflow-hidden items-center'>
                                                    <img className='object-cover h-full w-full bg-white' src={data.img} alt={data.title} />
                                                </div> : null
                                            }

                                            <div className='w-full justify-around p-1 items-center flex flex-row'>
                                                {/* <div className='flex p-2 text-blue-800 flex-row justify-center items-center'>
                                        <FaRegThumbsUp className='text-lg mr-2' />
                                        <span className=''>{data.like}</span>
                                    </div> */}
                                                <div className='flex p-2 text-blue-800 flex-row justify-center items-center'>
                                                    <FaRegCommentAlt className='text-lg mr-2' />
                                                    <span className=''>{commentLength}</span>
                                                </div>
                                                <div className='flex p-2 text-blue-800 flex-row justify-center items-center'>
                                                    <FaShare onClick={() => setOpen(true)} className='text-lg cursor-pointer' />
                                                    <Share open={open} setOpen={setOpen} />
                                                </div>
                                            </div>
                                        </> : <span className='text-sm text-center'>No post found..</span>
                                }



                            </div>
                            {
                                data !== null && data !== undefined ?

                                    <div className='w-full px-4 py-2 flex flex-col'>
                                        {
                                            user ?
                                                <div className='w-full bg-blue-50 rounded-3xl flex flex-row items-center'>
                                                    <input value={newComment.title} onChange={handleChange} name='title' placeholder='Add Comment here...' className='placeholder-gray-500 text-sm bg-transparent w-full outline-none py-2.5 px-4' type='text' />
                                                    <div className='mr-4 flex cursor-pointer text-blue-800 flex-row justify-center items-center'>
                                                        <BiSend onClick={handleSubmit} className='text-lg' />
                                                    </div>
                                                </div> : <div className='w-full flex flex-row items-center justify-center py-5 font-medium text-sm text-slate-800'>
                                                    <span className='mr-1'>Please</span>
                                                    <Link className='text-blue-800' to='/signin'>login</Link>
                                                    <span className='ml-1'>to comment to this post.</span></div>
                                        }
                                        {
                                            comments ? <div className='my-5 w-full flex flex-col'>
                                                {
                                                    comments.map((item, index) => {
                                                        return (
                                                            <div key={index} className='flex flex-col my-2'>
                                                                <div className='flex flex-row items-center'>
                                                                    <img className='ml-3 w-8 h-8 mr-4' src={profilelogo} alt='profile' />
                                                                    <div className='flex flex-col justify-start items-center'>
                                                                        <div className='text-sm  w-full break-all'><span className='font-medium text-blue-800 mr-1'>{item.authorName}</span></div>
                                                                        <div className='w-full flex flex-row justify-start items-start'>
                                                                            <div className='text-[11px] text-slate-400 mr-3 flex justify-center items-center'><FaRegCalendar className='mr-1' />
                                                                                {new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='ml-14 pl-1 mr-1 w-fit break-all text-sm'>{item.comment}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div> : null
                                        }
                                    </div>
                                    : null
                            }

                        </div>
                }
                <div className='shadow-lg text-slate-300 bg-white w-80 h-80 hidden md:flex shadow-white-800 my-4 rounded-lg p-3 flex-col justify-center items-center'>
                    Advertisement Here
                </div>
            </div>
        </div>

    )
}

export default PostDetail;