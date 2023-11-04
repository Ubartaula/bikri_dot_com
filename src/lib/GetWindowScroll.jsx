import React, { useEffect, useState } from "react";

const GetWindowScroll = () => {
  const [scrollValue, setScrollValue] = useState(window.scrollY);

  const handleScroll = () => {
    setScrollValue(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollValue };
};

export default GetWindowScroll;
