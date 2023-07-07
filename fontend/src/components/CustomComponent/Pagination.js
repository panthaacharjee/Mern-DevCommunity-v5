import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({
  firstIndex,
  lastIndex,
  setFirstIndex,
  setLastIndex,
  questions,
}) => {
  const [page, setPage] = useState(1);
  const handlePagination = (btn) => {
    if (btn === "prev") {
      if (firstIndex > 0) {
        setFirstIndex(firstIndex - 10);
        setLastIndex(lastIndex - 10);
        setPage(page - 1);
      } else {
        setFirstIndex(0);
        setLastIndex(10);
        setPage(1);
      }
    }
    if (btn === "next") {
      if (lastIndex < questions.length) {
        setFirstIndex(firstIndex + 10);
        setLastIndex(lastIndex + 10);
        setPage(page + 1);
      }
    }
  };

  return (
    <div className="pagination-container">
      <button onClick={() => handlePagination("prev")}>Previeos</button>
      <p>{page}</p>
      <button onClick={() => handlePagination("next")}>Next</button>
    </div>
  );
};

export default Pagination;
