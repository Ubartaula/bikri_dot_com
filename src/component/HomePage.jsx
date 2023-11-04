import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { useSelector } from "react-redux";
import { currentToken } from "../feature/auth/authSlice";
import { toast } from "react-toastify";
import Nepal from "../img/nepal.webp";
import Tarkari from "../img/tarkari.jpeg";
import BhaktaPur from "../img/Nepal-Bhaktapur-Durbar-Square2.webp";
import ImageSlider from "../lib/ImageSlider";

const HomePage = () => {
  const images = [Nepal, Tarkari, BhaktaPur];
  const navigate = useNavigate();
  const history = useLocation();

  const token = useSelector(currentToken);
  const [housing, setHousing] = useState("housing");
  const { subCategoryList } = useCategory();

  // preventing going back
  const handleBack = (e) => {
    e.preventDefault();
    toast.warning("you can not go back from your home page", {
      position: "top-center",
    });
  };

  useEffect(() => {
    history.pathname.replace("/"); // this will put back home route even after pressing back
    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, [history.pathname]);

  // to switch text between nepali to English
  const [nepali, setNepali] = useState(true);
  const changeLanguage = () => {
    setNepali((prev) => !prev);
  };

  useEffect(() => {
    const interValId = setInterval(() => {
      changeLanguage();
    }, 10000);

    return () => clearInterval(interValId);
  }, [nepali]);

  const itemsForImages = {
    images,
  };

  return (
    <div className=" bg-gradient-to-r from-blue-200 to-sky-200 h-full">
      {/* mobile */}
      <div className="flex flex-row xsm:hidden min-h-screen ">
        <div className="w-[7.5rem] font-semibold fixed left-0 top-[3.5rem] bottom-0 bg-gradient-to-r from-sky-500 to-indigo-500">
          <p
            onMouseOver={() => setHousing("housing")}
            //onClick={() => setHousing("housing")}
            className={`${
              housing === "housing" ? " bg-sky-100" : ""
            } p-2 px-4 text-xl cursor-pointer shadow-sm rounded-md shadow-black m-1`}
          >
            Housing
          </p>
          <p
            onMouseOver={() => setHousing("services")}
            //onClick={() => setHousing("services")}
            className={`${
              housing === "services" ? " bg-sky-100" : ""
            } p-2 px-4 text-xl cursor-pointer shadow-sm rounded-md shadow-black m-1`}
          >
            Services
          </p>
          <p
            onMouseOver={() => setHousing("forSale")}
            //onClick={() => setHousing("forSale")}
            className={`${
              housing === "forSale" ? " bg-sky-100" : ""
            } p-2 px-4 text-xl  cursor-pointer shadow-sm rounded-md shadow-black m-1`}
          >
            For Sale
          </p>
          <p
            onMouseOver={() => setHousing("jobs")}
            //onClick={() => setHousing("jobs")}
            className={`${
              housing === "jobs" ? " bg-sky-100" : ""
            } p-2 px-4 text-xl cursor-pointer shadow-sm rounded-md shadow-black m-1 `}
          >
            Jobs
          </p>
        </div>
        <div className="ml-[7.5rem] w-full bg-gradient-to-r from-sky-200 to-indigo-300">
          {/* housing */}
          {housing === "housing" && (
            <div className="flex flex-col">
              <div
                onClick={() => {
                  if (!token) {
                    navigate("/housing");
                  } else {
                    navigate("/dash/housing");
                  }
                }}
                className="p-1 m-1 pl-4 font-bold rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
              >
                All Housing
              </div>

              {subCategoryList.housing?.map((category) => {
                return (
                  <p
                    onClick={() => {
                      if (token) {
                        navigate(`/dash/housing/${category.id}`);
                      } else if (!token) {
                        navigate(`/housing/${category.id}`);
                      }
                    }}
                    className="p-1 m-1 pl-4 rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
                    key={category.id}
                  >
                    {category.label}
                  </p>
                );
              })}
            </div>
          )}

          {/* services */}
          {housing === "services" && (
            <div className="flex flex-col">
              <div
                className="p-1 m-1 pl-4 font-bold rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
                onClick={() => {
                  if (!token) {
                    navigate("/services");
                  } else {
                    navigate("/dash/services");
                  }
                }}
              >
                All Services
              </div>

              {subCategoryList.services?.map((category) => {
                return (
                  <p
                    onClick={() => {
                      if (token) {
                        navigate(`/dash/services/${category.id}`);
                      } else if (!token) {
                        navigate(`/services/${category.id}`);
                      }
                    }}
                    className="p-1 m-1 pl-4 rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
                    key={category.id}
                  >
                    {category.label}
                  </p>
                );
              })}
            </div>
          )}

          {/* for sale */}
          {housing === "forSale" && (
            <div className="flex  flex-col">
              <div
                onClick={() => {
                  if (!token) {
                    navigate("/forSale");
                  } else {
                    navigate("/dash/forSale");
                  }
                }}
                className="p-1 m-1 pl-4 font-bold rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
              >
                All For Sale
              </div>
              {subCategoryList.forSale?.map((category) => {
                return (
                  <p
                    onClick={() => {
                      if (token) {
                        navigate(`/dash/forSale/${category.id}`);
                      } else if (!token) {
                        navigate(`/forSale/${category.id}`);
                      }
                    }}
                    className="p-1 m-1 pl-4 rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
                    key={category.id}
                  >
                    {category.label}
                  </p>
                );
              })}
            </div>
          )}

          {/* jobs */}
          {housing === "jobs" && (
            <div className="flex  flex-col">
              <div
                className="p-1 m-1 pl-4 font-bold rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
                onClick={() => {
                  if (!token) {
                    navigate("/jobs");
                  } else {
                    navigate("/dash/jobs");
                  }
                }}
              >
                All Jobs
              </div>
              {subCategoryList.forSale?.map((category) => {
                return (
                  <p
                    onClick={() => {
                      if (token) {
                        navigate(`/dash/jobs/${category.id}`);
                      } else if (!token) {
                        navigate(`/jobs/${category.id}`);
                      }
                    }}
                    className="p-1 m-1 pl-4 rounded-md cursor-pointer shadow-sm shadow-black hover:bg-green-600 hover:text-white"
                    key={category.id}
                  >
                    {category.label}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* sm above */}

      <div className="hidden  xsm:flex flex-row">
        <div className="hidden  lg:w-[30%]  lg:flex flex-col p-1 gap-1 pl-3 pt-3">
          <div className="bg-gradient-to-r from-blue-500 to-pink-500 p-1 rounded-md mt-1">
            <div className="flex flex-row bg-white rounded-md shadow shadow-black  ">
              <img
                src={Nepal}
                alt="flag"
                height={90}
                width={90}
                className="rounded-s-md animate-pulse"
              />
              <p className="text-lg pl-2 p-1 text-blue-700 font-extrabold rounded-e-md bg-gradient-to-r from-yellow-500 to-pink-500">
                Lets make our great country Nepal great again
              </p>
            </div>
            <div className="p-2 text-orange-900 rounded-md text-lg hover:animate-none cursor-pointer font-bold">
              {nepali ? (
                <>
                  <p className="p-1">
                    तपाईंको उत्पादन वा सेवाको विज्ञापन गर्न यो पूर्ण रूपमा नि:
                    शुल्क छ ।
                  </p>
                  <p className="p-1">
                    तपाईले चाहानु भएको केहि पनि राख्न सक्नुहुन्छ किन्न वा बिक्री
                    गर्न ।
                  </p>
                  <p className="p-1">
                    आफ्नो मूल्य आफै राख्नुहोस्, जो कोहीले तपाईलाई सम्पर्क गर्न
                    सक्नुहुन्छ ।
                  </p>
                  <p className="p-1">
                    कुनै दलाल वा बिचौलिया छैन, प्रत्यक्ष किन्नुहोस् वा सीधै
                    बेच्नुहोस् ।
                  </p>
                </>
              ) : (
                <>
                  <p className="p-1">
                    It is completely free of cost to advertise your products or
                    service
                  </p>
                  <p className="p-1">
                    You can put anythings which you would like to sale or buy
                  </p>
                  <p className="p-1">
                    Put your price yourself, anyone can contact you
                  </p>
                  <p className="p-1">
                    No brokers or middlemen exist, buy directly or sell directly
                  </p>
                </>
              )}
            </div>
            <ImageSlider images={images} showPagination={false} />
          </div>

          <div className=" bg-gradient-to-r from-blue-500 to-pink-400 p-2 rounded-md  text-lg flex flex-col items-center ">
            <div className="flex flex-col items-center justify-center bg-white w-full rounded-md px-3">
              <div className="flex flex-row items-center justify-center">
                <p className="text-4xl">🥦 🥬</p>
                <p className="font-semibold px-1 p-4">Your product </p>
                <p className="text-4xl">🍅 🧄</p>
              </div>

              <div className="flex flex-row items-center justify-between border-t-2 border-gray-400 w-ful">
                <p className="text-5xl ">💵</p>
                <p className="font-semibold px-10 "> Your price</p>
                <p className="text-5xl">💸</p>
              </div>
            </div>
            <div className="flex flex-row items-center mb-1 mt-1 justify-around bg-white w-full rounded-md">
              <span className="text-4xl">🧳</span>
              <span className="px-2 font-semibold">No Broker</span>
              <span className="text-3xl">🕵️‍♂️</span>
            </div>
            <div className="flex flex-row items-center justify-around bg-white w-full rounded-md">
              <span className="text-4xl "> 🤝 </span>
              <span className="font-semibold">Connect Directly</span>
              <span className="text-4xl"> 🤝 </span>
            </div>
          </div>

          <div className="">
            <ImageSlider item={itemsForImages} />
          </div>
        </div>
        <div className=" w-full grid grid-cols-3 p-2 gap-1 ">
          <div className="mb-1 ">
            <div className="flex flex-col p-2 gap-1 min-w-fit ">
              <h1
                //onClick={() => navigate("/housing")}
                onClick={() => {
                  if (!token) {
                    navigate("/housing");
                  } else {
                    navigate("/dash/housing");
                  }
                }}
                className="hover:bg-gradient-to-l hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md shadow-black mb-1  p-1 text-xl font-bold  w-full text-center cursor-pointer hover:shadow-orange-900 rounded-md "
              >
                Housing
              </h1>
              {subCategoryList.housing?.map((category) => {
                return (
                  <p
                    //onClick={() => navigate(`/housing/${category.id}`)}
                    onClick={() => {
                      if (!token) {
                        navigate(`/housing/${category.id}`);
                      } else {
                        navigate(`/dash/housing/${category.id}`);
                      }
                    }}
                    className="shadow-black shadow-sm rounded-md hover:bg-gradient-to-l hover:text-white  p-1 pl-4 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500"
                    key={category.id}
                  >
                    {category.label}
                  </p>
                );
              })}
            </div>
            <div className="flex flex-col p-2  gap-1 mt-1 ">
              <p
                onClick={() => {
                  if (!token) {
                    navigate("/services");
                  } else {
                    navigate("/dash/services");
                  }
                }}
                className="hover:bg-gradient-to-l hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md shadow-black mb-1  p-1 text-xl font-bold  w-full text-center cursor-pointer hover:shadow-orange-900 rounded-md "
              >
                Service
              </p>

              {subCategoryList.services?.map((category) => {
                return (
                  <p
                    onClick={() => {
                      if (!token) {
                        navigate(`/services/${category.id}`);
                      } else {
                        navigate(`/dash/services/${category.id}`);
                      }
                    }}
                    className="shadow-black shadow-sm rounded-md hover:bg-gradient-to-l hover:text-white  p-1 pl-4 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500"
                    key={category.id}
                  >
                    {category.label}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="w-full flex flex-col p-2  gap-1 mb-1">
            <p
              onClick={() => {
                if (!token) {
                  navigate("/forSale");
                } else {
                  navigate("/dash/forSale");
                }
              }}
              className="hover:bg-gradient-to-l hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md shadow-black mb-1  p-1 text-xl font-bold  w-full text-center cursor-pointer hover:shadow-orange-900 rounded-md "
            >
              For Sale
            </p>
            {subCategoryList.forSale?.map((category) => {
              return (
                <p
                  onClick={() => {
                    if (!token) {
                      navigate(`/forSale/${category.id}`);
                    } else {
                      navigate(`/dash/forSale/${category.id}`);
                    }
                  }}
                  className="shadow-black shadow-sm rounded-md hover:bg-gradient-to-l hover:text-white  p-1 pl-4 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500"
                  key={category.id}
                >
                  {category.label}
                </p>
              );
            })}
          </div>
          <div className=" w-full flex flex-col p-2  gap-1 capitalize ">
            <p
              onClick={() => {
                if (!token) {
                  navigate("/jobs");
                } else {
                  navigate("/dash/jobs");
                }
              }}
              className="hover:bg-gradient-to-l hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md shadow-black mb-1  p-1 text-xl font-bold  w-full text-center cursor-pointer hover:shadow-orange-900 rounded-md "
            >
              Jobs
            </p>

            {subCategoryList.jobs?.map((category) => {
              return (
                <p
                  onClick={() => {
                    if (!token) {
                      navigate(`/jobs/${category.id}`);
                    } else {
                      navigate(`/dash/jobs/${category.id}`);
                    }
                  }}
                  className="shadow-black shadow-sm rounded-md hover:bg-gradient-to-l hover:text-white  p-1 pl-4 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500"
                  key={category.id}
                >
                  {category.label}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
