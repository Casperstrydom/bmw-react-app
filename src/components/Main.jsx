export default function Main(props) {
  const { data } = props;

  if (!data) {
    return <div className="loadingState">Loading...</div>;
  }

  return (
    <div className="imgContainer">
      <img
        src="https://di-uploads-pod27.dealerinspire.com/bmwofmeridian/uploads/2022/03/2021-BMW-M3-thin-tall.jpg"
        alt="BMW M3"
        className="bgImage"
      />
      <img
        src="https://cdn.bmwcca.org/static/join/images/BMW-M2-Coupe_2500x1150.jpg"
        alt="BMW M2 Coupe"
        className="bgImage2"
      />
    </div>
  );
}
