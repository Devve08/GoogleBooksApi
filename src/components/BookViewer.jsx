import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBookDetails } from "../network/network";

export const BookViewer = (route) => {
  const canvasRef = useRef(null);
  const [book, setBook] = useState(null);
  const [links, setLinks] = useState(null);
  const location = useLocation()
  const { identifier } = location.state
  

  const { id } = useParams();
 

  useEffect(() => {
    window.onpopstate = (event) => console.log('sds',event.state)
    initialiase();
    getSingleBookDetails();
  }, []);

  const alertNotFound = () => {
    alert("could not embed the book!");
  };

  const getSingleBookDetails = () => {
    getBookDetails(id)
      .then(res => {
        setBook(res?.data?.volumeInfo);
        setLinks(res?.data?.accessInfo);
      })
      .catch(err => console.log(err.message));
  };

  const initialiase = () => {
    var viewer = new window.google.books.DefaultViewer(
      document.getElementById("viewerCanvas")
    );
    viewer.load(identifier?.identifier, alertNotFound);
  };

  return (
    <div className="w-full flex sm:flex-row flex-col">
      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-start sm:w-1/4 bg-red-200 w-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center my-2 px-4">
            <span className="font-bold text-xs sm:text-base ">Title:</span>
            <span className="text-xs sm:text-base">{book?.title}</span>
          </div>
          <div className="flex flex-col items-center my-2 px-4">
            <span className="font-bold text-xs sm:text-base ">Authors:</span>
            <span className="text-xs sm:text-base">
              {book?.authors?.map((item, index) => item)}
            </span>
          </div>
          <div className="flex flex-col items-center my-2 px-4">
            <span className="font-bold text-xs sm:text-base ">
              Pages Count:
            </span>
            <span className="text-xs sm:text-base">{book?.pageCount}</span>
          </div>
          <div className="flex flex-col items-center my-2 px-4">
            <span className="font-bold text-xs sm:text-base ">Publisher:</span>
            <span className="text-xs sm:text-base">{book?.publisher}</span>
          </div>
          <div className="flex flex-col items-center my-2 px-4">
            <span className="font-bold text-xs sm:text-base ">Language:</span>
            <span className="text-xs sm:text-base">{book?.language}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <button
            className="bg-green-700 py-2 m-2 px-4 text-white text-xs sm:text-base"
            onClick={initialiase}
          >
            Preview Book
          </button>

          {links?.epub?.isAvailable && (
            <button className="bg-black py-2 m-2 px-4 text-white text-xs sm:text-base">
              <a
                href={links?.epub?.downloadLink}
                target="_blank"
                download="pdf"
              >
                Download as Epub
              </a>
            </button>
          )}

          {links?.pdf?.isAvailable && (
            <button className="bg-red-700 py-2 m-2 px-4 text-white text-xs sm:text-base">
              <a href={links?.pdf?.downloadLink} target="_blank" download="pdf">
                Download as PDF
              </a>
            </button>
          )}
        </div>
      </div>

      <div className=" flex flex-row sm:w-3/4 w-full">
        <div ref={canvasRef} id="viewerCanvas"></div>
      </div>
    </div>
  );
};
