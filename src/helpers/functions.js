import jwtDecode from "jwt-decode";

export const getUserInfo = () => {
  let userCredentials = localStorage.getItem("userData");
  const userObject = jwtDecode(userCredentials);
  return userObject;
};
