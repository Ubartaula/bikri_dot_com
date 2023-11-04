import React, { useEffect } from "react";
import { useAddItemMutation } from "./itemApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useProvinces from "../../hooks/useProvinces";
import Loading from "../../lib/Loading";
import useToken from "../../hooks/useToken";

const AddItem = () => {
  const { userId, role, email: userEmail, phoneNumber: userPhone } = useToken();

  const navigate = useNavigate();
  const { categoryList, subCategoryList } = useCategory();
  const { provinces, districts } = useProvinces();
  const [addItemMutation, { isLoading, isSuccess }] = useAddItemMutation();

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [selectProvince, setSelectProvince] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(userPhone || "");
  const [email, setEmail] = useState(userEmail || "");
  const [itemInfo, setItemInfo] = useState("");
  const [images, setImages] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const trueUpload = images?.length <= 4;

  // to get subcategory id
  const getSubCategoryObj = subCategoryList[category]?.find(
    (sCi) => sCi.label === subCategory
  );

  // working on category
  const listCategory = categoryList.map((category, i) => {
    return (
      <option key={i} value={category}>
        {category}
      </option>
    );
  });

  const listSubCategory = subCategoryList[category]?.map((subCategory) => {
    return (
      <option className="" key={subCategory.id} value={subCategory.label}>
        {subCategory?.label}
      </option>
    );
  });

  // end of category

  // work on location
  const listOfProvince = provinces.map((province) => {
    return (
      <option key={province} value={province}>
        {province}
      </option>
    );
  });

  const listOfDistrict = districts[selectProvince]?.map((district) => {
    return (
      <option key={district} value={district}>
        {district}
      </option>
    );
  });
  //end of location work

  // capture latitude and Longitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = position.coords;
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, []);

  const handleAddItemFormData = async () => {
    try {
      const formData = new FormData();
      formData.append("user", userId);
      formData.append("itemName", itemName);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("subCategoryID", getSubCategoryObj?.id);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("province", selectProvince);
      formData.append("district", selectDistrict);
      formData.append("city", city);
      formData.append("itemInfo", itemInfo);
      formData.append("lat", latitude);
      formData.append("lng", longitude);

      for (let i = 0; i < images?.length; i++) {
        formData.append("images", images[i]);
      }

      await addItemMutation(formData);
    } catch (error) {
      if (!error.status) {
        setErrMsg("ERR_CONNECTION_REFUSED");
      } else {
        setErrMsg(error);
      }

      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess && category === "housing") {
      navigate("/dash/housing");
    } else if (isSuccess && category === "service") {
      navigate("/dash/service");
    } else if (isSuccess && category === "jobs") {
      navigate("/dash/jobs");
    } else if (isSuccess && category === "forSale") {
      navigate("/dash/forSale");
    }
  }, [isSuccess, navigate]);

  const formFillUpCheck =
    itemName.length > 0 &&
    category.length > 0 &&
    subCategory.length > 0 &&
    quantity.length > 0 &&
    price.length > 0 &&
    selectProvince.length > 0 &&
    selectDistrict.length > 0 &&
    city.length > 0 &&
    email?.toString()?.length > 0 &&
    itemInfo.length > 0;

  const showFormFilUpMessage = () => {
    const formFilUpMessage = !itemName
      ? setErrMsg("Name or title of post need to provide")
      : !category
      ? setErrMsg("Select Category")
      : !subCategory
      ? setErrMsg("Select SubCategory")
      : !quantity
      ? setErrMsg("Provide Quantity")
      : !price
      ? setErrMsg("Need to provide price")
      : !selectProvince
      ? setErrMsg("Select Province")
      : !selectDistrict
      ? setErrMsg("Select District")
      : !city
      ? setErrMsg("Provide City or Village")
      : !email
      ? setErrMsg("Provide email address")
      : !itemInfo
      ? setErrMsg("Provide description ")
      : "";
    return formFilUpMessage;
  };

  useEffect(() => {
    setErrMsg("");
  }, [
    itemInfo,
    itemName,
    selectDistrict,
    selectProvince,
    category,
    subCategory,
    quantity,
    price,
    phoneNumber,
    email,
    city,
  ]);

  return (
    <>
      {!role && (
        <div className="flex flex-col  items-center justify-center p-5">
          <div className="text-2xl animate-pulse p-4">
            <p className="p-4">Please sign in to your account to post</p>

            <p className="p-4">
              कृपया पोस्ट गर्न आफ्नो खातामा साइन इन गर्नुहोस्
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white p-2 w-[10rem] rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        </div>
      )}
      <>
        {role && (
          <form
            name=""
            id=""
            onSubmit={(e) => e.preventDefault()}
            className=" p-2 sm:p-4 px-4 m-auto w-full max-w-fit text-black
         bg-gray-50 border border-gray-300 rounded-md
         "
          >
            <div
              aria-live="assertive"
              className="text-xl text-red-600 text-center"
            >
              {errMsg}
            </div>
            <div className="sm:flex sm:flex-row p-2">
              <div className="sm:min-w-[50%] p-2">
                <div className="mb-1 flex flex-col ">
                  <label htmlFor="" className="px-1">
                    Category
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className=" capitalize border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  >
                    <option>select...</option>
                    {listCategory}
                  </select>
                </div>
                <div className="mb-1 flex flex-col ">
                  <label htmlFor="" className="px-1">
                    Sub Category
                  </label>
                  <select
                    required
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  >
                    <option>select...</option>
                    {listSubCategory}
                  </select>
                </div>

                <div className="mb-1 flex flex-col ">
                  <label htmlFor="" className="px-1">
                    Title
                  </label>
                  <input
                    maxLength={50}
                    placeholder="mention your purpose..."
                    required
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Quantity
                  </label>
                  <input
                    maxLength={10}
                    required
                    type="text"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Price / Amount
                  </label>
                  <input
                    maxLength={10}
                    required
                    type="text"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Contact phone number
                  </label>
                  <input
                    maxLength={15}
                    required
                    type="text"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Contact email
                  </label>
                  <input
                    maxLength={50}
                    required
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
              </div>
              <div className="sm:min-w-[50%] p-2">
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Province
                  </label>
                  <select
                    required
                    value={selectProvince}
                    onChange={(e) => setSelectProvince(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  >
                    <option value="">select...</option>
                    {listOfProvince}
                  </select>
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    District
                  </label>
                  <select
                    required
                    value={selectDistrict}
                    onChange={(e) => setSelectDistrict(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  >
                    <option value="">select...</option>
                    {listOfDistrict}
                  </select>
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    City / Village
                  </label>
                  <input
                    maxLength={50}
                    required
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Descriptions
                  </label>
                  {itemInfo && (
                    <p className="px-1 text-sm text-yellow-700">{`You have ${
                      120 - itemInfo?.length
                    } character left...`}</p>
                  )}
                  <textarea
                    placeholder={`You have ${
                      120 - itemInfo?.length
                    } character left...`}
                    required
                    maxLength={120}
                    type="text"
                    value={itemInfo}
                    onChange={(e) => setItemInfo(e.target.value)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
                <div
                  aria-live="assertive"
                  className="text-red-500 text-sm font-semibold"
                >
                  {images?.length > 4 ? "max 4 photos can upload" : ""}
                </div>
                <div className="mb-1 flex flex-col">
                  <label htmlFor="" className="px-1">
                    Image/photo
                  </label>
                  <input
                    multiple
                    type="file"
                    name="images"
                    onChange={(e) => setImages(e.target.files)}
                    className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mb-3 pl-3 pr-4">
              <button
                onClick={() => {
                  if (!formFillUpCheck) {
                    showFormFilUpMessage();
                  } else if (formFillUpCheck) {
                    handleAddItemFormData();
                  }
                }}
                className="bg-blue-600 text-white p-2 w-[7rem] rounded-lg hover:bg-green-600 shadow-sm shadow-black"
              >
                Submit
              </button>
            </div>
            {isLoading && <Loading />}
          </form>
        )}
      </>
    </>
  );
};

export default AddItem;
