import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const UploadProfileAndDisplayImage = ( props ) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploaded, setisUploaded] = useState(false);

  useEffect(() => {
    if (props.value) {
      setSelectedImage(props.value);
    }
  }, [props.value]);

 
 
  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    if(event.target && event.target.files && event.target.files[0]){
      props.onChange(event.target.files[0]);
    }
    setisUploaded(true);

  }

    //uploaded  = URL.createObjectURL(
  let image =  isUploaded? URL.createObjectURL(selectedImage): selectedImage;

  return (
    <div>
      {selectedImage && isUploaded && (
        <div>
          <img
            width={"250px"}
            src={image}
          />
          <br />
          <Button variant="contained" onClick={() => setSelectedImage(null)}>Remove</Button>
        </div>)
      }

      <br />
      <br />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        onChange={ handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Media
        </Button>
      </label>
    </div>
  );
};

export default UploadProfileAndDisplayImage;