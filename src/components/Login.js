import React, { useState, useRef } from "react";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { addUser } from "../utils/userSlice";
import {BG_URL} from "../utils/constant"

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    let errMessage = null;
    if (isSignIn) {
      errMessage = checkValidData(email.current.value, password.current.value);
    } else {
      errMessage = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value
      );
    }
    setErrorMessage(errMessage);

    if (errMessage) return;

    //sign in/ sign up
    if (!isSignIn) {
      //sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // setErrorMessage(errorCode + "-" + errorMessage);

          if (errorCode === "auth/email-already-in-use") {
            setErrorMessage("This email is already registered. Please sign in or use a different email.");
          } else if (errorCode === "auth/weak-password") {
            setErrorMessage("Password should be at least 6 characters.");
          } else if (errorCode === "auth/invalid-email") {
            setErrorMessage("Please enter a valid email address.");
          } else {
            setErrorMessage(error.message || "An error occurred. Please try again.");
          }
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const apiError = error?.customData?.serverResponse?.error; // REST shape { code: 400, message: "INVALID_LOGIN_CREDENTIALS", ... }
          if (
            errorCode === "auth/invalid-credential" ||
            apiError?.code === 400 ||
            apiError?.message === "INVALID_LOGIN_CREDENTIALS"
          ) {
            setErrorMessage("Invalid credentials");
          } else {
            setErrorMessage(`${errorCode}-${error.message}`);
          }
        });
    }
  };

  return (
    <div>
        <Header />
        <div className="absolute">
            <img className="h-screen w-screen object-cover"
            src={BG_URL}
            alt="netflix background"
            />
        </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        className="md:w-4/12 absolute p-12 bg-black flex flex-col justify-center gap-6 my-32 mx-auto left-0 right-0 opacity-85"
      >
        <h1 className="text-white text-3xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            className="text-white p-3 rounded bg-transparent border border-slate-300"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="text-white p-3 rounded bg-transparent border border-slate-300"
          type="email"
          placeholder="Email or mobile number"
        />
        <input
          ref={password}
          className="text-white p-3 rounded bg-transparent border border-slate-300"
          type="password"
          placeholder="password"
        />
        {errorMessage && (
          <p className="text-red-600 font-bold text-lg">{errorMessage}</p>
        )}
        <button
          className="text-white bg-red-600 p-3 rounded"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        {isSignIn ? (
          <p className="text-slate-300">
            New to Netflix?{" "}
            <a
              href="#"
              className="font-bold text-white cursour-pointer"
              onClick={toggleSignInForm}
            >
              Sign Up now.
            </a>
          </p>
        ) : (
          <p className="text-slate-300">
            Already registered?{" "}
            <a
              href="#"
              className="font-bold text-white cursour-pointer"
              onClick={toggleSignInForm}
            >
              Sign In now.
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
