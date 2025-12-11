import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    }

  return (
    <div>
        <div className='absolute'>
        <Header/>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/274d310a-9543-4b32-87f3-147b372abc00/web/IN-en-20251201-TRIFECTA-perspective_baf6d3bc-eece-4a63-bcbb-e0a2f5d9d9ec_large.jpg" alt="netflix background"/>
        </div>
        <form action="" className='w-4/12 absolute p-12 bg-black flex flex-col justify-center gap-6 my-32 mx-auto left-0 right-0 opacity-85'>
            <h1 className='text-white text-3xl'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
            {!isSignIn && <input className="text-white p-3 rounded bg-transparent border border-slate-300" type="text" placeholder='Full Name'/>}
            <input className="text-white p-3 rounded bg-transparent border border-slate-300" type="text" placeholder='Email or mobile number'/>
            <input className="text-white p-3 rounded bg-transparent border border-slate-300" type="password" placeholder='password'/>
            <button className='text-white bg-red-600 p-3 rounded'>{isSignIn ? "Sign In" : "Sign Up"}</button>
            {isSignIn ? <p className='text-slate-300'>New to Netflix? <a href="#" className='font-bold text-white cursour-pointer' onClick={toggleSignInForm}>Sign Up now.</a></p> :
            <p className='text-slate-300'>Already registered? <a href="#" className='font-bold text-white cursour-pointer' onClick={toggleSignInForm}>Sign In now.</a></p>}
        </form>
    </div>
  )
}

export default Login