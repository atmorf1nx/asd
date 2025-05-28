import React from "react";
import errorBGC from "../assets/error.png";
const ErrorPage = () => {
  const handleHomeClick = () => {
    window.location.href = "/hero";
  };

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="error-page">
        <img src={errorBGC} alt="" />
        <div className="error-container">
          x
          <button className="btn btn-home" onClick={handleHomeClick}>
            Home
          </button>
          <button className="btn btn-reload" onClick={handleReloadClick}>
            Reload
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ErrorPage;
