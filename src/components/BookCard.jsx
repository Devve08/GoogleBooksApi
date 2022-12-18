import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookDetails } from "../network/network";
import StarsRating from "./StarsRating";

export default function BookCard({ bookId, onClick, identifier }) {
  const [book, setBook] = useState(null);
  useEffect(() => {
    getSingleBookDetails();
  }, []);

  const getSingleBookDetails = () => {
    
    getBookDetails(bookId)
      .then(res => {
        setBook(res?.data?.volumeInfo);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-lg mx-4 mb-4 h-96 rounded w-64 cursor-pointer flex flex-col items-center justify-start"
    >
      <Link  to={{pathname :`bookviewer/${bookId}`}} state={{identifier}}>
        <img
          className="w-full h-40 rounded"
          src={
            book?.imageLinks?.medium
              ? book?.imageLinks?.medium
              : book?.imageLinks?.thumbnail
          }
          alt=""
        />
        <div className="p-2">
          {book?.publishedDate && (
            <div className="text-sm">
              <span className="font-bold">Published:</span>{" "}
              {book?.publishedDate}{" "}
            </div>
          )}
          {book?.publisher && (
            <div className="text-sm">
              <span className="font-bold text-sm">Publisher:</span>{" "}
              {book?.publisher}
            </div>
          )}
          {book?.authors?.length > 0 ? (
            <div className="flex flex-row jusify-start flex-wrap items-center text-sm">
              <span className="font-bold text-sm">Authors:</span>
              {book?.authors?.map((item, index) => (
                <div key={index}> {" " + item} </div>
              ))}
            </div>
          ) : null}
          {book?.averageRating ? (
            <StarsRating
              rating={book?.averageRating}
              ratingTotal={book?.ratingsCount}
            />
          ) : (
            <span className="font-bold text-sm">No Ratings</span>
          )}
        </div>
      </Link>
    </div>
  );
}

export const MemoizedBookCard = React.memo(BookCard);
