import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Signup() {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [alertMeassage, setAlertMessage] = useState('User Already Registered.');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [fullnameInvalid, setFullNameInvalid] = useState(false);

    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        setFullNameInvalid(false);
        setEmailInvalid(false);
        setPasswordInvalid(false);
    }
    const onEmailInvalid = () => {
        setEmailInvalid(true)
    }

    const onfullNameInvalid = () => {
        setFullNameInvalid(true)
    }

    const onPasswordInvalid = () => {
        setPasswordInvalid(true)
    }


    const handleSubmit = (e) => {
        setButtonDisabled(true)
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then(response => response.json())
            .then(response => {
                setButtonDisabled(false)
                setAlertMessage(response.message);
                setError(true)
                setTimeout(() => setError(false), 2500);
                setRegisterData({
                    fullName: '',
                    email: '',
                    password: ''
                })
            })
            .catch(err => {
                setButtonDisabled(false)
                setAlertMessage('Something went wrong...');
                setError(true)
                setTimeout(() => setError(false), 2500);
            });
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
                error ? <div className='animate-alert absolute top-20 right-3 rounded-lg text-white p-3 w-11/12 md:w-1/2 bg-blue-700'>
                    {alertMeassage}
                </div> : null
            }
            <div className='bg-black-600 items-center flex flex-col w-11/12 md:w-1/2 mt-5 rounded shadow-xl shadow-slate-200 p-5'>
                <h1 className='font-bold text-2xl'>Welcome to Imaginar</h1>
                <form className='flex flex-col w-full justify-center items-center' onSubmit={handleSubmit}>
                    <input value={registerData.fullName} onInvalid={onfullNameInvalid} onChange={onChange} name='fullName' placeholder='Full Name' className={`text-sm mt-8 w-11/12 md:w-3/4 ${fullnameInvalid} outline-none py-2.5 px-3 bg-slate-100 rounded`} type='text' required />
                    {
                        fullnameInvalid ? <span className='text-sm text-red-500 w-11/12 md:w-3/4 px-3'>Please enter your full name...</span> : null
                    }
                    <input value={registerData.email} onInvalid={onEmailInvalid} onChange={onChange} name='email' placeholder='Email Address' className={`text-sm mt-8 w-11/12 md:w-3/4 ${emailInvalid} outline-none py-2.5 px-3 bg-slate-100 rounded`} type='email' required />
                    {
                        emailInvalid ? <span className='text-sm text-red-500 w-11/12 md:w-3/4 px-3'>Please enter valid email address... </span> : null
                    }
                    <input value={registerData.password} pattern='^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$' onInvalid={onPasswordInvalid} onChange={onChange} name='password' placeholder='Password' className={`text-sm mt-8 w-11/12 md:w-3/4 ${passwordInvalid} outline-none py-2.5 px-3 bg-slate-100 rounded`} type='password' required />
                    {
                        passwordInvalid ? <span className='text-sm text-red-500 w-11/12 md:w-3/4 px-3'>Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span> : null
                    }
                    <div className='my-10 w-11/12 md:w-3/4 flex flex-row justify-between items-center'>
                        <button disabled={buttonDisabled} type='submit' className='text-white bg-blue-700 hover:bg-blue-800 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>Register</button>
                        <Link to='/signin'>
                            <button className='text-blue-700 bg-slate-100 hover:bg-slate-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center'>Login</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup