import React, { useState, useContext } from 'react'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import { Input } from '@material-ui/core';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import { ReceiptContext } from '../../../Contexts/ReceiptContext';

export default function FCImage(props) {
  //const [image, setImage] = useState({ preview: '', raw: '' })
  const { receipt, SetReceipt } = useContext(ReceiptContext);

  const handleChange = (e) => {
    // setImage({
    //   preview: URL.createObjectURL(e.target.files[0]),
    //   raw: e.target.files[0]
    // })
    SetReceipt({
      ...receipt, image: {
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      }
    })
  }

  //const handleUpload = async (e) => {
  //console.log(e);
  // e.preventDefault()
  // const formData = new FormData()
  // formData.append('image', image.raw)
  // const config = { headers: { 'content-type': 'multipart/form-data' } }		

  // await uploadToBackend('endpoint', {image: image.raw}, config)
  //}

  return (
    <div>
      <label htmlFor="upload-button">
        {
          receipt.image.preview ? <img src={receipt.image.preview} style={{ maxWidth: 250, maxHeight: 250 }} alt="receipt" /*width="300" height="300"*/ /> : (
            <>
              <span className="fa-stack fa-2x mt-3 mb-2">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fas fa-store fa-stack-1x fa-inverse" />
              </span>

              {/* <h5 className="text-center"><ReceiptOutlinedIcon/> Add Receipt   </h5> */}
              <p className="text-center"><ReceiptOutlinedIcon /> Add Receipt <AnnouncementOutlinedIcon htmlColor="red" />
              </p>
            </>
          )
        }
      </label>
      <Input
        type="file"
        name='receipt'
        id="upload-button"
        style={{ display: 'none', border: "5px solid red" }}
        onChange={handleChange}
        required
      />
      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  )
}