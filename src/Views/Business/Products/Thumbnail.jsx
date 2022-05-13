import { Close } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';

const Thumbnail = ({ imgFile, idx, setFiles, valueType, setCheck,chckValue }) => {
  const [imgSrc, setimgSrc] = useState(valueType === "file" ? window.webkitURL.createObjectURL(imgFile) : imgFile);
  useEffect(() => {
    if(imgSrc === null){
      setimgSrc('/images/product-card-default.jpg')
    }
  }, [setimgSrc,imgSrc])
  
  return (
    <div key={valueType === "file" ? imgFile.name : ""} 
      className="preview-img-container">
      <div className="preview-img-content">
        {/* remove current file from the list */}
        {valueType === "file" ? <button
          onClick={() => {
            setFiles((prev) => {
              return prev.filter((e, i) => i !== idx);
            });
          }}
        >
          <Close />
        </button>
          :
          <Checkbox            
            style={{ position: 'absolute', right: "-8px",top:'-8px', color: 'aquamarine' }} size='small' color='success'
            onChange={(e)=>{
              let arr = chckValue;
              if(arr[idx] === 0){
                arr[idx] = 1
              }else{
                arr[idx] = 0
              }
              setCheck(arr);
            }}
            />
            
        }
        <img src={imgSrc} alt="items" />
      </div>
    </div>
  )
};

export default memo(Thumbnail);
