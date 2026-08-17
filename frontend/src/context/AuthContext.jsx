import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState
} from "react";

export const AuthContent = createContext();

const AuthContext = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Important: authentication has not been checked yet
  const [authLoading, setAuthLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {

      const { data } = await axios.get("/api/user/userData");

      if (data.success) {
        setUserData(data.userData);
      }

    } catch (error) {
      console.log(
        "getUser failed:",
        error.response?.status,
        error.response?.data
      );
    }
  };

  const getIsAuthenticated = async () => {
    try {

      const { data } = await axios.get("/api/auth/isAuth");

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
      }

    } catch (error) {

      console.log(
        "isAuth failed:",
        error.response?.status,
        error.response?.data
      );

      setIsLoggedIn(false);
      setUserData(null);

    } finally {

      // Authentication check is finished
      setAuthLoading(false);

    }
  };

  useEffect(() => {
    getIsAuthenticated();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,

    userData,
    setUserData,

    getUserData,

    authLoading
  };

  return (
    <AuthContent.Provider value={value}>
      {props.children}
    </AuthContent.Provider>
  );
};

export default AuthContext;