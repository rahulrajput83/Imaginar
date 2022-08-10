import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [alertMeassage, setAlertMessage] = useState('');
    const [emailInvalid, setEmailInvalid] = useState('animate-none');
    const [passwordInvalid, setPasswordInvalid] = useState('animate-none');
    

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setEmailInvalid('animate-none');
        setPasswordInvalid('animate-none')
    }
    const onEmailInvalid = () => {
        setEmailInvalid('animate-inputBox')
        setTimeout(() => setEmailInvalid('animate-none'), 800);
    }
    const onPasswordInvalid = () => {
        setPasswordInvalid('animate-inputBox')
        setTimeout(() => setPasswordInvalid('animate-none'), 800);
    }

    const handleSubmit = (e) => {
        setButtonDisabled(true)
        e.preventDefault();
        fetch('https://imaginar.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(response => {
                if (response.message === 'Successfully Login') {
                    saveData(response);
                    return navigate("/");
                };
                setButtonDisabled(false)
                setAlertMessage(response.message);
                setError(true);
                setTimeout(() => setError(false), 2500);
                setLoginData({
                    email: '',
                    password: ''
                });

            })
            .catch(err => {
                console.log(err)
                setButtonDisabled(false)
                setAlertMessage('Something went wrong...');
                setError(true);
                setTimeout(() => setError(false), 2500);
            });
    }

    const saveData = (response) => {
        let action = {
            type: "ADD_DATA",
            payload: response.value._id
        };
        dispatch(action);
        action = {
            type: "ADD_NAME",
            payload: response.value.fullName
        };
        dispatch(action);
    }
    return (
        <div className='w-full h-full flex items-center flex-col'>
            <div className='flex rounded shadow-lg shadow-white-800 flex-row w-full px-3 md:px-6 py-4 items-center justify-between'>
                <Link to='/'>
                    <div className='font-bold uppercase text-xl md:text-2xl'>imaginar</div>
                </Link>
                <Link to='/about'>
                    <div className='text-blue-700 bg-slate-100 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>About Me</div>
                </Link>
            </div>
            {
                error ? <div className='animate-alert absolute top-20 right-3 rounded-lg text-white p-3 w-2/3 md:w-1/3 bg-blue-700'>
                    {alertMeassage}
                </div> : null
            }
            <div className='bg-black-600 items-center flex flex-col w-11/12 md:w-1/2 mt-5 rounded shadow-xl shadow-slate-200 p-5'>
                <h1 className='font-bold text-2xl'>Welcome Back</h1>
                <form className='flex flex-col w-full justify-center items-center' onSubmit={handleSubmit}>
                    <input value={loginData.email} onInvalid={onEmailInvalid} onChange={onChange} name='email' placeholder='Email Address' className={`text-sm mt-8 w-11/12 md:w-3/4 ${emailInvalid} outline-none py-2.5 px-3 bg-slate-100 rounded`} type='email' required />
                    <input value={loginData.password} onInvalid={onPasswordInvalid} onChange={onChange} name='password' placeholder='Password' className={`text-sm mt-8 w-11/12 md:w-3/4 ${passwordInvalid} outline-none py-2.5 px-3 bg-slate-100 rounded`} type='password' required />
                    <div className='my-10 w-11/12 md:w-3/4 flex flex-row justify-between items-center'>
                        <button disabled={buttonDisabled} type='submit' className='text-white bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>Login</button>
                        <Link to='/signup'>
                            <button className='text-blue-700 bg-slate-100 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>Register</button>
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Signin