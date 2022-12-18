import React, { useState } from "react";
import InputContainer from "../components/InputContainer";
import Loading from "../components/Loading";
import PaginationContainer from "../components/PaginationContainer";
import { searchForBooksByAuthor } from "../network/network";
import { MemoizedBookCard } from "../components/BookCard";

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(null);
  const [startingIndex, setStartingIndex] = useState(0);

  const fetchBooks = (author, startingIndex) => {
    if (author) {
      setIsLoading(true);
      searchForBooksByAuthor(author, startingIndex)
        .then(res => {
          if (res?.data?.items?.length > 0) {
            setBooks(res?.data?.items);
            setBooksCount(res?.data?.totalItems);
          } else {
            setBooks([]);
            setMessage("No authors found with this name");
          }

          if (startingIndex === 0) {
            setStartingIndex(startingIndex + 10);
          } else {
            setStartingIndex(startingIndex);
          }
          setIsLoading(false);
        })
        .catch(err => setIsLoading(false));
    }
  };

  const getAuthorNameValue = e => {
    setAuthor(e.target.value);
    // if (timer) {
    //   clearTimeout(timer);
    //   setTimer(null);
    // }
    // setTimer(
    //   setTimeout(() => {
    //     if (e.target.value.length > 3) {
    //       fetchBooks(e.target.value, 0);
    //     }
    //   }, 1000)
    // );
  };



  const handleNext = () => {
    if (startingIndex + 10 <= booksCount) {
      setStartingIndex(startingIndex + 10);
      let next = startingIndex + 10;
      fetchBooks(author, next);
    }
  };

  const handlePrev = () => {
    if (startingIndex - 10 > 0) {
      setStartingIndex(startingIndex - 10);
      let back = startingIndex - 10;
      fetchBooks(author, back);
    }
  };


  return (
    <div className="w-full mh-screen">
      <div>
        <InputContainer
          onClick={() => fetchBooks(author, 0)}
          value={author}
          handleOnChange={getAuthorNameValue}
          placeholder={"Search for an author ..."}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : books?.length > 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-between sm:p-4">
          <PaginationContainer
            booksCount={booksCount}
            startingIndex={startingIndex}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
          <div className="w-5/6 flex flex-row items-start justify-center flex-wrap">
            {books?.map((item, index) => (
              <MemoizedBookCard
                bookId={item?.id}
                bookImage={item?.volumeInfo?.imageLinks?.thumbnail}
                key={item?.id}
                identifier={item?.volumeInfo?.industryIdentifiers[0]}
              />
            ))}
          </div>
        </div>
      ) : books?.length === 0 && message ? (
        <div className="w-full h-full flex flex-col items-center justify-between p-4">
          There are no authors that matches the searched name!
        </div>
      ) : null}
    </div>
  );
}
