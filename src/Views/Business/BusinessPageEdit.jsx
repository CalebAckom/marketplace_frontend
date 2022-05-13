import { Add, Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import EditSnipet from "./EditSnipet";
import { PreselectedValues } from "../../utils/PreselectedData.js";
import BusinessService from "../../services/BusinessService";

import UploadBox from "./UploadBox";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBusinessDetails } from "../../services/features/slices/userSlice";

const New_BusinessPage = ({ setIsLog }) => {
  const [imagePrvFileSrc, setImagePrvFileSrc] = useState(
    "https://gapkindo.org/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
  );
  const [editRes, setEditRes] = useState({ msg: "", hint: false });
  //redux
  const bState = useSelector(({ userReducer }) => userReducer.business);
  const dispatch = useDispatch();

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [website, setWebsite] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [digitalAddr, setDigAddr] = useState("");

  const [source, setsource] = useState(PreselectedValues.getCategoriesValues());


  //data to be sent
  // const [outData, setOutData] = useState({});
  //trigger to change profile image
  const [triggerProfileChange, setTriggerProfileChange] = useState(false);

  //function to initiate update
  async function doUpdateBusiness(body) {
    if (website.substring(0, 11) !== "http://www.") {
      if (website.substring(0, 4) === "www.") {
        setWebsite((prev) => {
          return "http://".concat(prev);
        });
      } else {
        setWebsite((prev) => {
          return "http://www.".concat(prev);
        });
      }
    }
    if (title === "" || phone === "" || digitalAddr === "") {
      setEditRes((prev) => {
        return { ...prev, msg: "Important fields are empty", hint: true };
      });
    } else {
      const Response = await BusinessService.updateBusinessDetails(body);
      if (Response.status === 200) {
        dispatch(fetchBusinessDetails());
        setEditRes((prev) => {
          return { ...prev, msg: "Update complete", hint: true };
        });
        history.push("/business-page");
      } else {
        setEditRes((prev) => {
          return { ...prev, msg: "An error occured", hint: true };
        });
      }
    }
  }

  async function getDetails() {
    console.log(PreselectedValues.getTownValueWithCode(bState["city"]), 'city')
    setTitle(bState["title"]);
    setEmail(bState["email"]);
    setPhone(bState["phone_number2"]);
    setDigAddr(bState["location"]);
    setWebsite(bState["website"]);

    if (bState["region"]) {
      setRegion(PreselectedValues.getRegionValueWithCode(bState["region"]));
    }
    if (bState["category"]) {
      setCategory({ data: PreselectedValues.getCategoryValueWithCode(bState["category"]) });
    }
    if (bState["city"]) {
      setTown({ data: PreselectedValues.getTownValueWithCode(bState["city"]) });
    }
    setDesc(bState["description"]);
    if (bState["image"]) {
      setImagePrvFileSrc(bState["image"]);
    } else {
      setImagePrvFileSrc("images/Profile_Icon.png");
    }
  }

  useEffect(() => {
    getDetails();
    setsource(PreselectedValues.getCategoriesValues());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="busi-wrapper">
      <div className="busi-header">
        <h3>Edit Information</h3>
        <button
          onClick={() => {
            history.push("/business-Page")
          }}
        >
          View Profile
        </button>
      </div>
      <div className="busi-content">
        <div className="header">
          <section>
            <img src={imagePrvFileSrc} />
            <label
              htmlfor="imgUpload"
              onClick={() => {
                //this toggles the profile image edit box
                setTriggerProfileChange(true);
              }}
            >
              <Add />
            </label>
          </section>
        </div>
        <div className="body">
          <div className="content-1">
            <div className="content-1-left">
              <EditSnipet
                value={title}
                setValue={setTitle}
                title="ORGANIZATION TITLE"
                important={true}
                intent="text"
              />
              <EditSnipet
                value={email}
                setValue={setEmail}
                title="EMAIL ADDRESS"
                important={false}
                intent="text"
                disabled={true}
              />
              <EditSnipet
                value={town.data}
                setValue={setTown}
                title="TOWN"
                important={false}
                intent="cbo"
                source={PreselectedValues.getTownValues()}
                setRegionValue={setRegion}
              />
            </div>
            <div className="content-1-center"></div>
            <div className="content-1-right">
              <EditSnipet
                value={phone}
                setValue={setPhone}
                title="PHONE NUMBER"
                important={true}
                intent="text"
              />
              <EditSnipet
                value={category.data}
                setValue={setCategory}
                title="CATEGORY"
                important={false}
                source={source}
                intent="cbo"
                // source={PreselectedValues.getCategoriesValues()}
              />
              <EditSnipet
                value={website}
                setValue={setWebsite}
                title="WEBSITE"
                important={false}
                intent="text"
              />
            </div>
          </div>
          <div className="content-2">
            <EditSnipet
              title="DESCRIPTION"
              value={desc}
              setValue={setDesc}
              intent="text-area"
            />
          </div>
          <div className="content-3">
            <div className="content-1-left">
              <EditSnipet
                title="DIGITAL ADDRESS"
                important={true}
                value={digitalAddr}
                setValue={setDigAddr}
                intent="text"
              />
            </div>
            <div className="content-1-center"></div>
            <div className="content-1-right">
              <EditSnipet
                title="REGION"
                value={region}
                setValue={setRegion}
                intent="cbo"
                source={PreselectedValues.getRegionValues()}
                disabled={true}
              />
            </div>
          </div>
          <div className="content-4-footer">
            <button
              onClick={() => {
                if (website.substring(0, 11) !== "http://www.") {
                  if (website.substring(0, 4) === "www.") {
                    setWebsite((prev) => {
                      return "http://".concat(prev);
                    });
                  } else {
                    setWebsite((prev) => {
                      return "http://www.".concat(prev);
                    });
                  }
                }
                doUpdateBusiness({
                  title,
                  email,
                  phone_number2: phone,
                  category:
                    category !== PreselectedValues.getCategoryDefault()
                      ? PreselectedValues.getCategoryCode(category.data)
                      : "",
                  description: desc,
                  website: website,
                  region:
                    region !== PreselectedValues.getRegionDefault()
                      ? PreselectedValues.getRegionCode(region)
                      : "",
                  city: PreselectedValues.getTownCode(town.data),
                  location: digitalAddr,
                });
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {triggerProfileChange && (
        <UploadBox
          setTrigger={setTriggerProfileChange}
          setImage={setImagePrvFileSrc}
        />
      )}
      {editRes["hint"] && (
        <MessageModal
          close={setEditRes}
          msg={editRes["msg"]}
          style={{ height: "130vh" }}
          isLoader={title}
        />
      )}
    </div>
  );
};

export default New_BusinessPage;

export const MessageModal = ({ msg, isButton, close, style, isDialog, action }) => {
  return (
    <div className="signup-go-confirm" style={{ ...style }}>
      <div className="click-box">
        {!isButton && (
          <Close
            className="icon"
            onClick={() => {
              close(false);
            }}
          />
        )}
        <p>{msg}</p>
        {isDialog ?
          <div className="dialog">
            <button className="affirm" onClick={action}>Yes</button>
            <button className="deny" onClick={close(false)}>No</button>
          </div>
          :
          isButton && (
            <button
              onClick={() => {
                close(false);
              }}
            >
              Confirm account
            </button>)
        }


      </div>
    </div>
  );
};

{
  /* <div className="loader-wrapper">
          <div className="loader"></div>
        </div> */
}
