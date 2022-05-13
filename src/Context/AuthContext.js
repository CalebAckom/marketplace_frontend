import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory} from "react-router-dom";
import { BASE_URL, LOCALHOST_AUTH_TOKENS } from "../utils/config";
//redux
import { useDispatch,useSelector } from "react-redux";
import { fetchBusinessDetails, fetchPersonalDetails } from "../services/features/slices/userSlice";
import { createCartKey, getAllCart } from "../services/features/slices/CartSlice";

const AuthContext = createContext(null);
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem(LOCALHOST_AUTH_TOKENS)
      ? JSON.parse(localStorage.getItem(LOCALHOST_AUTH_TOKENS))
      : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwt_decode(authTokens.access) : null
  );
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  var [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false); // trigger
  var [timer, setTimer] = useState(false);
  let [imageupload, setImageUpload] = useState(false);
  let [data, setData] = useState([]);

  const history = useHistory();

  //redux
  const dispatch = useDispatch(); 
  const cartKey = useSelector(state => state.cr.cartKey);
  const userDoc = useSelector((state) => state.userReducer.userDoc)

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  const disableComponents = () => {
    setDisabled(!isDisabled);
  };


  const Completionist = () => (
    <span style={{ color: "green" }}>You are good to go!</span>
  );

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShow(false);
    setTimer(false);
    try {
      const res = await fetch(`${BASE_URL}/auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authentication_property: e.target.authentication_property.value,
          password: e.target.password.value,
        }),
      });
      const data = await res.json();
      setData(data);
      setLoading(false);
      console.log("res", res);
      console.log("data", data);
      if (res.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem(LOCALHOST_AUTH_TOKENS, JSON.stringify(data));
        localStorage.setItem("mk_access", data["access"]);
        localStorage.setItem("mk_refresh", data["refresh"]);
        localStorage.setItem("mk_user", JSON.stringify(data["user"]));
        if (data["user"]["is_organization"]) {
          dispatch(fetchBusinessDetails());
          history.push("/")
        } else if(data["user"]["is_staff"]) {
          dispatch(fetchBusinessDetails());
          dispatch(fetchPersonalDetails());
          history.push("/amali-tech-adminpage")     
        }else{
          dispatch(fetchPersonalDetails());
          dispatch(createCartKey())  
          history.push("/")  
        }

      
        // console.log('staff', userDoc.isStaff)
        // if(userDoc.isStaff === true){
        //   history.push("/amali-tech-adminpage")
        // }else{
        //   alert("Sorry admin")
        //   window.location.reload()
        // }
        setLoading(false);
        setShow(false);
      } else if (res.status === 400) {
        setMessage("A field must not be blank!");
        setIsLoading(false);
        setShow(true);
        setTimer(false);
      } else if (res.status === 401) {
        setMessage("Email or password is not correct!");
        setIsLoading(false);
        setShow(true);
        setTimer(false);
      } else if (res.status === 403) {
        console.log(data.detail);
        disableComponents();
        setMessage(
          "Too many failed login attempts! Please try again in the next one minute"
        );
        setIsLoading(false);
        setShow(true);
        setTimer(true);
      } else if (res.status === 404) {
        console.log(data.detail);
        setMessage("User Not Found in our Database");
        setIsLoading(false);
        setShow(true);
        setTimer(false);
      } else if (res.status === 500) {
        console.log(data.detail);
        setMessage("Internal Server Error, Please Contact Site Administrator!");
        setIsLoading(false);
        setShow(true);
        setTimer(false);
      }
    } catch (e) {
      setMessage("Network Error or Something went wrong!");
      console.log("Error: " + e.message);
      setIsLoading(false);
      setShow(true);
      setTimer(false);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem(LOCALHOST_AUTH_TOKENS);
    localStorage.removeItem("mk_access", data["access"]);
    localStorage.removeItem("mk_refresh");
    localStorage.removeItem("mk_user");
    setLoading(false);
    setShow(false);
    setTimer(false);
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    isDisabled: isDisabled,
    message: message,
    loading: loading,
    isLoading: isLoading,
    show: show,
    timer: timer,
    imageupload: imageupload,
    setImageUpload: setImageUpload,
    Completionist: Completionist,
    setTimer: setTimer,
    setShow: setShow,
    setLoading: setLoading,
    setIsLoading: setIsLoading,
    setDisabled: setDisabled,
    setUser: setUser,
    setAuthTokens: setAuthTokens,
    setMessage: setMessage,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
