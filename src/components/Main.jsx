export default function Main(props) {
  const { data } = props;

  if (!data) {
    return <div className="loadingState">Loading...</div>;
  }

  return (
    <div className="imgContainer">
      <img
        src={data.hdurl}
        alt={data.title || "bg-img"}
        className="bgImage"
      />
      <img
        src={data.hdurl2}
        alt={data.title || "bg-img"}
        className="bgImage2"
      />
    </div>
  );
}
