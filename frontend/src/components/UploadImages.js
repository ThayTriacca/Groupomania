import React, { useState } from "react";
import Button from '@mui/material/Button';

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <Button variant="contained" onClick={() => setSelectedImage(null)}>Remove</Button>
        </div>
      )}

      <br />
      <br />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
        }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
};

export default UploadAndDisplayImage;