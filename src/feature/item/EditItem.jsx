import React, { useEffect } from "react";
import { useEditItemMutation, useGetItemsQuery } from "./itemApiSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useProvinces from "../../hooks/useProvinces";
import Loading from "../../lib/Loading";

const EditItem = () => {
  const { id } = useParams();
  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  //const { userId, role, email: userEmail, phoneNumber: userPhone } = useToken();

  const navigate = useNavigate();
  const { categoryList, subCategoryList } = useCategory();
  const { provinces, districts } = useProvinces();

  const [itemName, setItemName] = useState(item?.itemName || "");
  const [category, setCategory] = useState(item?.category || "");
  const [subCategory, setSubCategory] = useState(item?.subCategory || "");
  const [quantity, setQuantity] = useState(item?.quantity || "");
  const [price, setPrice] = useState(item?.price || "");

  const [selectProvince, setSelectProvince] = useState(item?.province || "");
  const [selectDistrict, setSelectDistrict] = useState(item?.district || "");
  const [city, setCity] = useState(item?.city || "");

  const [phoneNumber, setPhoneNumber] = useState(item?.phoneNumber || "");
  const [email, setEmail] = useState(item?.email || "");
  const [itemInfo, setItemInfo] = useState(item?.itemInfo || "");
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

  const [editItemMutation, { isLoading, isSuccess }] = useEditItemMutation();

  const formData = new FormData();
  formData.append("id", item?._id);
  formData.append("user", item?.user?._id);
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

  const handleEditItem = async () => {
    try {
      const res = await editItemMutation(formData);
      console.log("form data response", res.data);
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
    if (isSuccess) {
      navigate(`/dash/profile`);
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <form
        name=""
        id=""
        onSubmit={(e) => e.preventDefault()}
        className=" p-2 sm:p-4 px-4 m-auto w-full max-w-fit text-black
         bg-gray-50 border border-gray-300 rounded-md shadow-md shadow-black
         "
      >
        <div aria-live="assertive">{errMsg}</div>
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
                placeholder={item?.itemName}
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
                placeholder={item?.user?.email}
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
            onClick={handleEditItem}
            disabled={
              !(
                itemName &&
                quantity &&
                price &&
                (phoneNumber || email) &&
                itemInfo &&
                trueUpload
              )
            }
            className={`${
              itemName &&
              quantity &&
              price &&
              (phoneNumber || email) &&
              itemInfo &&
              trueUpload
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l text-white"
                : "bg-slate-300 "
            }    p-1 px-6 rounded-md  shadow-md shadow-black w-full`}
          >
            Submit
          </button>
        </div>
        {isLoading && <Loading />}
      </form>
    </>
  );
};

export default EditItem;
