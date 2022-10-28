import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./../assets/css/spinner.css";
export default function Spinner({ css, size, loading }) {
    
  return (
    <>
      <div className="spinner__container">
        <ClipLoader css={css} size={size} color={"#f5b921"} loading={loading} />
      </div>
    </>
  );
}
