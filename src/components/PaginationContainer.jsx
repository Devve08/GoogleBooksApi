import React from "react";

export default function PaginationContainer({
  booksCount,
  startingIndex,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="flex flex-row mb-10 justify-between items-center w-2/4">
      <span
        onClick={handlePrev}
        className="font-bold cursor-pointer shadow py-2 px-4 rounded"
      >
        Prev
      </span>
      <span className="font-bold">
        {startingIndex}/{booksCount}
      </span>
      <span
        onClick={handleNext}
        className="font-bold cursor-pointer shadow py-2 px-4 rounded"
      >
        Next
      </span>
    </div>
  );
}
