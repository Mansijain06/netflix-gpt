import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LOGO, SUPPORTED_LANGUAGES, USER_LOGO } from "../utils/constant";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const isGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        removeUser();
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const onlanguagechange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="netflix logo" />
      {user && (
        <div className="flex gap-2 items-center m-4">
          {isGptSearch && (
            <select
              className="p-2 m-2 rounded bg-slate-700 text-white"
              onChange={(e) => onlanguagechange(e)}
              name="lang"
              id="lang"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="rounded-lg py-2 px-4 bg-purple-700 text-white mx-2"
            onClick={handleGptSearchClick}
          >
            {isGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="w-8 h-8" src={USER_LOGO} alt="user icon" />
          <button onClick={handleSignout} className="text-white font-bold">
            (Sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
