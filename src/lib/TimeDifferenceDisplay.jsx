import React, { useEffect, useState } from "react";

const TimeDifferenceDisplay = ({ date }) => {
  const [nowDate, setNowDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNowDate(new Date());
    }, [1000 * 60]); // min change

    return () => clearInterval(interval);
  }, []);

  const mongoDate = new Date(date); // item.createdAt
  const timeDifference = new Date(nowDate - mongoDate);

  // Calculate days, hours, minutes, and seconds
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

  const days = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return (
    <div className="text-xs  mx-1 text-blue-700 pl-0 p-1 pt-0 pb-0 flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
      <>
        {years >= 1 ? (
          <div>
            {years > 0 && (
              <span>{`${years} ${years === 1 ? "year " : "years "}`}</span>
            )}
          </div>
        ) : days >= 1 ? (
          <>
            {days > 0 && (
              <span>{`${days} ${days === 1 ? "day " : "days "}`}</span>
            )}
          </>
        ) : hours >= 1 ? (
          <>
            {hours > 0 && (
              <span>{`${hours} ${hours === 1 ? "hour " : "hours "}`}</span>
            )}
          </>
        ) : (
          <>
            {minutes > 0 && (
              <span>{`${minutes} ${
                minutes === 1 ? "minute " : "minutes "
              }`}</span>
            )}
            {minutes <= 0 && (
              <span>{`${seconds} ${
                seconds === 1 ? "second " : "seconds "
              }`}</span>
            )}
          </>
        )}

        <span className="pl-1">ago</span>
      </>
    </div>
  );
};

export default TimeDifferenceDisplay;
