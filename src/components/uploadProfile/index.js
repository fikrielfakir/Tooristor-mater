import React from "react";
const UploadTheMainImage = (props
  ) => {

  const deleteImage = (e) => {
    setValue("attachment", "");
  };
  if (props.loading)
    return (
      <div style={{ width: "fit-content", margin: "auto" }}>
        <div
          className="element_image"
          style={{ margin: "10px", position: "relative" }}
        >
       <div><span class="anticon anticon-loading anticon-spin"><svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg></span><div >Upload</div></div>
        </div>
      </div>
    );
  return (
    <div className="avatar">
      <div
        className="element_image"
        style={{ position: "relative" }}
      >
        {props.isThereAFile ? (
          <>
            <img
              src={props.url}
              style={{ height: "100%", width: "100%", position: "absolute" }}
            />
            <span
              onClick={deleteImage}
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
              <i class="far fa-camera"></i>
            </span>
            <input type="file" required onChange={props.UploadFile} />
          </>
        ) : (
          <>
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: "100%",
              }}
            >
              <i class="fas fa-plus"></i>
            </span>
            <input type="file" required onChange={props.UploadFile} />
          </>
        )}
      </div>
    </div>
  );
};
export default UploadTheMainImage;