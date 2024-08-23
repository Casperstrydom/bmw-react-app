// Footer.jsx
export default function Footer(props) {
    const { handleToggleModal, data } = props;
  
    return (
      <footer>
        <div className="bgGradient"></div>
        <div>
          <h2>{data?.title}</h2>
          <h1>BMW PROJECT</h1>
        </div>
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-circle-question"></i>
        </button>
      </footer>
    );
  }
  