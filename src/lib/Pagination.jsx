import React from "react";

const Pagination = ({ pageNumbers, handleChangePage, currentPage }) => {
  return (
    <div
      className={` fixed  bottom-0 right-0 left-0 flex flex-row justify-center`}
    >
      {pageNumbers?.map((page) => {
        return (
          <button
            onClick={() => handleChangePage(page)}
            key={page}
            className={`${
              page === currentPage
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
            } rounded-full m-1 p-1 px-3 hover:text-white hover: bg-gradient-to-l `}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(Pagination);
