import React from "react";

export const Pagination = (props) => {
  const { page, goToNextPage, goToPrevPage } = props;
  return (
    <div className="[&>*]:m-1">
      {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      <span>
        {page.current} / {page.count}
      </span>
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
};
