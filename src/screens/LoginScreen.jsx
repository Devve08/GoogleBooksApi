import React, { useEffect, useRef } from "react";
import { client_id } from "../helpers/constants";

export default function LoginScreen() {
  const divRef = useRef(null);

  const handleCallBackResponse = response => {
    if (response.credential) {
      localStorage.setItem("userData", response.credential);
      window.location.reload()
    } else {
    }
  };

  useEffect(() => {
    if (divRef.current) {
      const google = window.google;
      google?.accounts?.id.initialize({
        client_id,
        callback: handleCallBackResponse,
      });

      google?.accounts?.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    }
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center main-photo ">
      <h1 className="text-white mt-10 mb-40 text-6xl  font-bold">
        Welcome To Good Reads
      </h1>
      <div className="flex flex-col justify-between items-center w-full">
        <span className="text-white font-bold text-lg mb-5">
          Signup with Google
        </span>
        <div ref={divRef} id="signInDiv"></div>
      </div>
    </div>
  );
}
