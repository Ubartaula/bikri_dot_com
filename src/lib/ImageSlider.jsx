import React, { useEffect, useState } from "react";

const ImageSlider = ({ item, showPagination }) => {
  const length = item?.images?.length;
  const [index, setIndex] = useState(0);

  const pageArray = new Array(length).fill(0).map((any, index) => index + 1);

  const handleIndexChanged = async () => {
    try {
      if (index === length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      handleIndexChanged();
    }, 3000);

    return () => clearInterval(intervalID);
  }, [index]);

  return (
    <>
      {item && (
        <div className="relative min-w-full">
          <div
            onClick={handleIndexChanged}
            className="w-[100%] py-1 flex items-center justify-center"
          >
            <img
              src={item?.images[index]}
              alt={item?.itemName}
              height={300}
              className="rounded-lg min-h-[300px]"
            />
          </div>
          {showPagination && (
            <div className=" flex flex-row items-center justify-center absolute bottom-5 left-0 right-0">
              {pageArray?.map((indexNum) => (
                <div
                  className="m-1"
                  key={indexNum}
                  onClick={() => setIndex(indexNum - 1)}
                >
                  <p
                    className={`${
                      indexNum - 1 === index
                        ? "bg-pink-800 text-white"
                        : "bg-white text-black"
                    }  border border-blue-500 rounded-full h-6 w-6 flex items-center justify-center`}
                  >
                    {indexNum}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(ImageSlider);
