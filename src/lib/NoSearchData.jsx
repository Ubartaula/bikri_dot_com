import React from "react";

const NoSearchData = () => {
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
        <p className="text-2xl m-2 p-2 text-yellow-900">
          Search word did not match, please check and re-enter.
        </p>
      </div>
    </>
  );
};

export default NoSearchData;
