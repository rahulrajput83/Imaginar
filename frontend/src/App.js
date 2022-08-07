import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import About from './Component/About';
import Home from './Component/Home';
import PostDetail from './Component/PostDetail';
import Profile from './Component/Profile';
import Signin from './Component/Signin';
import Signup from './Component/Signup';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';


const Private = ({ user, children }) => {
  if (!user) {
    return <Navigate to='/signin' replace />
  }
  return children;
}

const SignPrivate = ({ user, children }) => {
  if (user !== '' && user !== undefined) {
    return <Navigate to='/' replace />
  }
  return children;
}

function App() {
  const userData = useSelector((state) => state.user);
  const [cookies] = useCookies(['token']);
  let user
  const userValue = () => {
    const Data = cookies.token;
    if(userData) {
      user = userData;
    }
    else {
      user = Data;
    }
  };

  useEffect(() => {
    userValue();
  })
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/' element={<Private user={user} ><Home /></Private>} />
        <Route path='/signin' element={<SignPrivate user={user}><Signin /></SignPrivate>} />
        <Route path='/signup' element={<SignPrivate user={user}><Signup /></SignPrivate>} />
        <Route path='/account' element={<Private user={user}><Profile /></Private>} />
        <Route path='/posts/:uniqueid' element={<PostDetail />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
