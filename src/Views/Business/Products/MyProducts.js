import { GridView, Search, TableRows, Edit, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory } from "react-router-dom";
import { fetchMyProducts } from "../../../services/features/slices/myProductsSlice"
import './MyProductStyle.scss'
import './Prompter.scss'
import { Prompter } from "./ProductPost";



const MyProducts = ({ }) => {
  const [viewType, setviewType] = useState("t");
  //redux
  const mpState = useSelector((state) => state.mpr.items.results);
  const dispatch = useDispatch();

  //prompt
  const [prompt, setPrompt] = useState(false);
  //current delete data
  const [currentDataToDel, setcurrentDataToDel] = useState("");

  const [promptData, setPromtData] = useState({
    msg: "Are you sure you want to delete this record?",
    actionN: () => {
      setPrompt(false);
    },
    actionY: () => {
      alert('wow')
    }, isPrompt: true
  });

  
  function deleteProduct(data) {
    setPrompt(true);
    setcurrentDataToDel(data);
  }

  useEffect(() => {
    dispatch(fetchMyProducts());
    window.scroll(0,0);
  }, []);
  

  return <div className='my-products-wrapper'>
    {prompt
      &&
      <Prompter
        message={promptData.msg}
        actionN={promptData.actionN}
        intent = "delete"
        data={currentDataToDel}
        close={setPrompt}
        isPrompt={promptData.isPrompt}
      />}
    <div className='my-product-header-cover'>
      <div className='my-product-header'>
        <SearchField />
        <Weather setview={setviewType} view={viewType} />
      </div>
    </div>
    <div className={`my-product-content`}>
      {
        mpState ? mpState.map((e, i) => {
          return viewType == "t" ?
            <PitemTableItem data={e}
              key={i + e.name}
              deleteAction={deleteProduct}

            />
            : <PitemGridItem data={e}
              key={i + e.name}
              deleteAction={deleteProduct} />
        }) :
          <div className="missing">
            <p> Hey, you don't have any product yet. <Link style={{ textDecoration: "none" }} to="post-product">Click here</Link> to add</p>
          </div>
      }

    </div>

  </div>;
};

export default MyProducts;

const SearchField = () => {
  return <div className="search-bar">
    <div className="srch-a">
      <Search />
      <input type="text" placeholder="Search your products" />
      <button>Search</button>
    </div>
  </div>
}
//shares states with parent
const Weather = ({ view, setview }) => {
  return <div className="change-view">
    <p>Change view</p>
    {view == "t" ?
      <TableRows onClick={() => {
        setview("g")
      }} />
      : <GridView onClick={() => {
        setview("t")
      }} />}
  </div>
}

const PitemGridItem = ({ data, deleteAction }) => {
  let price = Number(data.price);
  let discount = Number(data.discount);
  let nPrice = price - ((discount / 100) * price);

  //router
  const history = useHistory();

  function EditProduct() {
    console.log("redirect -> ");
    history.push(`/post-product/:${JSON.stringify({ id: data["id"] })}`);
  }

  return <div className="pitem-wrapper-grid">
    <img onClick={(e)=>{
      console.log(e);
      if(e.target.src === data.image_1){
        if(typeof data.image_2 !== 'undefined'){
          e.target.src = data.image_2
        }
      }else{
        e.target.src = data.image_1
      }
      
    }} src={data.image_1 ? data.image_1 : "images/product-card-default.jpg"} />
    <div className="detail">
      <p className="name">{` ${data.name}`}</p>
      <div className="price">
        <p className={discount !== 0 ? "dprice" : ""}> {`Gh₵${data.price}`} </p>
        {discount > 0 && <p> {`Gh₵${nPrice}`}</p>}
      </div>
      {discount > 0 && <p className="discount">{`Discount: ${data.discount}% off`}</p>}
    </div>
    <div className="actions">
      <button onClick={EditProduct}>Edit{" "} <Edit /></button>
      <button onClick={() => { deleteAction(data) }}>Delete {" "} <Delete /></button>
    </div>

  </div>
}

const PitemTableItem = ({ data, deleteAction }) => {
  let price = Number(data.price);
  let discount = Number(data.discount);
  let nPrice = price - ((discount / 100) * price);

  //router
  const history = useHistory();
  function EditProduct() {
    console.log("redirect -> ");
    history.push(`/post-product/:${JSON.stringify({ id: data["id"] })}`);

  }
  return <div className="pitem-wrapper-table">
    <img onClick={(e)=>{
      console.log(e);
      if(e.target.src === data.image_1){
        if(typeof data.image_2 !== 'undefined'){
          e.target.src = data.image_2
        }
      }else{
        e.target.src = data.image_1
      }
      
    }} src={data.image_1 ? data.image_1 : "images/product-card-default.jpg"} />
    <div className="detail">
      <p className="name">{` ${data.name}`}</p>
      <div className="price">
        <p className={discount !== 0 ? "dprice" : ""}> {`Gh₵${data.price}`} </p>

        {discount > 0 && <p> {`Gh₵${nPrice}`}</p>}
      </div>
      {discount > 0 && <p className="discount">{`Discount: ${data.discount}% off`}</p>}
    </div>
    <div className="actions">
      <button onClick={EditProduct}><span>Edit </span> <Edit /></button>
      <button onClick={() => { deleteAction(data) }}><span>Delete </span> <Delete /></button>
    </div>
  </div>
}