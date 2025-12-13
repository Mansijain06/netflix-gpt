import React, { useState, useRef } from 'react'
import {auth} from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import Header from './Header'
import {checkValidData} from "../utils/validate";
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    }

    const handleButtonClick = () => {
        let errMessage = null;
        if(isSignIn) {
            errMessage = checkValidData(email.current.value, password.current.value);
        } else {
            errMessage = checkValidData(email.current.value, password.current.value, name.current.value);
        }
        setErrorMessage(errMessage);

        if(errMessage) return;

        //sign in/ sign up
        if(!isSignIn) {
            //sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name.current.value
                }).then(() => {
                    // Profile updated!
                    const {uid, email, displayName} = auth.currentUser;
                    dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                }).catch((error) => {
                    // An error occurred
                    setErrorMessage(error.message);
                });

                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        } else {
            // sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const apiError = error?.customData?.serverResponse?.error; // REST shape { code: 400, message: "INVALID_LOGIN_CREDENTIALS", ... }
                // console.log(error);
                if (errorCode === "auth/invalid-credential" || apiError?.code === 400 || apiError?.message === "INVALID_LOGIN_CREDENTIALS") {
                    setErrorMessage("Invalid credentials");
                } else {
                    setErrorMessage(`${errorCode}-${error.message}`);
                }
            });
        }
    }

  return (
    <div>
        <div className='absolute'>
        <Header/>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/274d310a-9543-4b32-87f3-147b372abc00/web/IN-en-20251201-TRIFECTA-perspective_baf6d3bc-eece-4a63-bcbb-e0a2f5d9d9ec_large.jpg" alt="netflix background"/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} action="" className='w-4/12 absolute p-12 bg-black flex flex-col justify-center gap-6 my-32 mx-auto left-0 right-0 opacity-85'>
            <h1 className='text-white text-3xl'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
            {!isSignIn && <input ref={name} className="text-white p-3 rounded bg-transparent border border-slate-300" type="text" placeholder='Full Name'/>}
            <input ref={email} className="text-white p-3 rounded bg-transparent border border-slate-300" type="email" placeholder='Email or mobile number'/>
            <input ref={password} className="text-white p-3 rounded bg-transparent border border-slate-300" type="password" placeholder='password'/>
            {errorMessage && <p className='text-red-600 font-bold text-lg'>{errorMessage}</p>}
            <button className='text-white bg-red-600 p-3 rounded' onClick={handleButtonClick}>{isSignIn ? "Sign In" : "Sign Up"}</button>
            {isSignIn ? <p className='text-slate-300'>New to Netflix? <a href="#" className='font-bold text-white cursour-pointer' onClick={toggleSignInForm}>Sign Up now.</a></p> :
            <p className='text-slate-300'>Already registered? <a href="#" className='font-bold text-white cursour-pointer' onClick={toggleSignInForm}>Sign In now.</a></p>}
        </form>
    </div>
  )
}

export default Login