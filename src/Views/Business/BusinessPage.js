import React,{useState} from "react";
import DetailSnipet from "./DetailSnipet";
import { useHistory, } from "react-router-dom";
import { PreselectedValues } from "../../utils/PreselectedData";
import { useSelector } from "react-redux";


const BusinessPage = () => {
  const [uImg, setUimg] = useState(
    "https://gapkindo.org/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
  );
  const history = useHistory();
  //redux
  const bState = useSelector(({ userReducer }) => userReducer.business);
  //in-state

  return (
    <div className="grid-container">
      <div className="right">
        <div className="right-content">
          <div className="bari">
            <p>Business Information</p>
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              className="icon"
              src={bState["image"]}
              alt="icon"
            />
          </div>
          <div className="top">
            <img className="icon" src={bState["image"] ?bState["image"] : uImg} alt="icon" />
            <h5 className="title">{bState["title"]}</h5>
          </div>
          <div className="mid">
            <div className="mid-left">
              <DetailSnipet title="Email Address" value={bState["email"]} />
              <DetailSnipet
                title="Phone Number"
                value={bState["phone_number2"]}
              />
              <DetailSnipet
                title="Digital Address"
                value={bState["location"]}
              />
              <DetailSnipet title="Website" value={bState["website"]} />
            </div>
            <div className="mid-right">
              <DetailSnipet
                title="Town"
                value={bState["city"] ?
                  PreselectedValues.getTownValueWithCode(bState["city"]) : ""}
              />
              <DetailSnipet title="Region"
                value={bState["region"] ?
                  PreselectedValues.getRegionValueWithCode(bState["region"]) : ""} />
              <DetailSnipet title="Category"
                value={bState["category"] ?
                  PreselectedValues.getCategoryValueWithCode(bState["category"]) : ""} />
            </div>
          </div>
          <div className="desc">
            <p>DESCRIPTION</p>
            <p>{bState["description"]}</p>
          </div>
          <div className="lower">
            <button
              onClick={() => {
                history.push("/business-page-edit");
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

export default BusinessPage;
