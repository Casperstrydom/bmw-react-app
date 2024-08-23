// SideBar.jsx
export default function SideBar(props) {
  const { handleToggleModal, content } = props;

  return (
    <div className="sidebar">
      <div onClick={handleToggleModal} className="bgOverlay"></div>
      <div className="sidebarContents">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-hand-point-right"></i>
        </button>
      </div>
    </div>
  );
}
