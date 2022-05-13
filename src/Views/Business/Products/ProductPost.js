import react, { useState, useCallback, useMemo, useEffect, } from "react";
import { useDropzone } from "react-dropzone";
import "./ProductStyle.scss";
import { Cancel } from "@mui/icons-material";
import EditSnipet from "../EditSnipet";
import { PreselectedValues } from "../../../utils/PreselectedData";
import ProductService from "../../../services/ProductService";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProducts } from "../../../services/features/slices/myProductsSlice";
import Thumbnail from "./Thumbnail";
import { LOCALHOST_AUTH_TOKENS } from "../../../utils/config";
import instance from "../../../services/api";


const ProductPost = ({ setIsLog }) => {
  console.log('rerender');
  //get params
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [ePFiles, setEPFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  //
  const [pName, setpName] = useState("");
  const [type, settype] = useState({ data: "", index: "" });
  const [unitPrice, setUnitPrice] = useState("");
  const [category, setcategory] = useState({ data: "", index: "" });
  const [discount, setdiscount] = useState("");
  const [desc, setdesc] = useState("");
  //redux
  const mpState = useSelector(state => state.mpr.items.results)
  //routes
  const history = useHistory();
  //prompt settings
  const [workStatus, setworkStatus] = useState(0);
  const [promptmsg, setPromptmsg] = useState("");
  const [editData, setEditData] = useState({});
  //set_current action behavior
  const [behavior, setbehavior] = useState(0);
  //currentModifyingData
  const [currentMData, setcurrentMData] = useState();
  // prompts
  const [viewPrompt, setviewPrompt] = useState(false);
  const [promptSettings, setpromptSettings] = useState({
    msg: '',
    actionY: "",
    actionN: () => {
      setviewPrompt(false);
    }, isPrompt: true,
    workStatus: 0
  });
  //the state below serves as a chk to image 
  //  data to be removed from a selected product
  const [deleteImageOptions, setDeleteImageOptions] = useState([0, 0, 0, 0]);

  //action to perform on drop
  const onDrop = useCallback((acceptedFiles) => {
    // setFiles(acceptedFiles);
    setFiles((prev) => {
      return prev.concat(acceptedFiles);
    });
  }, []);


  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
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

  async function addProduct() {
    console.log(category, type);
    if (pName == "" || unitPrice == "" || category == "" || type == "") {
      setviewPrompt(true)
      setPromptmsg("Certain important fields are empty");
      setworkStatus(1)
    } else {
      setPromptmsg("Please wait.");
      setworkStatus(1)
      const data = new FormData();
      data.append("name", pName);
      data.append("price", unitPrice);
      data.append("discount", discount);
      data.append("description", desc);
      data.append("category", PreselectedValues.getProductCategoryCode(category['data']));
      data.append("product_type", PreselectedValues.getProductTypeCode(type['data']));
      files.forEach((e, i) => {
        if (i < 3) {
          data.append(`image_${i + 1}`, files[i]);
        }
      });
      ProductService
        .addNewProduct(data)
        .then((res) => {
          console.log(' p res', res);
          if (res.status === 201) {
            setworkStatus(1)
            setPromptmsg("Product added successfully");
            setTimeout(() => {
              setviewPrompt(false);
              history.push("my-products")
            }, 1000)
          } else if (res.status === 400 || res.status === 401) {
            setPromptmsg("Sorry an error occured whiles adding your product, kindly retry");
          }
        }).catch((err) => { });

    }
  }

  async function editProduct() {
    setviewPrompt(true)
    setPromptmsg("Are you sure you want to edit this record?");
    const nullNames = [];
    const fillingNulls = [];
    const epFileList = ePFiles.filter((obj) => {
      return obj.data === null;
    }).map((e) => { nullNames.push(e.name) })
    nullNames.map((name) => {

    })
    // console.log(files);
    // console.log(nullNames);
    setEditData({
      name: pName,
      price: unitPrice,
      discount,
      description: desc,
      category: category.data,
      product_type: type.data,
      imageFiles: files,
      current: currentMData
    })
  }

  function clear() {
    setpName("")
    settype("")
    setUnitPrice("")
    setcategory("")
    setdiscount("")
    setdesc("")
    setbehavior(0)
  }

  useEffect(() => {
    setIsLog(true);
    window.scroll(0, 0);

    let it = params['product'];
    if (it !== 'undefined') {
      // clear();
    }
    it = typeof it !== 'undefined' ? JSON.parse(it.substring(1, it.length)) : {}
    if (typeof mpState !== "undefined") {
      const returned = mpState.filter(e => e.id == it['id'])[0];
      if (typeof returned !== "undefined") {
        setcurrentMData(mpState.filter(e => e.id == it['id'])[0]['id']);
        setpName(returned['name']);
        settype({ data: PreselectedValues.getProductTypeValueWithCode(returned['product_type']) });
        setUnitPrice(returned['price']);
        setcategory({ data: PreselectedValues.getProductCategoryValueWithCode(returned['category']) });
        setdiscount(returned['discount']);
        setdesc(returned['description']);
        //toggles between save and edit
        setbehavior(1);
        setEPFiles([{ name: 'image_1', data: returned['image_1'] }, { name: "image_2", data: returned['image_2'] }, { name: 'image_3', data: returned['image_3'] }])
      }
    }
  }, []);
  return (
    <div className="product-wrapper">
      {/* {triggerNotification && <MessageModal msg={notice.msg} close={settriggerNotification} style={{ height: '110vh' }} />} */}
      <div className="product-content">
        <div className="pro-top">
          <div className="upload-box">
            <p>{behavior == 0 ? "Add Product/Service" : `Edit ${pName}`}</p>
            {files.length < 3 && (
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
            )}
            <div className="all-image-displayer">
              {ePFiles.length > 0 &&
                <div className="pre-existing">
                  <div className="pre-existing-controls">
                    <p>Check an existing image to update</p>
                  </div>
                  <div className="pre-existing-images">
                    {ePFiles.map((e, i) => {
                      if (i < 3) {
                        return <Thumbnail
                          key={i} valueType="img" idx={i}
                          imgFile={e.data} setFiles={setEPFiles}
                          setCheck={setDeleteImageOptions}
                          chckValue={deleteImageOptions}
                        />;
                      }
                    })}
                  </div>
                </div>
              }
              {behavior === 1
                && ePFiles.length > 0
                && files.length > 0
                &&
              <div className="all-image-divider"></div>}
              { files.length > 0
                &&<div className="img-list-container">
                <div className="img-list">
                  {files.length > 0 &&
                    files.map((e, i) => {
                      if (i < 3) {
                        if (typeof e !== '') {
                          return <Thumbnail key={i} valueType="file" idx={i} imgFile={e} setFiles={setFiles} />;
                        }
                      }
                    })}
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className="pro-down">
          <div className="pro-down-left">
            <EditSnipet
              value={pName}
              setValue={setpName}
              important={true}
              title="Product/Service Name"
              intent="text"
              placeholder="Enter product name"
            />
            <EditSnipet
              value={type.data}
              setValue={settype}
              important={true}
              title="Type"
              intent="cbo"
              source={PreselectedValues.getProductTypes()}
            />
            <EditSnipet
              value={unitPrice}
              setValue={setUnitPrice}
              important={true}
              intent="text"
              title="Unit Price"
              placeholder="Enter unit price"
            />
            <EditSnipet
              value={category.data}
              setValue={setcategory}
              important={true}
              title="CATEGORY"
              intent="cbo"
              source={PreselectedValues.getProductCategories()}
            />
          </div>
          <div className="pro-down-right">
            <EditSnipet
              value={discount}
              setValue={setdiscount}
              important={false}
              intent="text"
              title="Discount(%)"
              placeholder="Any discount?"
            />
            <EditSnipet
              value={desc}
              setValue={setdesc}
              important={false}
              title="DESCRIPTION"
              intent="text-area"
              placeholder="Enter product description"
              style={{ height: "16.5vh" }}
            />

            <div className="ctrl-box">
              <button onClick={behavior === 0 ? addProduct : editProduct}>
                {behavior === 0 ? "Add" : "Edit"}
              </button>
              <button onClick={behavior === 0 ? clear : () => { history.push("/my-products") }}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      {viewPrompt && <Prompter
        message={promptmsg}
        actionY={promptSettings.actionY}
        actionN={promptSettings.actionN}
        close={setviewPrompt}
        data={editData}
        pimgDisplcmntArr={deleteImageOptions}
        isPrompt={promptSettings.isPrompt}
        relocation="/my-products"
        intent="update"
        workStat={workStatus}
      />

      }
    </div>
  );
};

export default ProductPost;

export const Prompter = ({ actionY, actionN, message, close, data, isPrompt, relocation, intent, workStat, pimgDisplcmntArr }) => {

  const dispatch = useDispatch();
  console.log('datar', data)

  useEffect(() => {
  }, [actionY, workStat, message, data.current]);

  const [msg, setMsg] = useState(message);
  const [status, setStatus] = useState();
  const [workStatus, setWorkStatus] = useState(workStat ? workStat : 0);
  const [is_Prompt, set_isPrompt] = useState(isPrompt);

  const mpState = useSelector(state => state.mpr.items.results);
  const update = async () => {
    const returned = mpState.filter(e => e.id == data.current)[0];
    // console.log("inside prompt",returned);

    setWorkStatus(1);
    set_isPrompt(false)
    setMsg("Please wait ...");

    if (data['name'] == "" || data.price == "" || data.category == "" || data.product_type == "") {
      return ''
    }

    const formData = new FormData();
    formData.append("name", data['name']);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("description", data.description);
    formData.append("category", PreselectedValues.getProductCategoryCode(data.category));
    formData.append("product_type", PreselectedValues.getProductTypeCode(data.product_type));
    //
    // console.log('option delete ', pimgDisplcmntArr)
    if (pimgDisplcmntArr[0] === 1) {
      console.log('middle')
      if (pimgDisplcmntArr[1] === 0 && pimgDisplcmntArr[2] === 0) {
        if (typeof data.imageFiles[0] !== 'undefined') {
          formData.append("image_1", data.imageFiles[0]);
        } else {
          formData.append("image_1", '');
        }
      }
      else if ((pimgDisplcmntArr[1] === 0 && pimgDisplcmntArr[2] === 1)) {
        if (typeof data.imageFiles[0] !== 'undefined') {
          formData.append("image_1", data.imageFiles[0]);
        } else {
          formData.append("image_1", '');
        }
      }
      else if ((pimgDisplcmntArr[1] === 1 && pimgDisplcmntArr[2] === 0)) {
        console.log('seconder',)
        if (typeof data.imageFiles[0] !== 'undefined') {
          formData.append("image_1", data.imageFiles[0]);
        } else {
          formData.append("image_1", '');
        }
      }
    }
    //
    if (pimgDisplcmntArr[1] === 1) {
      if (pimgDisplcmntArr[0] === 0 && pimgDisplcmntArr[2] === 0) {
        if (typeof data.imageFiles[0] !== 'undefined') {
          formData.append("image_2", data.imageFiles[0]);
        } else {
          formData.append("image_2", '');
        }
      }
      else if ((pimgDisplcmntArr[0] === 0 && pimgDisplcmntArr[2] === 1)) {
        if (typeof data.imageFiles[0] !== 'undefined') {
          formData.append("image_2", data.imageFiles[0]);
        } else {
          formData.append("image_2", '');
        }
      }
      else if ((pimgDisplcmntArr[0] === 1 && pimgDisplcmntArr[2] === 0)) {
        if (typeof data.imageFiles[1] !== 'undefined') {
          formData.append("image_2", data.imageFiles[1]);
        } else {
          formData.append("image_2", '');
        }
      }
    }
    ///
    if (pimgDisplcmntArr[2] === 1) {
      if (pimgDisplcmntArr[0] === 0 && pimgDisplcmntArr[1] === 0) {
        if (typeof data.imageFiles[0] !== 'undefined') {
          formData.append("image_3", data.imageFiles[0]);
        } else {
          formData.append("image_3", '');
        }

      }
      else if ((pimgDisplcmntArr[0] === 0 && pimgDisplcmntArr[1] === 1)) {
        if (typeof data.imageFiles[1] !== 'undefined') {
          formData.append("image_3", data.imageFiles[1]);
        } else {
          formData.append("image_3", '');
        }
      }
      else if ((pimgDisplcmntArr[0] === 1 && pimgDisplcmntArr[1] === 0)) {
        if (typeof data.imageFiles[1] !== 'undefined') {
          formData.append("image_3", data.imageFiles[1]);
        } else {
          formData.append("image_3", '');
        }
      }
    }

    if (pimgDisplcmntArr[0] === 1 && pimgDisplcmntArr[1] === 1 && pimgDisplcmntArr[2] === 1) {
      if (typeof data.imageFiles[0] !== 'undefined') {
        formData.append("image_1", data.imageFiles[0]);
      } else {
        formData.append("image_1", '');
      }
      if (typeof data.imageFiles[1] !== 'undefined') {
        formData.append("image_2", data.imageFiles[1]);
      } else {
        formData.append("image_2", '');
      }
      if (typeof data.imageFiles[2] !== 'undefined') {
        formData.append("image_3", data.imageFiles[2]);
      } else {
        formData.append("image_3", '');
      }
    }

    const action = await instance({
      method: "PUT",
      url: `/marketplace/update_product/${data.current}/`,
      data: formData,
      headers: {
        Authorization:
          "Bearer " +
          localStorage.getItem(LOCALHOST_AUTH_TOKENS)["access"],
      },
    })
      .then((res) => {
        if (res) {
          setStatus(res['status']);
          setMsg("You have successfully edited " + data["name"]);
          setWorkStatus(0);
          dispatch(fetchMyProducts())
          setTimeout(() => {
            window.location.href = relocation
          }, 500)
        }
      });
  }

  const deleteProduct = () => {
    setWorkStatus(1);
    set_isPrompt(false)
    setMsg("Please wait ...");
    const action = ProductService.deleteProduct(data);
    action.then((res) => {
      if (res) {
        if (res['status'] === 204) {
          setStatus(res['status']);
          setMsg("You have successfully deleted " + data["name"]);
          setWorkStatus(0);
          setTimeout(() => {
            close(true)
          }, 1000)
          dispatch(fetchMyProducts())
        }

      }
    });
  }

  useEffect(() => {
    setMsg(message);
    setWorkStatus(workStat)
    // window.scrollY
  }, [message, workStat]);


  return <div className="PrompterWrapper">
    <div className="PromptContent">
      <div className="close-div">
        <button onClick={() => {
          close(false)
        }}><Cancel /></button>
      </div>
      <p>{msg}</p>
      {workStatus === 1 ?
        <div className="worker"></div> :
        is_Prompt && <div className="prompt-actions">
          <button onClick={typeof actionY === "function" ? actionY : intent === "update" ? update : deleteProduct}>Yes</button>
          <button onClick={actionN}>No</button>
        </div>
      }

    </div>
  </div>
}