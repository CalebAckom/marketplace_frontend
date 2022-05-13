import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Close } from "@mui/icons-material";
import BusinessService from "../../services/BusinessService";
import { fetchBusinessDetails } from "../../services/features/slices/userSlice";
import { useDispatch } from "react-redux";


const UploadBox = ({ setTrigger, setImage }) => {
  //for setting to dabase
  const [files, setFiles] = useState([]);
  //Redux
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  //action to perform on drop
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: "90%",
    fontSize: "0.9em",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({ accept: "image/jpeg, image/png", onDrop, noClick: true });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  function onUploadProgress(event) {
    setProgress(Math.round((100 * event.loaded) / event.total));
  }
  const Thumbs = (e) => {
    return (
      <div key={files[0].name} className="preview-img-container">
        <div className="preview-img-content">
          <button
            onClick={() => {
              setFiles([]);
              setProgress(0);
            }}
          >
            <Close />
          </button>
          <img src={window.webkitURL.createObjectURL(files[0])} />
          <p className="img-name">
            {`Name: ${files[0].name.substring(0, files[0].name.length - 4)}`}
          </p>
        </div>
      </div>
    );
  };

  const sendImage = () => {
    const response = BusinessService.upload_Business_Logo(
      files[0],
      onUploadProgress
    );
    // console.log(" return img data -> ", response);
    response
      .then(({ data: image }) => {
        setImage(image["image"]);
        dispatch(fetchBusinessDetails())
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log(files[0]);
  }, []);
  return (
    <div className="uploadBox-wrapper">
      <div className="upload-box">
        <p>
          {files.length === 0
            ? "Upload Profile Image"
            : "Press the (x) button to clear image"}
        </p>
        {files.length === 0 ? (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <span>
              Drag a picture into the box or{" "}
              <label
                onClick={open}
                style={{ color: "#1b98e0", cursor: "pointer" }}
              >{`click here `}</label>{" "}
              to upload profile image
            </span>
          </div>
        ) : (
          <Thumbs />
        )}
        <div className="upload-control-box">
          <button
            className="upload-cancel"
            onClick={() => {
              setFiles([]);
              setTrigger(false);
            }}
          >
            Cancel
          </button>
          <button
            className="upload-go"
            disabled={files.length === 0}
            onClick={sendImage}
          >
            Upload
          </button>
        </div>
        <div className="progress-wrapper">
          <div
            className="progress-bar"
            style={{ width: `${progress}%`, transition: "0.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
