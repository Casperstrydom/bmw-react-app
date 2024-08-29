import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Footer(props) {
  const { handleToggleModal, data, sidebarActive } = props;
  const [iconClass, setIconClass] = useState("fa-circle-question");
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    setIconClass(sidebarActive ? "fa-hand-point-right" : "fa-circle-question");
  }, [sidebarActive]);

  const handleIconClick = () => {
    handleToggleModal();
    setShowLinks(!showLinks);
  };

  return (
    <footer
      className={`d-flex justify-content-between align-items-center p-3 ${
        sidebarActive ? "bg-dark" : "bg-black"
      } text-blue`}
    >
      <div className="d-flex align-items-center">
        <button
          onClick={handleIconClick}
          className="btn btn-primary me-3 footer-button"
        >
          <i className={`fa-solid ${iconClass}`}></i>
        </button>
        <div
          className={`link-buttons ${
            showLinks ? "d-block" : "d-none"
          } d-flex flex-column`}
        >
          <button
            onClick={() =>
              window.open("https://www.bmw.com/en/index.html", "_blank")
            }
            className="btn btn-light mb-2"
          >
            BMW Website
          </button>
          <button
            onClick={() =>
              window.open("https://www.youtube.com/user/BMW", "_blank")
            }
            className="btn btn-light mb-2"
          >
            BMW YouTube Channel
          </button>
          <button
            onClick={() =>
              window.open(
                "https://www.stephenjamesenfieldbmw.co.uk/about-us/news-events/news/what-type-of-bmw-engine-is-right-for-you/",
                "_blank"
              )
            }
            className="btn btn-light mb-2"
          >
            BMW Engine Types
          </button>
          <button
            onClick={() =>
              window.open(
                "https://www.bmw.co.za/en/fastlane/bmw-retailer-locator.html",
                "_blank"
              )
            }
            className="btn btn-light mb-2"
          >
            BMW Retailer Locator
          </button>
          <button
            onClick={() =>
              window.open(
                "https://www.bmw.co.za/en/topics/fascination-bmw/buy-bmw.html",
                "_blank"
              )
            }
            className="btn btn-light"
          >
            Buy a BMW
          </button>
        </div>
      </div>
      <div className="text-center">
        <h2 className="mb-0">{data?.title}</h2>
        <h1 className="mb-0"> PROJECT</h1>
      </div>
    </footer>
  );
}
