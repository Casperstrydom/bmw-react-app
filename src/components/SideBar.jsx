import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function SideBar(props) {
  const { handleToggleModal, content } = props;

  return (
    <div className="sidebar position-fixed top-0 start-0 w-100 h-100 d-flex">
      <div
        onClick={handleToggleModal}
        className="bg-overlay bg-black opacity-75 flex-grow-1"
      ></div>
      <div className="sidebar-contents bg-blue p-3">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {/* Close button removed */}
      </div>
    </div>
  );
}
