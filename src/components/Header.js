import React, {useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="absolute w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix logo"
      />
      {user && (
        <div className="flex gap-4 items-center m-4">
          <img
            className="w-10 h-10"
            src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
            alt="user icon"
          />
          <button onClick={handleSignout} className="text-white font-bold">
            (Sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
