import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../helpers/functions";

export default function Header() {
  const [userData, setUserData] = useState(null);
  const handleLogoutBtn = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  useEffect(() => {
    let userInfo = getUserInfo();
    setUserData(userInfo);
  }, []);
  return (
    <div className="sm:flex-row w-full flex flex-col justify-between items-center bg-red-600 p-5 ">
      <div className="sm:text-2xl font-bold text-xl  text-white">Good Reads</div>
      <div className="flex flex-row items-center">
        <span className="sm:text-lg mx-4 text-white text-sm cursor-pointer hover:opacity-70">
          <Link to={'/'}>
          Home
          </Link>
        </span>

        <span
          onClick={handleLogoutBtn}
          className="sm:text-lg mx-4 text-white text-sm cursor-pointer hover:opacity-70"
        >
          Logout
        </span>
        <div className="flex flex-row justify-between items-center">
          <span className="sm:text-lg mx-4 text-white text-sm">{userData?.name}</span>
          <img
            className="rounded-full sm:h-10 sm:w-10 h-6 w-6"
            src={userData?.picture}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
