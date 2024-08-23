export default function Main(props) {
  const { data } = props;
  return (
    <div className="imgContainer">
      <img
        src={data.hdurl}
        alt={data.title || "bg-img"}
        className="bgImage"
      />
      <img
        src={data.hdurl2}  // Use the second image URL
        alt={data.title || "bg-img"}
        className="bgImage2"
      />
    </div>
  );
}
