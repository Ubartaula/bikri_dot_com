import { useSelector } from "react-redux";
import { currentToken } from "../feature/auth/authSlice";
import jwtDecode from "jwt-decode";

const useToken = () => {
  const token = useSelector(currentToken);

  if (token) {
    const decodedToken = jwtDecode(token);
    const { email, phoneNumber, role, userId, lat, lng, firstName, lastName } =
      decodedToken?.UserInfo;

    return {
      email: email,
      phoneNumber: phoneNumber,
      role: role,
      userId: userId,
      lat: lat,
      lng: lng,
      firstName: firstName,
      lastName: lastName,
    };
  }

  return {
    email: "",
    phoneNumber: "",
    role: "",
    userId: "",
    lng: "",
    lat: "",
    firstName: "",
    lastName: "",
  };
};

export default useToken;
