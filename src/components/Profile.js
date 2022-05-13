import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { useHistory, Route, Redirect } from "react-router-dom";
import { LOCALHOST_AUTH_TOKENS } from "../utils/config";
import "../../src/Views/Business/BusinessStyle.scss"
import DetailSnipet from  "../../src/Views/Business/DetailSnipet"
import ProfilePageService from "../services/ProfileService";
// import ProfileService from "../services/ProfileService";
import { PreselectedValues } from "../utils/PreselectedData";

const Profile = ({ setIsLog, setUimg }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);


  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [name, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number2, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [street_address, setStreetAddress] = useState("");
  const [region, setRegion] = useState("");
  const [privacy_level, setPrivacyLevel] = useState("");
  const [gps_location, setDigitalAddress] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState({preview:"https://www.kindpng.com/picc/m/146-1468338_icon-profile-blue-transparent-hd-png-download.png", raw:""});


  useEffect(() => {
    if (user) {
      localStorage.setItem("p-img", image); 
      setIsLog(true);
      setUimg(image); 
    } else {
      localStorage.removeItem(LOCALHOST_AUTH_TOKENS);
      localStorage.removeItem("mk_access");
      localStorage.removeItem("mk_refresh");
      window.location.href = "/login";
    }
  }, []);

  useEffect(async () => {
    // setIsLog(true);
    // if (user) {
    //   setIsLog(true);
    // } else {
    //   window.location.href = "/login";
    // }
    const { data, status } = await ProfilePageService.getProfileDetails();
    console.log("business Page ", Response);
    if (status === 200) {
      setEmail(data.user["email"]);
      setFirstname(data["first_name"]);
      setLastname(data["last_name"]);
      setOthername(data["name"]);
      setDigitalAddress(data["gps_location"]);
      setPhone(data["phone_number2"]);
      setCountry(data["country"]);
      setBirthday(data["birthday"]);
      setImage(data["image"]);
      setPrivacyLevel(data["privacy_level"]);
      setGender(data["gender"]);
      if (data["region"]) {
        setRegion(PreselectedValues.getRegionValueWithCode(data["region"]));
      }
      setStreetAddress(data["street_address"]);
      if (data["image"]) {
        setImage(data["image"]);
        setUimg(data["image"]);
        localStorage.setItem("p-img", data["image"]);
      } else {
        setImage(image.preview);
      }
    } else if (status === 401) {
    }
  }, []);
  return (
    <div className="grid-container">
      <div className="right">
        <div className="right-content">
          <div className="bari">
            <p>Personal Information</p>
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              className="icon"
              src={image}
            />
          </div>
          <div className="top">
            <img className="icon" src={image} />
            <h5 className="title">{first_name} {name} {last_name}</h5>
          </div>
          <div className="mid">
            <div className="mid-left">
            <DetailSnipet title="Email Address" value={email} />
          <DetailSnipet title="Phone Number" value={phone_number2} />
          <DetailSnipet title="Street Address" value={street_address} />
          <DetailSnipet title="Privacy Level" value={privacy_level} />
            </div>
            <div className="mid-right">
            <DetailSnipet title="Gender" value={gender} />
          <DetailSnipet title="Region" value={region} />
          <DetailSnipet title="Birthday" value={birthday} />
          <DetailSnipet title="Digital Address" value={gps_location} />
            </div>
          </div>
          <div className="lower">
            <button
              onClick={() => {
                window.location.href ="/edit-profile";
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
