import React, { useEffect, useState } from "react";
import { useGetUsersQuery } from "./userApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ id }) => {
  const navigate = useNavigate();
  const { user } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  // working to display users place
  const lat = user?.lat;
  const lng = user?.lng;
  const [location, setLocation] = useState("");
  const getLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data) {
        setLocation(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lat && lng) {
      getLocation();
    }
  }, [lat, lng]);

  // end of location

  const road =
    location?.address?.road ||
    location?.address?.suburb ||
    location?.address?.neighbourhood;

  const cityVillage =
    location?.address?.municipality || location?.address?.city;
  const postcode =
    location?.address?.city_district || location?.address?.postcode;
  const country = location?.address?.country;
  const countyOrDistrict =
    location.address?.county || location?.address?.municipality;

  const content = (
    <div className="p-3 bg-white mx-auto w-full max-w-3xl ">
      <div className="p-2 bg-slate-200 flex flex-col border border-gray-700 rounded-md">
        <p className=" font-bold">User Email / Phone</p>
        <p className="">
          {user?.email && user?.phoneNumber
            ? `${user?.email} , ${user?.phoneNumber}`
            : user?.email || user?.phoneNumber}
        </p>

        <p className=" font-bold">Role</p>
        <p className="">{user?.role}</p>
        <p className=" font-bold">Status</p>
        <p className="">{user?.status || " -"}</p>

        <div className="my-3 pl-2">
          <p className=" underline underline-offset-4 font-bold">Location</p>
          <p>Road - {road}</p>
          <p>City/Village - {cityVillage}</p>
          <p>County / District - {countyOrDistrict}</p>

          <p>State - {location?.address?.state}</p>
          <p>Country - {country}</p>
          <p>Postal Code / Woda No - {postcode}</p>
        </div>

        <button
          onClick={() => navigate(`/dash/users/${user?.id}`)}
          className="p-1 px-2 text-white bg-pink-500 rounded-md hover:bg-green-600 my-3"
        >
          Edit
        </button>
      </div>
    </div>
  );

  return content;
};

export default React.memo(User);
