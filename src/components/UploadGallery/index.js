import React, { useState, useEffect } from "react";
import { CircularProgress, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

const UploadImages = (props) => {
  const [files, setFiles] = useState([]);

  const onAddFiles = (e) => {
    if (props.disabled) return;
    var file = e.target.files[0];
    setFiles([...files, file]);
    // console.log(' add file')
    props.onChange([...files, file])
  };
  // const onDelete = (i) => {
  //   if (props.disabled) return;
  //   let x = props.value.filter((a, b) => b != i);
  //   props.onChange(x);
  // };
  const onDeleteHandler = (i) => {
    console.log(" ON  onDeleteHandler", i);
    const fileCopy=[...files]
    const newArray = fileCopy.splice(i, 1);
    console.log(' newArray ==>',newArray)
    setFiles(fileCopy);
    props.onChange(fileCopy);
  };
  return (
    <div className="listFiles">
      {/* {props.value.map((e, i) => (
        <>
          <div
            key={e + i}
            className="element_image"
            style={{ margin: "10px", position: "relative" }}
          >
            <div className="ele-delete-fileup">
              <div
                onClick={() => {
                  onDelete(i);
                }}
              >
                <Button
                  className="add_edit_btn_icon"
                  color="error"
                  variant="contained"
                  style={{ margin: "0 20px" }}
                  startIcon={
                    <AiOutlineDelete
                      style={{ margin: "auto" }}
                      size="20"
                      color="#fff"
                    />
                  }
                />
              </div>
            </div>
            <img className="with_image " src={e} style={{ display: "flex" }} />
          </div>
        </>
      ))} */}
      {files.map((e, i) => (
        <UploadImage
          file={e}
          onDone={(v) => {
            props.onChange([...props.value, v]);
          }}
          onDelete={() => onDeleteHandler(i)}
          key={i}
        />
      ))}
      <div
        className="myvectore"
        style={{position: "relative" }}
      >
        <input
          disabled={props.disabled}
          onChange={(e) => onAddFiles(e)}
          type="file"
          accept="image/*"
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <AiOutlinePlus
            style={{ margin: "auto", opacity: "0.5" }}
            size="100%"
            color="#000"
          />
        </span>
      </div>
    </div>
  );
};

const UploadImage = ({ file, onDone, onDelete }) => {
  const [image, setImage] = useState(false);
  // if (image != false && image !== -1 && image.length > 0) {
    console.log(" file new", file);
    const url = URL.createObjectURL(file);
    return (
      <div
        className="myvectore"
        style={{ margin: "10px", position: "relative" }}
      >
        <img
          src={url}
          style={{
            position: "absolute",
            objectFit: "contain",
            objectPosition: "center",
            height: "100%",
            width: "100%",
          }}
        ></img>
        <span
          onClick={onDelete}
          style={{
            height: "32%",
            width: "32%",
            position: "absolute",
            top: 1,
            right: 1,
            backgroundColor: "#000",
            opacity: "0.7",
          }}
        >
          <AiOutlineDelete style={{ margin: "auto" }} size="20" color="#fff" />
        </span>
      </div>
    );
  // }
  // return (
  //   <div className="element_image" style={{ margin: "10px" }}>
  //     <CircularProgress />
  //   </div>
  // );
};
export default UploadImages;
