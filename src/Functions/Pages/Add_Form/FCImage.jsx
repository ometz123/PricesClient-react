import React, { useState, useContext, useEffect } from 'react'
import { ReceiptContext } from '../../../Contexts/ReceiptContext';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Input } from '@material-ui/core';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';

export default function FCImage(props) {
  //const [image, setImage] = useState({ preview: '', raw: '' })
  const { receipt, SetReceipt, item, SetItem } = useContext(ReceiptContext);
  const [icon, setIcon] = useState();
  const [image, setImage] = useState({ image: { preview: null, raw: null } });

  const handleChange = (e) => {

    console.log("change: ", props.parent);
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    })

    if (props.parent === "Receipt") {
      SetReceipt({
        ...receipt, image: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        }
      })

    }
    else if (props.parent === "Item") {
      props.onItemImageChange(e)
      SetItem({
        ...item, image: {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        }
      })
    }

  }

  useEffect(() => {
    if (props.parent === "Item") { setIcon(<PhotoCameraIcon />) }
    else if (props.parent === "Receipt") { setIcon(<ReceiptOutlinedIcon />) }
  }, [image])
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
      <label >
        {image.preview ?
          <img src={image.preview} style={{ maxWidth: 250, maxHeight: 250 }} alt={props.parent + " image"} /> : (<>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-store fa-stack-1x fa-inverse" />
            </span>

            {/* <h5 className="text-center"><ReceiptOutlinedIcon/> Add Receipt   </h5> */}
            <p className="text-center">
              {icon} Add {props.parent} image <AnnouncementOutlinedIcon htmlColor="red" />
            </p>
          </>
          )
        }<Input
          type="file"
          name={props.parent}
          style={{ display: 'none', border: "5px solid red" }}
          onChange={handleChange}
          required={props.parent==="Receipt"}
        />
      </label>

      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  )
}