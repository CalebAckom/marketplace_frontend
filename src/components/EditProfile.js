import React, { useState, useContext, useEffect } from "react";
import "../../src/Views/Business/NBusiStyle.scss"
import AuthContext from "../Context/AuthContext";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Modal, Col, Row, Button } from "react-bootstrap";
import { BASE_URL, LOCALHOST_AUTH_TOKENS } from "../utils/config";
import EditSnipet from "../Views/Business/EditSnipet";
import ProfilePageService from "../services/ProfileService";
import { PreselectedValues } from "../utils/PreselectedData";



const EditProfile = ({ setIsLog, setUimg }) => {

  let {
    data,
    user,
    message,
    setMessage,
    show,
    imageupload,
    isLoading,
    isDisabled,
    setImageUpload,
    setShow,
    setIsLoading,
    authTokens,
    setUser,
    setAuthTokens,

  } = useContext(AuthContext);
 
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [name, setOthername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number2, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("Female");
  const [street_address, setStreetAddress] = useState("");
  const [region, setRegion] = useState("");
  const [privacy_level, setPrivacyLevel] = useState("");
  const [gps_location, setDigitalAddress] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState({preview:"https://gapkindo.org/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", raw:""});
  const [prompt_title, setPromptTitle] = useState('');
  const [prompt_body, setPromptBody] = useState('');
  const [link_to, setLinkTo] = useState('');
  const [link_text, setLinkText] = useState('');
  const history = useHistory();

 

  async function doUpdateProfile(body) {
    console.log(body);
    const Response = await ProfilePageService.updateProfileDetails(body);
    console.log("after update response => ", Response);
    if (first_name.length === 0 ) {
      callPrompt(
        'Change Firstname',
        '',
        'Close',
        'Firstname field can not be empty'
      );
      //setShow(true);
      setMessage("Firstname Field Cannot be Empty!");
      setImageUpload(false);
      return;
    }
    if (last_name.length === 0) {
      callPrompt(
        'Change Lastname',
        '',
        'Close',
        'Lastname field can not be empty'
      );
      // setShow(true);
      setMessage("Lastname Field Cannot be empty!");
      setImageUpload(false);
      return;
    }
    if (  gps_location.length === 0) {
      callPrompt(
        'Change DigitalAddress',
        '',
        'Close',
        'Digital Address field can not be empty'
      );
      // setShow(true);
      setMessage("Digital Address Field Cannot be empty!");
      setImageUpload(false);
      return;
    }
    if (street_address.length ===0) {
      callPrompt(
        'Change StreetAddress',
        '',
        'Close',
        'Street Address field can not be empty'
      );
      // setShow(true);
      setMessage("Street Address Field Cannot be empty!");
      setImageUpload(false);
      return;
    }
    // Validate length
    if (phone_number2.length < 8) {
      callPrompt(
        'Phone number',
        '',
        'Close',
        'Check phonenumber: Phone number should 10 characters long'
      );
      setMessage("Phone Number Cannot be empty!");
      // setShow(true);
      setImageUpload(false);
      return;
    }
callPrompt('Change Profile', '', 'Close', 'Profile Successfully Updated');
setShow(true);
setMessage("Profile Successfully Updated!");
setImageUpload(false);
  }

  const imageHandler = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  useEffect(async () => {
    if (user) {
      setIsLog(true);
    } else {
      localStorage.removeItem(LOCALHOST_AUTH_TOKENS);
      localStorage.removeItem("mk_access");
      localStorage.removeItem("mk_refresh");
      window.location.href = "/login";
    }
    const { data, status } = await ProfilePageService.getProfileDetails();
    if (status === 200) {
      setEmail(data.user["email"]);
      setFirstname(data["first_name"]);
      setLastname(data["last_name"]);
      setOthername(data["name"]);
      setDigitalAddress(data["gps_location"]);
      setPhone(data["phone_number2"]);
      setCountry(data["country"]);
      setBirthday(data["birthday"]);
      if (data["image"]) {
        setImage(data["image"]);
        setUimg(data["image"]);
        localStorage.setItem("p-img", data["image"]);
      } else {
        setImage(image.preview);
      }
      setPrivacyLevel(data["privacy_level"]);
      if(data["gender"] === "f"){
        setGender("Female")
      }else if(data["gender"] ==="m"){
        setGender("Male")
      };
      if (data["region"]) {
        setRegion(PreselectedValues.getRegionValueWithCode(data["region"]));
      }
      setStreetAddress(data["street_address"]);
    } else if (status === 400 || 401) {
      console.log(data);
      // BusinessService.refreshToken(
      //   BusinessService.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)
      // );
    }
  }, []);



 
const showPhotoUploadModal = ()=>{
  setShow(true);
  setImageUpload(true);
  setMessage(false);
  setIsLoading(false)
}

  const callPrompt = (title, link, link_text, message) => {
    setShow(true);
    setPromptTitle(title);
    setLinkText(link_text);
    setLinkTo(link);
    setPromptBody(message);
  };

  const handleProfilePhoto = async (e) => {
    e.preventDefault();
    // setIsLoading(true)

    if (image.raw.length === 0) {
      callPrompt("Change Image", "", "Close", "Image cannot be empty");
      setMessage("Photo Cannot be empty!");
      setShow(true);
      setImageUpload(false);
      setIsLoading(false);
      return;
    }
    callPrompt(
      "Change Profile Photo",
      "",
      "Close",
      "Image changed successfully"
    );
    setShow(true);
    setMessage("Profile Photo Successfully Updated!");
    setImageUpload(false);
    setIsLoading(false);

    try {
      const formData = new FormData();
      formData.append("image", image.raw);

      const res = await fetch(`${BASE_URL}/accounts/image_upload/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: formData,
      });
      data = await res.json();
      console.log("Image Data", data);
      await fetch(`${BASE_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.parse({ refresh: authTokens.refresh }),
      });
      data = await res.json();

      if (res.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem(LOCALHOST_AUTH_TOKENS, JSON.stringify(data));
        history.push("/edit-profile");
         console.log("Profile Photo Successfully Updated!");
      } else if (res.status === 400) {
        console.log("Profile Photo Updated Failed!");
        console.log(data.detail);
      }
    } catch (e) {
      console.log("Error Occured While Updating Profile Photo!");
      console.log("Error: " + e.message);
    }
  };

  // useEffect(()=>{
  //   doUpdateProfile()
  // },[])

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {imageupload && (
          <Modal.Header>
            <Modal.Title className="m-auto">Upload Profile Image</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          <Row className="text-center justify-content-center">

            <Col>
              {message && <span className="text-dark">{message}</span>}
              {imageupload && (
                <>
                  <img
                    src={image.preview}
                    alt="avatar"
                    id="img"
                    className="rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div class="DashedBorder">
                    Select your Photo by &nbsp;

                    <input
                      type="file"
                      name="image"
                      id="input"
                      accept="image/*"
                      onChange={imageHandler}
                      style={{ display: "none" }}
                    />
                    <label
                      onClick={showPhotoUploadModal}
                      htmlFor="input"
                      className="image-upload"
                    >
                      <span className="textColor">Clicking Here</span> &nbsp;
                      <label>to Choose image</label>
                    </label>{" "}
                    <br />
                    <br />
                  </div>
                  <Button class="btn btn-primary" onClick={props.onHide}>
                    Cancel
                  </Button>{" "}
                  &nbsp;
                  {!isLoading ? (
                    <button
                      onClick={handleProfilePhoto}
                      className="btn btn-secondary "
                      disabled={isDisabled}
                    >
                      <span>Upload</span>
                    </button>
                  ) : (
                    isLoading && (
                      <button
                        className="btn btn-primary"
                        disabled={!isDisabled}
                      >
                        {isLoading && (
                          <span className="spinner-grow spinner-grow-sm text-light"></span>
                        )}
                        <span className="ms-2 loadingFont">Uploading...</span>
                      </button>
                    )
                  )}
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
        {!imageupload && (
          <Modal.Footer class="text-center mb-3">
            <Button class="btn btn-primary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    );
  }

  return (
        <div className="product-wrapper">
           <MyVerticallyCenteredModal
        show={show}
        onHide={() => setShow(false)}
      />
      <div class="edit-info-text fw-bold mt-4" style={{width:"70%"}}>
      Edit Information
       <button class="btn viewprofilebtn float-end"
        onClick={() => {
          window.location.href = "/profile";
        }}
      >
        View Profile
      </button>
    </div>
      <div className="product-content">
     
        <div className="pro-top">
          <div className="upload-box">
            <div className="header">
        <section>
        <div className="image-holder mb-5"
                    style={{
                      margin: "auto",
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      marginTop: "1rem",
                      position:"relative",
                    }}
                  >
                    <img
                      src={image}
                      alt="avatar"
                      id="img"
                      className="rounded-circle img-fluid"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  <div style={{position:"absolute",
                              top:"10px",
                              right:"5px",}}>
                        <img 
                        onClick={showPhotoUploadModal}
                        src={"/images/plus.png"} 
                        style={{width:"25px"}} 
                        alt="add"/>
                  </div>
                </div>
        </section>
      </div>
          </div>
        </div>
        <div className="pro-down">
          <div className="pro-down-left">
            <EditSnipet
              value={first_name}
              setValue={setFirstname}
              title="FIRST NAME"
              important={true}
              intent="text"
            />
            <EditSnipet
              value={email}
              setValue={setEmail}
              title="EMAIL ADDRESS"
              important={false}
              intent="text"
            disabled/>
            <EditSnipet
              value={birthday}
              setValue={setBirthday}
              title="BIRTHDAY"
              important={true}
              intent="text"
            />
             <EditSnipet
              value={street_address}
              setValue={setStreetAddress}
              important={true}
              intent="text"
              title="STREET ADDRESS"
            />
            <EditSnipet
              value={gps_location}
              setValue={setDigitalAddress}
              important={true}
              title="DIGITAL ADDRESS"
              intent="text"
            />
          </div>
          <div className="pro-down-right">
            <EditSnipet
              value={last_name}
              setValue={setLastname}
              title="LAST NAME"
              important={true}
              intent="text"
            />
            <EditSnipet
              value={phone_number2}
              setValue={setPhone}
              title="PHONE NUMBER"
              important={true}
              intent="text"
            />
             <EditSnipet
              value={privacy_level}
              setValue={setPrivacyLevel}
              important={false}
              intent="cbo"
              title="PRIVACY LEVEL"
              source={PreselectedValues.getProductTypes()}
            />
             <EditSnipet
              setOption={setGender}
              important={false}
              title="GENDER"
              onOption="option"
              style={{
              height: "auto",
            }}
            />

            <EditSnipet
            title="REGION" 
            value={region} 
            setValue={setRegion} 
            intent="cbo"
            source={PreselectedValues.getRegionValues()}
            />
          </div>
      </div>
      <div className="content-4-footer mt-5" style={{width:"100%"}}>
        <div class="d-flex justify-content-center">
          <button class="savebtn"
            onClick={() => {
            doUpdateProfile({
            first_name,
            birthday,
            region:PreselectedValues.getRegionCode(region),
            street_address,
            last_name,
            gps_location,
            name,
            phone_number2,
          })}}
          >Save Changes
           </button>
           </div>
        </div>
      </div>
    </div>

  );
};

export default EditProfile;


