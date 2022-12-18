import React from "react";

export const Pagination = (props) => {
  const { goToNextPage, goToPrevPage } = props;
  return (
    <div>
      {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
};
